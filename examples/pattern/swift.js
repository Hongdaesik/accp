const PATH = require( 'path' )

const BASE = 'out/swift'
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
  COMMA: ','
}

module.exports = function( OBJ, GEN ) {

  // get api
  gen( OBJ, GEN )

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
` )

  res.print( `
import Foundation
` )

api.print( `
import Foundation

extension AlamofireModel {
` )

  // set api
  for ( API of OBJ.API ) {

    setAPI( api, req, res, API )
  }

  // close code
  api.print( `
}` )

  // close
  req.close()
  res.close()
  api.close()
}

function struct( OBJ, GEN ) {

  // init
  var out = new GEN( PATH.join( BASE, 'pub', 'struct.swift' ) )

  // open
  out.open()

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

  init( ${ setParameter( STRUCT.DATA ) } ) {

    ${ getValue( STRUCT.DATA, TYPO.SPC4 ) }
  }

  init( from decoder: Decoder ) throws {

    let container = try decoder.container( keyedBy: CodingKeys.self )

    ${ setVariable( STRUCT.DATA, TYPO.SPC4 ) }
  }
}
` )
  }

  // close
  out.close()
}

/* api */
function setAPI( api, req, res, API ) {

  /* open code */
  api.print( `
  /** Description: ${ API.MARK } */
  struct ${ API.NAME } {` )

  req.print( `
/** Description: ${ API.MARK } */
struct ${ API.NAME }_REQ {` )

  res.print( `
/** Description: ${ API.MARK } */
struct ${ API.NAME }_RES {` )

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
     * Complete: ${ FUNC.COMP.toString() }
     * Description: ${ FUNC.DESC } 
     
     - Process: 
       ${ getList( FUNC.PROC ) }
     
     - Question:
       ${ getList( FUNC.MARK ) } */
    static public func ${ FUNC.NAME } ( req: ${ API.NAME }_REQ.${ FUNC.NAME }, completion: @escaping ( Any? ) -> Void ) {

      AlamofireModel.shared.request( address: "${ API.BASE }/${ FUNC.POST || FUNC.GET }", method: .${ FUNC.POST ? 'post' : 'get' }, parameters: req, multipart: ${ multipart.toString() }, completion: completion )
    }` )

    /* 
    // set req function 
    init(

      ${ getParameter( FUNC.REQ ) }
    ) {

      ${ getValue( FUNC.REQ ) }
    }
    */
    req.print( `

  /**
   - Parameters: 
     ${ getDescription( FUNC.REQ, TYPO.SPC7, TYPO.SPC5 ) } */
  struct ${ FUNC.NAME }: Codable {

    ${ getVariable( FUNC.REQ, TYPO.SPC6, TYPO.SPC4 ) }
  }
  ` )

    // set res function
    res.print( `

  /**
   - Parameters:
     ${ getDescription( FUNC.RES, TYPO.SPC7, TYPO.SPC5 ) } */
  struct ${ FUNC.NAME }: Codable {

    ${ getVariable( FUNC.RES, TYPO.SPC6, TYPO.SPC4 ) }

    init() {}

    init( from decoder: Decoder ) throws {

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
function getList( DATA ) {
  
  if ( DATA ) {

    return Array.from( DATA, row => `- ${ row.NAME }: ${ row.MARK || row.CODE }` ).join( TYPO.LINE + TYPO.SPC7 )
  }

  return '- nothing'
}

function getValue( DATA, join = TYPO.SPC6 ) {

  if ( DATA ) {
    
    return Array.from( DATA, row => `self.${ row.NAME } = ${ row.NAME }` ).join( TYPO.LINE + join )
  }

  return ''
}

function getClass( DATA ) {

  let convert = DATA.CLASS.indexOf( 'Data' ) > -1
  
  if ( DATA.ARRAY ) {

    return convert ? '[URL]' : `[${ DATA.CLASS }]`
  }

  return convert ? 'URL' : DATA.CLASS
}

function getOption( DATA, SPC ) {

  var keys = Object.keys( DATA )

  if ( keys.length > 0 ) {

    return ( TYPO.LINE + SPC ).concat( Array.from( keys, key => `- ${ key }: ${ DATA[ key ] }` ).join( TYPO.LINE + SPC ) )
  }

  return ''
}

function getReserved( name ) {
  
  switch ( name ) {

    case 'default': return '`default`'
  }

  return name
}

function getVariable( DATA, opt = TYPO.SPC8, join = TYPO.SPC6 ) {

  if ( DATA ) {

    return Array.from( DATA, row => {
     
      return `/**${ TYPO.LINE }${ join }- ${ row.MARK }${ getOption( row.OPTION, opt ) } */${ TYPO.LINE }${ join }var ${ getReserved( row.NAME ) }: ${ getClass( row ) }?`

    } ).join( TYPO.LINE + TYPO.LINE + join )
  }

  return '/** No variable declared */'
}

function getParameter( DATA ) {

  if ( DATA ) {
    
    return Array.from( DATA, row => `${ row.NAME }: ${ getClass( row ) }?` ).join( TYPO.COMMA + TYPO.LINE + TYPO.SPC6 )
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

function setParameter( DATA ) {
  
  if ( DATA ) {

    return Array.from( DATA, row => `${ getReserved( row.NAME ) }: ${ getClass( row ) }? = nil` ).join( TYPO.COMMA + TYPO.SPC1 )
  }

  return ''
}