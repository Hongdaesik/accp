const PATH = require( 'path' )

const BASE = 'out/swagger'

const TYPO = {

  LINE: '\n',
  EMPTY: '',
}

module.exports = function( OBJ, GEN ) {

  var def = new GEN( PATH.join( BASE, 'swagger.json' ) )

  var json = {

    openapi: '3.0.1',
    info: {
      title: 'SERVICE API',
      contact: {
        email: 'hongdaesik88@gmail.com'
      },
      license: {
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
        name: 'Apache 2.0'
      },
      version: '0.0.1',
    },
    servers: [ {
      url: 'http://localhost:8080',
      description: 'Development server'
    } ],
    paths: {},
    components: {
      schemas: {
        Status: {
          required: [
            'code',
            'message'
          ],
          properties: {
            code: {
              type: 'number',
              description: '상태 코드 *'
            },
            message: {
              type: 'string',
              description: '상태 내용 *'
            }
          },
          type: 'object',
          title: 'Status ( 상태 정보  )'
        }
      }
    }
  }

  gen( json, OBJ )

  struct( json, OBJ )

  code( json, OBJ )

  def.open()

  def.print( JSON.stringify( json, null, 2 ) )

  def.close()
}

function gen( json, OBJ ) {

  for ( API of OBJ.API ) {

    setPath( json, API, OBJ )
  }
}

function code( json, OBJ ) {

  var code = []

  for ( CODE of OBJ.CODE ) {

    for ( _CODE of CODE.CODE ) {

      code.push( `* ${ _CODE.CODE }: ${ _CODE.MARK.ko || _CODE.MARK.en }` )
    }
  }

  json.components.schemas.Status.properties.message.description += TYPO.LINE + code.join( TYPO.LINE )
}

function struct( json, OBJ ) {

  for ( STRUCT of OBJ.STRUCT ) {

    json.components.schemas[ STRUCT.NAME ] = setDelete( Object.assign( getStruct( STRUCT.DATA ), {

      type: 'object',
      title: `${ STRUCT.NAME } ( ${ STRUCT.MARK } )`
    } ) )
  }
}

function setPath( json, API, OBJ ) {

  for ( FUNC of API.FUNC ) {

    if ( FUNC.COMP == false ) continue

    var procedure = false

    if ( FUNC.OPT ) {

      for ( let OPT of FUNC.OPT ) {

        switch ( OPT.NAME ) {

          case 'procedure': {

            procedure = OPT.VALUE

            break
          }
        }
      }
    }

    // chk procedure
    if ( procedure ) continue

    var path = json.paths[ getPath( API, FUNC ) ] || new Object()

    var object = {

      tags: [ API.NAME.toLowerCase() ],
      summary: FUNC.DESC,
      responses: getResponse( FUNC.RES ),
      description: getDescription( API, OBJ, FUNC )
    }

    if ( FUNC.GET ) {

      object.parameters = getParameter( FUNC.REQ )

    } else {

      object.requestBody = getBody( FUNC.REQ )
    }

    path[ getMethod( FUNC ) ] = setDelete( object )

    json.paths[ getPath( API, FUNC ) ] = path
  }
}

function setDelete( object ) {

  for ( key of Object.keys( object ) ) {

    if ( object[ key ] ) {

      if ( object[ key ] instanceof Array ) {

        if ( object[ key ].length > 0 ) continue

      } else if ( object[ key ] instanceof Object ) {

        object[ key ] = setDelete( object[ key ] )

        continue

      } else continue
    }

    delete object[ key ]
  }

  return object
}

/* function */
function getPath( API, FUNC ) {

  let loc = getLocation( FUNC )

  if ( loc.length > 0 ) return `/${ API.NAME.toLowerCase() }/${ loc }`

  return `/${ API.NAME.toLowerCase() }`
}

function getBody( DATA ) {

  var properties = {}

  var requires = []

  var request = {

    content: {

      'application/x-www-form-urlencoded': {

        schema: {

          type: 'object',
          required: requires,
          properties: properties
        }
      }
    }
  }

  if ( DATA ) {

    for ( ROW of DATA ) {

      if ( getRequired( ROW.MARK ) ) requires.push( ROW.NAME )

      properties[ ROW.NAME ] = getProperty( ROW )
    }

    return request

  } else {

    return null
  }
}

function getMethod( FUNC ) {

  if ( FUNC.GET ) return 'get'

  if ( FUNC.PUT ) return 'put'

  if ( FUNC.POST ) return 'post'

  if ( FUNC.PATCH ) return 'patch'

  if ( FUNC.DELETE ) return 'delete'

  return null
}

function getOption( DATA ) {

  return Array.from( Object.keys( DATA ), key => {

    return `\n* ${ key } ${ DATA[ key ] }`

  } ).join( TYPO.EMPTY )
}

function getStruct( DATA ) {

  var struct = {

    required: [],
    properties: new Object()
  }

  if ( DATA ) {

    for ( ROW of DATA ) {

      if ( getRequired( ROW.MARK ) ) struct.required.push( ROW.NAME )

      struct.properties[ ROW.NAME ] = getProperty( ROW )
    }
  }

  return struct
}

function getResponse( DATA ) {

  var properties = {

    status: {

      $ref: '#/components/schemas/Status'
    }
  }

  var response = {

    default: {

      content: {

        'application/json': {

          schema: {

            type: 'object',
            properties: properties
          }
        }
      },
      description: 'Response result'
    }
  }

  if ( DATA ) {

    for ( ROW of DATA ) {

      properties[ ROW.NAME ] = getProperty( ROW )
    }
  }

  return response
}

function getLocation( FUNC ) {

  return ( FUNC.GET || FUNC.PUT || FUNC.POST || FUNC.PATCH || FUNC.DELETE ).replace( '/', '' )
}

function getParameter( DATA ) {

  var parameters = []
  
  if ( DATA ) {

    for ( ROW of DATA ) {

      let required = getRequired( ROW.MARK )

      var query = {

        in: 'query',
        name: ROW.NAME,
        schema: getProperty( ROW ),
        required: required,
        description: ROW.MARK + getOption( ROW.OPTION )
      }

      if ( !required ) query.schema.nullable = true

      parameters.push( setDelete( query ) )
    }

    return parameters

  } else {

    return null
  }
}

function getProperty( DATA ) {

  switch ( DATA.CLASS ) {

    case 'Int':
    case 'Float':
    case 'Double': {

      if ( DATA.ARRAY ) return {

        type: 'array',
        items: {

          type: 'number'
        },
        title: DATA.MARK + getOption( DATA.OPTION )
      }

      return {

        type: 'number',
        description: DATA.MARK + getOption( DATA.OPTION )
      }
    }
    case 'Data': {

      if ( DATA.ARRAY ) return {

        type: 'object',
        items: {

          type: 'object'
        },
        description: DATA.MARK + getOption( DATA.OPTION )
      }

      return {

        type: 'object',
        description: DATA.MARK + getOption( DATA.OPTION )
      }
    }
    case 'String': {

      if ( DATA.ARRAY ) return {

        type: 'array',
        items: {

          type: DATA.CLASS.toLowerCase()
        },
        title: DATA.MARK + getOption( DATA.OPTION )
      }

      return {

        type: DATA.CLASS.toLowerCase(),
        description: DATA.MARK + getOption( DATA.OPTION )
      }
    }
    case 'Boolean': {

      if ( DATA.ARRAY ) return {

        type: 'array',
        items: {

          type: DATA.CLASS.toLowerCase()
        },
        title: DATA.MARK + getOption( DATA.OPTION )
      }

      return {

        type: DATA.CLASS.toLowerCase(),
        default: 'false',
        description: DATA.MARK + getOption( DATA.OPTION )
      }
    }
    default: {

      if ( DATA.ARRAY ) return {

        type: 'array',
        items: {

          $ref: `#/components/schemas/${ DATA.CLASS }`
        },
        title: DATA.MARK + getOption( DATA.OPTION )
      }

      return {

        type: 'object',
        allOf: [ {

          $ref: `#/components/schemas/${ DATA.CLASS }`
        } ],
        title: DATA.MARK + getOption( DATA.OPTION ) + ` ( ${ DATA.CLASS } )`
      }
    }
  }
}

function getRequired( MARK ) {

  return MARK.indexOf( '*' ) < 0 ? false : true
}

function getDescription( API, OBJ, FUNC ) {

  var desc = []

  if ( FUNC.PROC && FUNC.PROC.length > 0 ) {

    desc.push( '### Relation.' )

    for ( ROW of FUNC.PROC ) {

      var target = null

      for ( let A of OBJ.API ) {

        target = A.FUNC.find( F => {

          return F.CODE == ROW.CODE
        } )

        if ( target ) break
      }

      let base = ROW.NAME.split( '.' )[ 0 ].toLowerCase()

      let path = getPath( API, target ).substring( 1 ).split( '/' )[ 1 ]

      if ( path ) {

        desc.push( `* ${ target.CODE }: [${ base }/${ path }](#${ base }/${ getMethod( target ) }_${ base }_${ path }).` )

      } else {

        desc.push( `* ${ target.CODE }: [${ base }](#${ base }/${ getMethod( target ) }_${ base }).` )
      }
    }
  }

  if ( FUNC.MARK && FUNC.MARK.length > 0 ) {

    desc.push( '### Description.' )

    for ( ROW of FUNC.MARK ) desc.push( `* ${ ROW.NAME } ${ ROW.MARK || ROW.CODE }` )
  }

  return desc.length > 0 ? desc.join( TYPO.LINE ) : null
}