const PATH = require( 'path' )

const BASE = 'out/node'

const TYPO = {

  LINE: '\n',
  SPC1: ' ',
  SPC2: '  ',
  SPC3: '   ',
  SPC4: '    ',
  SPC5: '     ',
  SPC6: '      ',
  SPC7: '       ',
  SPC8: '        ',
  SPC9: '         ',
  SPC10: '          ',
  COMMA: ',',
  EMPTY: '',
  BRACKET: {

    END: ')',
    START: '('
  }
}

module.exports = function( OBJ, GEN ) {

  /* get api */
  gen( OBJ, GEN )

  /* get code */
  code( OBJ, GEN )
}

function gen( OBJ, GEN ) {

  /* router */
  for ( API of OBJ.API ) {

    // init
    var model = new GEN( PATH.join( BASE, `model/${ API.NAME.toLowerCase() }.js` ) )
    
    var query = new GEN( PATH.join( BASE, `query/${ API.NAME.toLowerCase() }.js` ) )
    
    var router = new GEN( PATH.join( BASE, `router/${ API.NAME.toLowerCase() }.js` ) )

    // set open
    model.open()
    query.open()
    router.open()

    setModel( model, API )

    setQuery( query, API )
    
    setRouter( router, API )

    // set close
    model.close()
    query.close()
    router.close()
  }
}

function code( OBJ, GEN ) {

  var out = new GEN( PATH.join( BASE, 'code/code.js' ) )

  var v = []
  var l = {}

  out.open()

  out.print( `
function CODE() {
` )

  for ( let CODE of OBJ.CODE ) {

    v = v.concat( getValue( CODE ) )

    l = getLanguage( l, CODE )
  }

  /* print value */
  out.print( v.join( TYPO.LINE + TYPO.SPC2 ) )

  /* print function */
  out.print( getCode( l ) )

  out.print( `
}

module.exports = new CODE()` )

  out.close()
}

function setModel( out, API ) {

  /* set header */
  out.print( `
/* require */
const CODE = require( '../code/code' )

const QUERY = require( '../query/${ API.NAME.toLowerCase() }' )

/* config */
const CONFIG = require( '../config/' + process.argv[ 2 ] )

function ${ getClass( API.NAME ) }() {}
` )

  /* print func */
  for ( let FUNC of API.FUNC ) {

    var method = 'write'

    var procedure = false

    if ( FUNC.OPT ) {

      for ( let OPT of FUNC.OPT ) {

        switch ( OPT.NAME ) {

          case 'read':
          case 'cache': {

            method = OPT.NAME

            break
          }

          case 'procedure': {

            procedure = OPT.VALUE

            break
          }
        }
      }
    }

    // chk procedure
    if ( procedure ) continue

    let METHOD = getMethod( FUNC )

    let OPTION = getOption( FUNC )

    // set api function
    out.print( `
/** 
 * Parameter: ${ getMarks( FUNC.REQ, TYPO.SPC1, METHOD, OPTION ) }*/
${ getClass( API.NAME ) }.prototype.${ getFunction( FUNC.NAME ) } = async function( req ) {

  try {

    /* database connection sample
    var connection = await DB.connection.${ method }()

    connection.commit()

    connection.release() */

    var response = {
      
      code: CODE.SYSTEM_SUCCESS
    }

    ${ getResponse( FUNC, TYPO.SPC4 ) }

    return response

  } catch ( error ) {

    /* database error sample
    connection.rollback()

    connection.release() */

    if ( error && error.message ) {

      console.error( new Date(), error.message )

      return CODE.SYSTEM_DATABASE
    }

    return error
  }
}
` )
  }

  out.print( `

var ${ API.NAME.toLowerCase() } = new ${ getClass( API.NAME ) }()

module.exports = ${ API.NAME.toLowerCase() }` )
}

function setRouter( out, API ) {

  /* set header */
  out.print( `
/* dependency */
const ROUTER = require( 'express' ).Router()

/* require */
const FUNC = require( '../library/func' )

const MODEL = require( '../model/${ API.NAME.toLowerCase() }' )

/* config */
const CONFIG = require( '../config/' + process.argv[ 2 ] )
` )

  /* print func */
  for ( let FUNC of API.FUNC ) {

    var method = 'write'

    var procedure = false

    if ( FUNC.OPT ) {

      for ( let OPT of FUNC.OPT ) {

        switch ( OPT.NAME ) {

          case 'read':
          case 'cache': {

            method = OPT.NAME

            break
          }

          case 'procedure': {

            procedure = OPT.VALUE

            break
          }
        }
      }
    }

    // chk procedure
    if ( procedure ) continue

    let METHOD = getMethod( FUNC )

    let OPTION = getOption( FUNC )

    // set api function
    out.print( `
/** 
 * Code: ${ FUNC.CODE }
 * Complete: ${ FUNC.COMP.toString() }
 * Description: ${ FUNC.DESC } 
 * 
 * Process: 
 ${ getProc( FUNC.PROC ) }
 *
 * Question:
 ${ getList( FUNC.MARK ) } */
ROUTER.${ METHOD.NAME }( '/${ METHOD.PATH }', /* FUNC.setParams,${ setOption( OPTION ) } */${ getRequired( FUNC.REQ, METHOD ) } async function( req, res ) {

  console.log( new Date(), \`Route.${ getClass( METHOD.NAME ) } \${ req.baseUrl + req.path } \${ req.user.ip } \${ req.user?.token?.keyUser ? req.user.token.keyUser : '' }\` )

  return res.json( await MODEL.${ getFunction( FUNC.NAME ) }( req ) )
} )
` )
  }

  out.print( `
module.exports = ROUTER` )
}

function setQuery( out, API ) {

  out.print( `function ${ getClass( API.NAME ) }() {}

${ getClass( API.NAME ) }.prototype.get = {
}

${ getClass( API.NAME ) }.prototype.set = {
}

${ getClass( API.NAME ) }.prototype.put = {
}

${ getClass( API.NAME ) }.prototype.del = {
}

var ${ API.NAME.toLowerCase() } = new ${ getClass( API.NAME ) }()

module.exports = ${ API.NAME.toLowerCase() }` )
}

function setOption( OPTION ) {

  OPTION = OPTION.filter( ( ROW ) => {

    return ROW.METHOD
  } )

  OPTION = Array.from( OPTION, ( ROW ) => {

    if ( ROW.METHOD ) return ROW.METHOD

    return
  } )

  // chk option
  if ( OPTION.length < 1 ) return TYPO.EMPTY

  return TYPO.SPC1 + OPTION.join( TYPO.COMMA + TYPO.SPC1 ) + TYPO.COMMA
}

/* function, get */
function getCode( LANG, DEF = 'en' ) {

  var def = function( d ) {

    return `
      default: {

        switch ( code ) {

          ${ Array.from( d, ( r ) => {

            if ( r.code == undefined ) return `/* ${ r.mark } */`

            return `case ${ r.code }: return '${ r.mark }'`

          } ).join( TYPO.LINE + TYPO.SPC10 ) }
        }
      }`
  }

  var lang = function( k, d ) {

    return `
      case '${ k }': {

        switch ( code ) {

          ${ Array.from( d, ( r ) => {

            if ( r.code == undefined ) return `/* ${ r.mark } */`

            return `case ${ r.code }: return '${ r.mark }'`

          } ).join( TYPO.LINE + TYPO.SPC10 ) }
        }

        break
      }`
  }

  return `

  /**
   * 사용자 언어 설정에 따른 에러 메시지 반환
   * @param { string } typeLang - req.user.typeLang, 사용자 언어
   * @param { number } code - 에러 코드
   * @returns { string } - 에러 메시지
   */
  this.getMessage = function( typeLang, code ) {

    switch ( typeLang.toLowerCase() ) {
      ${ Array.from( Object.keys( LANG ), ( k ) => {

        switch ( k ) {

          case DEF: return def( LANG[ k ] )

          default: return lang( k, LANG[ k ] )
        }
      } ).join( TYPO.EMPTY ) }
    }
  }`
}

function getPath( path ) {

  return path.indexOf( '/' ) > 1 ? path : path.replace( '/', '' )
}

function getProc( PROC ) {

  if ( PROC ) {

    return Array.from( PROC, ROW => {

      return `* * [${ ROW.NAME }] ${ ROW.MARK || ROW.CODE }`

    } ).join( TYPO.LINE + TYPO.SPC1 )
  }

  return '* * nothing'
}

function getList( MARK ) {

  if ( MARK ) {

    return Array.from( MARK, ROW => {

      return `* * ${ ROW.NAME } ${ ROW.MARK.replace( /\\n\s\s/g, '\n * * * ' ) }`

    } ).join( TYPO.LINE + TYPO.SPC1 )
  }

  return '* * nothing'
}

function getClass( NAME ) {

  return NAME.substr( 0, 1 ).toUpperCase() + NAME.substr( 1 ).toLowerCase()
}

function getValue( CODE ) {

  var values = [ `${ TYPO.LINE + TYPO.SPC2 }/* ${ CODE.NAME } */` ]

  return values.concat( Array.from( CODE.CODE, ( ROW ) => {

    return `this.${ CODE.NAME }_${ ROW.NAME } = ${ ROW.CODE }`
  } ) )
}

function getMethod( FUNC ) {

  if ( FUNC.GET ) {

    return {

      PATH: getPath( FUNC.GET ),
      NAME: 'get',
      PARAM: 'query'
    }
  }

  if ( FUNC.PUT ) {

    return {

      PATH: getPath( FUNC.PUT ),
      NAME: 'put',
      PARAM: 'body'
    }
  }

  if ( FUNC.POST ) {

    return {

      PATH: getPath( FUNC.POST ),
      NAME: 'post',
      PARAM: 'body'
    }
  }

  if ( FUNC.PATCH ) {

    return {

      PATH: getPath( FUNC.PATCH ),
      NAME: 'patch',
      PARAM: 'body'
    }
  }

  return {

    PATH: getPath( FUNC.DELETE ),
    NAME: 'delete',
    PARAM: 'query'
  }
}

function getOption( FUNC ) {

  let option = []

  try {

    for ( let opt of FUNC.OPT ) {

      switch ( opt.NAME ) {

        /* token example
        case 'token': {

          option.push( {

            MARK: '토큰 정보',
            PARAM: 'req.user.token',
            METHOD: 'FUNC.setToken'
          } )

          break
        } */
      }
    }

    return option

  } catch ( error ) {

    return option
  }
}

function getMarks( REQ, SPC, METHOD, OPTION ) {

  OPTION = OPTION.filter( ( ROW ) => {

    return ROW.PARAM
  } )

  OPTION = Array.from( OPTION, ( ROW ) => {

    return `* @param ${ ROW.PARAM.replace( 'req.', '' ) } ${ ROW.MARK }${ TYPO.LINE + SPC }`
  } )

  // chk req
  if ( REQ && REQ.length > 0 ) {

    REQ = Array.from( REQ, ( ROW ) => {

      return `* @param ${ METHOD.PARAM }.${ ROW.NAME } ${ ROW.MARK }${ TYPO.LINE + SPC }`
    } )

    return TYPO.LINE + SPC + ( OPTION.concat( REQ ) ).join( TYPO.EMPTY )
  }

  // chk option
  if ( OPTION.length > 0 ) return TYPO.LINE + SPC + OPTION.join( TYPO.EMPTY )

  return TYPO.EMPTY
}

function getLanguage( language, CODE ) {

  var mark = {}

  for ( let ROW of CODE.CODE ) {

    for ( let code of Object.keys( ROW.MARK ) ) {

      // chk value
      if ( language[ code ] == undefined ) language[ code ] = []

      // chk mark
      if ( mark[ code ] == undefined ) {

        language[ code ].push( {

          mark: CODE.NAME
        } )

        mark[ code ] = true
      }

      language[ code ].push( {

        code: ROW.CODE,
        mark: ROW.MARK[ code ]
      } )
    }
  }

  return language
}

function getResponse( FUNC, SPC ) {

  var index = 0

  var response = []

  let getIndex = function( index, ARRAY ) {

    if ( ARRAY ) return `${ index }`

    return `${ index }, 0`
  }

  if ( FUNC.RES ) {

    for ( let RES of FUNC.RES ) {

      /* check name */
      switch ( RES.NAME ) {

        case 'code':
        case 'message': {

          continue
        }

        default: {

          response.push( `/* ${ RES.MARK } ${ TYPO.LINE + SPC }response.${ RES.NAME } = DB.get( data, ${ getIndex( index, RES.ARRAY ) } ) */` )
        }
      }

      index++
    }
  }

  if ( response.length > 0 ) return response.join( TYPO.LINE + TYPO.LINE + SPC )

  return TYPO.EMPTY
}

function getFunction( NAME ) {

  return NAME.substr( 0, 1 ).toLowerCase() + NAME.substr( 1 )
}

function getRequired( REQ, METHOD ) {

  // chk req
  if ( REQ && REQ.length > 0 ) {

    var range = []

    var require = []

    for ( ROW of REQ ) {

      // chk option
      if ( ROW.OPTION ) {

        var square = Object.keys( ROW.OPTION ).reduce( ( prev, cur ) => {

          var num = cur.replace( /[^0-9]/g, TYPO.EMPTY )

          if ( num ) return prev + Math.pow( 2, parseInt( num ) + 1 )

          return prev

        }, 0 )

        // chk square
        if ( square > 0 ) range.push( `/* ${ ROW.MARK } ${ TYPO.LINE + TYPO.SPC4 }${ ROW.NAME }: FUNC.getValue( req.${ METHOD.PARAM }.${ ROW.NAME }, ${ square } ) */` )
      }

      // chk require
      if ( ROW.MARK.indexOf( '*' ) < 0 ) continue

      require.push( `/* ${ ROW.MARK } */${ TYPO.LINE + TYPO.SPC4 }${ ROW.NAME }: req.${ METHOD.PARAM }.${ ROW.NAME }` )
    }

    // chk length
    if ( require.length > 0 ) {

      return ` /* chk value example
      
  function( req, res, next ) {

  let response = FUNC.chkParams( req, {

    ${ require.join( TYPO.COMMA + TYPO.LINE + TYPO.SPC4 ) }
  } )

  if ( response.status.code ) return res.json( response ) */

  return next()

},${ range.length > 0 ? ` /* chk value example

  function( req, res, next ) {

  let response = FUNC.chkValues( req, {

    ${ range.join( TYPO.COMMA + TYPO.LINE + TYPO.SPC4 ) }
  } )

  if ( response.status.code ) return res.json( response ) */

  return next()

},` : TYPO.EMPTY }`
    }
  }

  return TYPO.EMPTY
}