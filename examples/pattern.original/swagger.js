const PATH = require( 'path' )

const BASE = 'out/swagger'

const TYPO = {

  LINE: '\n',
  EMPTY: '',
  SPACE: ' '
}

module.exports = function( OBJ, GEN ) {

  var def = new GEN( PATH.join( BASE, 'swagger.json' ) )

  var json = {

    openapi: '3.0.3',
    info: {
      title: 'SWAGGER API',
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
      url: 'http://localhost',
      description: 'Dev'
    } ],
    paths: {},
    security: [ {
      token: []
    } ],
    components: {
      securitySchemes: {
        token: {
          in: 'header',
          type: 'apiKey',
          name: 'X-API-TOKEN',
          description: `
Description: 사용자 토큰값\n\n
<details>
<summary>Development token</summary>
<p>token</p>
</details>`
        }
      },
      schemas: {}
    }
  }

  struct( json, OBJ )

  path( json, OBJ )

  /*
  code( json, OBJ ) */

  def.open()

  def.print( JSON.stringify( json, null, 2 ) )

  def.close()
}

function code( json, OBJ ) {

  var code = []

  for ( CODE of OBJ.CODE ) {

    for ( _CODE of CODE.CODE ) {

      code.push( `* ${ _CODE.CODE }: ${ _CODE.MARK.ko || _CODE.MARK.en }` )
    }
  }
}

function path( json, OBJ ) {

  for ( API of OBJ.API ) {

    for ( FUNC of API.FUNC ) {

      if ( FUNC.COMP == false ) continue

      var token = false

      var procedure = false

      if ( FUNC.OPT ) {

        for ( let OPT of FUNC.OPT ) {

          switch ( OPT.NAME ) {

            case 'token': {

              token = OPT.VALUE

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

      var path = json.paths[ getPath( API, FUNC ) ] || new Object()

      var object = {

        tags: [ API.NAME.toLowerCase() ],
        summary: `[${ FUNC.CODE }] ${ FUNC.DESC }${ token ? ' 🔒' : '' }`,
        responses: getResponse( FUNC.RES ),
        description: getDescription( API, OBJ, FUNC ),
      }

      if ( token ) {

        object.security = [ {

          token: []
        } ]
      }

      if ( FUNC.GET || FUNC.DELETE ) {

        object.parameters = getParameter( FUNC.REQ )

      } else {

        object.requestBody = getBody( FUNC.REQ, json )
      }

      path[ getMethod( FUNC ) ] = setDelete( object )

      json.paths[ getPath( API, FUNC ) ] = path
    }
  }
}

function struct( json, OBJ ) {

  for ( STRUCT of OBJ.STRUCT ) {

    json.components.schemas[ STRUCT.NAME ] = setDelete( Object.assign( getStruct( STRUCT.DATA ), {

      type: 'object',
      title: `${ STRUCT.NAME } ( ${ STRUCT.MARK } )`
    } ) )
  }
}

/* set */
function setIf( condition, data ) {

  if ( condition ) return data

  return TYPO.EMPTY
}

function setDelete( object ) {

  for ( key of Object.keys( object ) ) {

    if ( key == 'example' ) continue

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

/* get */
function getPath( API, FUNC ) {

  let loc = getLocation( FUNC )

  if ( loc.length > 0 ) return `/${ API.NAME.toLowerCase() }/${ loc }`

  return `/${ API.NAME.toLowerCase() }`
}

function getBody( DATA, json ) {

  var properties = {}

  var encoding = {}

  var requires = []

  var request = {

    content: {

      'application/x-www-form-urlencoded': {

        schema: {

          type: 'object',
          required: requires,
          properties: properties
        },
        encoding: encoding
      }
    }
  }

  if ( DATA ) {

    for ( ROW of DATA ) {

      if ( getRequired( ROW.MARK ) ) requires.push( ROW.NAME )

      properties[ ROW.NAME ] = getProperty( ROW, json )

      if ( properties[ ROW.NAME ].type == 'object' || properties[ ROW.NAME ].type == 'array' ) {

        encoding[ ROW.NAME ] = {

          contentType: 'application/json'
        }
      }
    }

    return request

  } else {

    return null
  }
}

function getModel( DATA, schemas ) {

  let struct = schemas[ DATA.CLASS ]

  var example = {}

  var description = new Array()

  for ( let key of Object.keys( struct.properties ) ) {

    let required = ( struct.required || [] ).indexOf( key ) > -1

    let property = struct.properties[ key ]

    example[ key ] = required ? property.type : null

    description.push( `
    <tr>
      <td>${ required ? `<b>${ key }<span> \\*</span></b>` : key }</td>
      <td>
        <span>${ property.type }</span>
        <span>${ setIf( property.format, `($${ property.format })` ) }</span>
        <div>
          <p>${ property.description }</p>
        </div>
      </td>
    </tr>`.trim() )
  }

  return {

    example: example,
    description: `
    <details>
      <summary>${ DATA.MARK }</summary>
      <table>
        <tbody>${ description.join( TYPO.EMPTY )  }</tbody>
      </table>
    </details>${ getOption( DATA.OPTION ) }`.trim().replace( />\n\s*</g, '><' )
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

    return `\n* ${ key } ${ DATA[ key ] }`.replace( /\\n/g, '\n' )

  } ).join( TYPO.EMPTY )
}

function getStruct( DATA ) {

  var struct = {

    required: [],
    properties: new Object()
  }

  if ( DATA ) {

    for ( ROW of DATA ) {

      struct.properties[ ROW.NAME ] = getProperty( ROW )

      if ( getRequired( ROW.MARK ) ) {

        struct.required.push( ROW.NAME )

      } else {

        struct.properties[ ROW.NAME ].default = 'null'
      }
    }
  }

  return struct
}

function getResponse( DATA ) {

  var properties = {}

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
      description: '응답 결과'
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

  let loc = ( FUNC.GET || FUNC.PUT || FUNC.POST || FUNC.PATCH || FUNC.DELETE )

  return loc.length > 1 ? loc : loc.replace( '/', '' )
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

function getProperty( DATA, json = null ) {

  var getType = _ => {

    switch ( DATA.CLASS ) {

      case 'Int': {

        if ( DATA.ARRAY ) return {

          type: 'array',
          items: {

            type: 'integer',
            format: DATA.CLASS + 32
          }
        }

        return {

          type: 'integer',
          format: DATA.CLASS + 32
        }
      }
      case 'Float': {

        if ( DATA.ARRAY ) return {

          type: 'array',
          items: {

            type: 'number',
            format: DATA.CLASS
          }
        }

        return {

          type: 'number',
          format: DATA.CLASS
        }
      }
      case 'Double': {

        if ( DATA.ARRAY ) return {

          type: 'array',
          items: {

            type: 'number',
            format: DATA.CLASS
          }
        }

        return {

          type: 'number',
          format: DATA.CLASS
        }
      }
      case 'String': {

        if ( DATA.ARRAY ) return {

          type: 'array',
          items: {

            type: 'string'
          }
        }

        return {

          type: 'string'
        }
      }
      case 'Boolean': {

        if ( DATA.ARRAY ) return {

          type: 'array',
          items: {

            type: 'boolean'
          }
        }

        return {

          type: 'boolean',
          default: 'false'
        }
      }
      case 'Data': {

        if ( DATA.ARRAY ) return {

          type: 'array',
          items: {

            type: 'object'
          }
        }

        return {

          type: 'object'
        }
      }
      default: {

        if ( DATA.ARRAY ) return {

          type: 'array',
          items: {

            $ref: '#/components/schemas/' + DATA.CLASS
          }
        }

        return {

          type: 'object',
          allOf: [ {

            $ref: '#components/schemas/' + DATA.CLASS
          } ]
        }
      }
    }
  }

  var object = getType()

  if ( json ) {

    if ( ( object.items && object.items.$ref ) || object.allOf ) {

      let model = getModel( DATA, json.components.schemas )

      object.description = model.description

      if ( object.allOf ) {

        object.example = model.example

      } else if ( object.items.$ref ) {

        object.type = 'object'

        object.example = [ model.example ]

        delete object.items
      }

    } else {

      object.description = DATA.MARK + getOption( DATA.OPTION )
    }
  } else {

    if ( object.type == 'object' || object.type == 'array' ) {

      object.title = DATA.MARK

      object.description = getOption( DATA.OPTION )

    } else {

      object.description = DATA.MARK + getOption( DATA.OPTION )
    }
  }

  return object
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

      let method = getMethod( target )

      if ( path ) {

        desc.push( `* [[${ target.CODE }] ${ target.DESC }](#${ base }/${ method }_${ base }_${ path }).` )

      } else {

        desc.push( `* [[${ target.CODE }] ${ target.DESC }](#${ base }/${ method }_${ base }).` )
      }
    }
  }

  if ( FUNC.MARK && FUNC.MARK.length > 0 ) {

    desc.push( '### Description.' )

    for ( ROW of FUNC.MARK ) desc.push( `${ ROW.NAME } ${ ROW.MARK || ROW.CODE }`.replace( /\\n/g, '\n' ) )
  }

  return desc.length > 0 ? desc.join( TYPO.LINE ) : null
}