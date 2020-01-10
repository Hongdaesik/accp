const PATH = require( 'path' )

const BASE = PATH.join( __dirname, '../swift' )
const TYPO = {

  LINE: '\n',
  SPC2: '  ',
  SPC3: '   ',
  SPC4: '    ',
  SPC5: '     ',
  SPC6: '      ',
  SPC7: '       ',
  SPC8: '        ',
  SPC9: '         ',
  SPC10: '          ',
  COMMA: ','
}

module.exports = function( OBJ, GEN ) {

  // get api
  gen( OBJ, GEN )

  // set code
  code( OBJ, GEN )

  // set struct
  struct( OBJ, GEN )
}

function gen( OBJ, GEN ) {

  // init
  var req = new GEN( PATH.join( BASE, 'req', 'req.swift' ) )
  var res = new GEN( PATH.join( BASE, 'res', 'res.swift' ) )
  var api = new GEN( PATH.join( BASE, 'api', 'api.swift' ) )

  // open
  req.open()
  res.open()
  api.open()

  // start code
  req.print( `
import Foundation

/** 
 * Notice: An example file. There may be syntax errors. */
` )

  res.print( `
import Foundation

/** 
 * Notice: An example file. There may be syntax errors. */
` )

  api.print( `
import Foundation

/** 
 * Notice: An example file. There may be syntax errors. */
extension AlamofireModel {
` )

  // set api
  for ( API of OBJ.API ) {

    setHttp( api, req, res, API )
  }

  // close code
  api.print( `
}` )

  // close
  req.close()
  res.close()
  api.close()
}

function code( OBJ, GEN ) {

  // init
  var out = new GEN( PATH.join( BASE, 'pub', 'code.swift' ) )

  // open
  out.open()

  out.print( `
/** 
 * Notice: An example file. There may be syntax errors. */` )

  // set struct
  for ( CODE of OBJ.CODE ) {

    // set code
    out.print( `

/** 
 * Description: ${ CODE.MARK } */
class ${ CODE.NAME } {

  enum CODE: Int {

    ${ getCode( CODE.CODE ) }
  }

  public func getMessage( code: Int, translate: String ) -> String {

    switch translate {
` ) 

    let translate = getTranslate( CODE.CODE )

    let keys = Object.keys( translate )

    let pop = keys.pop()

    for ( let key of keys ) {

      out.print( `
      case "${ key }":

        switch code {

          ${ translate[ key ].join( TYPO.LINE + TYPO.SPC10 ) }

          default: return "Unknown error"
        }` )
    }

    // end code
    out.print( `
      default:

        switch code {

          ${ translate[ pop ].join( TYPO.LINE + TYPO.SPC10 ) }

          default: return "Unknown error"
        }
    }
  }
}` )
  }

  // close
  out.close()
}

function struct( OBJ, GEN ) {

  // init
  var out = new GEN( PATH.join( BASE, 'pub', 'struct.swift' ) )

  // open
  out.open()

  out.print( `
/** 
 * Notice: An example file. There may be syntax errors. */` )

  // set struct
  for ( STRUCT of OBJ.STRUCT ) {

    // set code
    out.print( `

/**
 * Description: ${ STRUCT.MARK }
 
 - Parameters: 
   ${ getDescription( STRUCT.DATA, TYPO.SPC5, TYPO.SPC3 ) }*/
struct ${ STRUCT.NAME }: Codable {

  ${ getVariable( STRUCT.DATA, TYPO.SPC4, TYPO.SPC2 ) }

  init ( from decoder: Decoder ) throws {

    let container = try decoder.container( keyedBy: CodingKeys.self )

    ${ setVariable( STRUCT.DATA, TYPO.SPC4 ) }
  }
}` )
  }

  // close
  out.close()
}

/* api */
function setHttp( api, req, res, API ) {

  /* open code */
  api.print( `
  /** Description: ${ API.MARK } */
  class ${ API.NAME } {
    
    var base: String = "${ API.BASE }"` )

  req.print( `
/** Description: ${ API.MARK } */
class ${ API.NAME }_REQ {` )

  res.print( `
/** Description: ${ API.MARK } */
class ${ API.NAME }_RES {` )

  /* print function */
  for ( let FUNC of API.FUNC ) {

    var multipart = false

    // get multipart
    if ( FUNC.OPT ) {

      for ( let OPT of FUNC.OPT ) {
  
        switch ( OPT.NAME ) {

          case 'image': {

            multipart = OPT.VALUE
          }
        }
      }
    }

    // set api function
    api.print( `

    /** 
     * Code: ${ FUNC.CODE }
     * Method: ${ FUNC.POST ? 'post' : 'get' }
     * Complete: ${ FUNC.COMP.toString() }
     * Description: ${ FUNC.DESC } 
     
     - Process: 
       ${ getList( FUNC.PROC ) }
     
     - Question:
       ${ getList( FUNC.MARK ) } */
    static public func ${ FUNC.NAME }( req: ${ API.NAME }_REQ.${ FUNC.NAME }, completion: @escaping ( Any? ) -> Void ) {

      AlamofireModel.shared.request( address: base + "/${ FUNC.POST || FUNC.GET }", method: .${ FUNC.POST ? 'post' : 'get' }, parameters: req, multipart: ${ multipart.toString() }, completion: completion )
    }` )

    // set req function
    req.print( `

  /**
   - Parameters: 
     ${ getDescription( FUNC.REQ, TYPO.SPC7, TYPO.SPC5 ) } */
  class ${ FUNC.NAME }: Codable {

    ${ getVariable( FUNC.REQ, TYPO.SPC6, TYPO.SPC4 ) }

    init (

      ${ getParameter( FUNC.REQ ) }
    ) {

      ${ getValue( FUNC.REQ ) }
    }
  }` )

    // set res function
    res.print( `

  /**
   - Parameters:
     ${ getDescription( FUNC.RES, TYPO.SPC7, TYPO.SPC5 ) } */
  class ${ FUNC.NAME }: Codable {

    ${ getVariable( FUNC.RES, TYPO.SPC6, TYPO.SPC4 ) }

    required init ( from decoder: Decoder ) throws {

      let container = try decoder.container( keyedBy: CodingKeys.self )

      ${ setVariable( FUNC.RES ) }
    }
  }` )
  }

  /* close code */
  api.print( `
  }
` )

  req.print( `
}` )

  res.print( `
}` )
}

/* get */
function getCode( DATA ) {

  return Array.from( DATA, row => `case ${ row.NAME } = ${ row.CODE }` ).join( TYPO.LINE + TYPO.SPC4 )
}

function getList( DATA ) {
  
  if ( DATA ) {

    return Array.from( DATA, row => `- ${ row.NAME }: ${ row.MARK || row.CODE }` ).join( TYPO.LINE + TYPO.SPC7 )
  }

  return '- nothing'
}

function getValue( DATA ) {

  if ( DATA ) {
    
    return Array.from( DATA, row => `self.${ row.NAME } = ${ row.NAME }` ).join( TYPO.LINE + TYPO.SPC6 )
  }

  return ''
}

function getClass( DATA ) {
  
  if ( DATA.ARRAY ) {

    return `[${ DATA.CLASS }]`
  }

  return DATA.CLASS
}

function getOption( DATA, SPC ) {

  var keys = Object.keys( DATA )

  if ( keys.length > 0 ) {

    return ( TYPO.LINE + SPC ).concat( Array.from( keys, key => `- ${ key }: ${ DATA[ key ] }` ).join( TYPO.LINE + SPC ) )
  }

  return ''
}

function getVariable( DATA, opt = TYPO.SPC8, join = TYPO.SPC6 ) {

  if ( DATA ) {

    return Array.from( DATA, row => `/**${ TYPO.LINE }${ join }- ${ row.MARK }${ getOption( row.OPTION, opt ) } */${ TYPO.LINE }${ join }var ${ row.NAME }: ${ getClass( row ) }!` ).join( TYPO.LINE + TYPO.LINE + join )
  }

  return '/** No variable declared */'
}

function getTranslate( DATA ) {

  var translate = {}

  for ( let code of DATA ) {

    let keys = Object.keys( code.MARK )

    for ( let key of keys ) {

      if ( translate[ key ] == undefined ) {

        translate[ key ] = []
      }

      translate[ key ].push( `case ${ code.CODE }: return "${ code.MARK[ key ] }"` )
    }
  }

  return translate
}

function getParameter( DATA ) {

  if ( DATA ) {
    
    return Array.from( DATA, row => `${ row.NAME }: ${ getClass( row ) }!` ).join( TYPO.COMMA + TYPO.LINE + TYPO.SPC6 )
  }

  return ''
}

function getDescription( DATA, opt = TYPO.SPC9, join = TYPO.SPC7 ) {

  if ( DATA ) {

    return Array.from( DATA, row => `- ${ row.NAME }: ${ row.MARK }${ getOption( row.OPTION, opt ) }` ).join( TYPO.LINE + join )
  }

  return '- No variable declared'
}

/* set */
function setVariable( DATA, join = TYPO.SPC6 ) {

  if ( DATA ) {

    return Array.from( DATA, row => `self.${ row.NAME } = ( try? container.decode( ${ getClass( row ) }.self, forKey: .${ row.NAME } ) ) ?? nil` ).join( TYPO.LINE + join )
  }

  return ''
}