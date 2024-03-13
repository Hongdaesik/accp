#!/usr/bin/env node

const FS = require( 'fs' )
const PATH = require( 'path' )
const COMMAND = require( 'commander' )

/* dependency */
const LINE = require( 'n-readlines' )
const COLOR = require( 'colors' )

const CONFIG = {

  EXAMPLES: '../examples'
}

function Gen ( path ) {

  this.path = path
  this.stream = null

  if ( FS.existsSync( PATH.dirname( this.path ) ) ) return

  FS.mkdirSync( PATH.dirname( this.path ), {

    recursive: true
  } )
}

/**
 * Open file write stream.
 * @param { string } [encoding="utf8"] - Encoding format. Default utf8.
 * @returns 
 */
Gen.prototype.open = function ( encoding = 'utf8' ) {

  if ( this.stream ) return

  this.stream = FS.createWriteStream( this.path, {

    encoding: encoding
  } )
}

/**
 * Close the file write stream.
 */
Gen.prototype.close = function () {

  if ( this.stream ) {

    this.stream.end()

    this.stream = null
  }
}

/**
 * Write stream.
 * @param { string } content - What to write to the stream..
 * @returns 
 */
Gen.prototype.print = function ( content ) {

  if ( !this.stream ) return

  this.stream.write( content )
}

/* System Function */
/**
 * Log output
 * @param { string } content - Title to print.
 * @param { string } color - Color name.
 * @param { array< string > } array - Detailed output contents.
 * @param { string } prefix - Verbose output prefix.
 */
function setLog ( content, color, array = [], prefix = '  ' ) {

  setPrint( '*', content, color )

  if ( array.length > 0 ) {

    array = JSON.parse( JSON.stringify( array ) )

    let cur = array.pop()

    for ( row of array ) {

      if ( row instanceof Array ) {

        setPrint( prefix + '├', row.join( ' :: ' ), color )

      } else {

        setPrint( prefix + '├', row, color )
      }
    }

    if ( cur instanceof Array ) {

      setPrint( prefix + '└', cur.join( ' :: ' ), color )

      console.log()

    } else {

      setPrint( prefix + '└', cur, color )

      console.log()
    }
  }
}

/**
 * Generate output file.
 * @param { string } dir - Folder name in which to create files.
 * @param { string } loc - Path where the list of files to be created is located.
 * @param { string } spc - Space character.
 * @param { string } sep - Separator character.
 */
function setFile ( dir, loc, spc = '', sep = ' ' ) {

  let entries = FS.readdirSync( loc )

  entries.forEach( ( entry ) => {

    let _loc = PATH.join( loc, entry )

    if ( FS.lstatSync( _loc ).isDirectory() ) {

      FS.mkdirSync( PATH.join( dir, entry ) )

      let prefix = entries[ entries.length - 1 ] == entry ? '└' : '├'

      setPrint( '* ' + spc + prefix, entry, 'brightGreen' )

      setFile( PATH.join( dir, entry ), _loc, spc + sep )

    } else {

      FS.writeFileSync( PATH.join( dir, entry ), FS.readFileSync( _loc ) )
    }
  } )
}

/**
 * Print console.log ( https://www.npmjs.com/package/colors )
 * @param { string } prefix - A prefix that follows the colors format.
 * @param { string } content - Content that follows the colors format.
 * @param { string } color - Color name.
 * @returns 
 */
function setPrint ( prefix, content, color = 'white' ) {

  if ( content ) {

    console.log( prefix.white, content[ color ] )

    return
  }

  console.log( prefix.white )
}

/**
 * Code generation.
 */
function setExcute () {

  var paths = []
  var patterns = []

  var api = PATH.join( process.cwd(), 'api' )

  try {

    for ( let entry of FS.readdirSync( api ) ) {

      var path = PATH.join( api, entry )

      if ( FS.lstatSync( path ).isDirectory() ) continue

      if ( PATH.extname( entry ).indexOf( '.api' ) < 0 ) continue

      paths.push( path )
    }
  } catch ( error ) {

    setLog( 'Could not find api file', 'brightRed' )

    return
  }

  if ( paths.length < 1 ) {

    setLog( 'Could not find file with api extension', 'brightRed' )

    return
  }

  setLog( 'Checked api file', 'white', paths )

  let pattern = PATH.join( process.cwd(), 'pattern' )

  try {

    for ( let entry of FS.readdirSync( pattern ) ) {

      patterns.push( PATH.join( pattern, entry ) )
    }
  } catch ( error ) {

    setLog( 'Could not find pattern file', 'brightRed' )

    return
  }

  if ( patterns.length < 1 ) {

    setLog( 'Could not find pattern file', 'brightRed' )

    return
  }

  setLog( 'Checked pattern file', 'white', patterns )

  for ( path of paths ) {

    setLog( 'Start pattern process', 'brightMagenta', [ path ] )

    var manufacture = getManufacture( [ path ] )

    if ( manufacture ) {

      for ( let pattern of patterns ) {

        try {

          require( pattern )( manufacture, Gen )

          setLog( 'Create pattern', 'brightBlue', [ pattern ] )

        } catch ( error ) {

          if ( error.message.indexOf( 'require(...)' ) > -1 ) {

            setLog( 'Include the following code in your pattern file.', 'brightRed', [ pattern ] )

            setLog( 'module.exports = function( OBJ, GEN ) { /* Please write your code */ }\n', 'white' )

            return
          }

          console.log( error )
        }
      }

      setPrint( '*', 'Complete pattern process', 'brightMagenta' )
    }
  }
}

/**
 * Create example file.
 */
function setExamples () {

  var loc = PATH.join( __dirname, CONFIG.EXAMPLES )
  var dir = PATH.join( process.cwd(), COMMAND.examples )

  setPrint( '*', COMMAND.examples, 'brightGreen' )

  if ( FS.existsSync( dir ) ) {

    setLog( `The "${ COMMAND.examples }" folder exists.`, 'brightRed' )

    return
  }

  FS.mkdirSync( dir )

  setFile( dir, loc )
}

/* Manufacture Function */
/**
 * The topmost function name.
 * @param { string } name - Class name.
 */
function getTop ( name ) {

  if ( name.FUNC.length > 0 ) {

    return name.FUNC[ name.FUNC.length - 1 ]
  }

  return null
}

/**
 * Create detailed data structures.
 * @param { array < string > } variable - Parsing data.
 * @param { string } parent - Parent data parent name.
 * @param { object } struct - Same level structure object.
 */
function getData ( variable, parent, struct ) {

  let name = variable[ 2 ].replace( /(\[|\])/g, '' )

  switch ( name.toLowerCase() ) {

    case 'int':
    case 'data':
    case 'float':
    case 'double':
    case 'string':
    case 'boolean': {

      break
    }

    default: {

      if ( struct[ name ] ) {

        struct[ name ].COUNT += 1

        break
      }

      struct[ name ] = {

        COUNT: 1,
        PARENT: parent
      }

      break
    }
  }

  return {

    NAME: variable[ 1 ],
    MARK: variable[ 3 ].trim(),
    CLASS: name,
    ARRAY: RegExp( /\[(.*?)\]/g ).test( variable[ 2 ] ),
    OPTION: {}
  }
}

/**
 * System, error code generation.
 * @param { string } path - File path that needs reference for code generation(*.code).
 * @param { object } data - Generated code object.
 * @param { object } report - An object for outputting creation results.
 * @returns 
 */
function getCode ( path, data, report ) {

  var d = 0
  var n = null
  var p = PATH.join( process.cwd(), path )

  if ( FS.existsSync( p ) == false ) {

    setLog( 'Code file not found.', 'brightRed', [ p ] )

    return false
  }

  /* Read file line by line. */
  var liner = new LINE( p )

  while ( line = liner.next() ) {

    line = line.toString().trim()

    if ( line.length < 1 ) continue

    var block = line.match( /(.*?)\s{1}\{$/i )

    if ( block && block.length > 0 ) {

      d = d + 1

      switch ( d ) {

        case 1: {

          if ( data[ block[ 1 ] ] ) break

          /* init data */
          data[ block[ 1 ] ] = []

          break
        }
        case 2: {

          block = block.input.match( /(.*?)\s{1}(.*?)\{$/i )

          /* Check class name writing rules. */
          if ( RegExp( /^[0-9a-zA-Z_]+$/g ).test( block[ 1 ] ) == false ) {

            setLog( 'Class names are allowed only characters a-z, A-Z, 0-9, underline', 'brightRed', [ block[ 1 ] ] )

            return false
          }

          /* Check for duplicate code names. */
          if ( data.CODE.some( ( row ) => {

              return row.NAME == block[ 1 ]

            } ) ) {

            setLog( 'Code with the same class exists.', 'brightRed', [ block[ 1 ] ] )

            return false
          }

          n = {

            NAME: block[ 1 ],
            MARK: block[ 2 ],
            CODE: []
          }

          report[ block[ 1 ] ] = {

            COUNT: 0
          }

          break
        }
        case 3: {

          /* Check code generation rules. */
          block = block.input.match( /(.*?)\s{1}(.*?)\s{1}\{$/i )

          let code = parseInt( block[ 1 ] )

          if ( isNaN( code ) ) {

            setLog( 'Beginning of a code value can only be an integer.', 'brightRed', [ block[ 1 ] ] )

            return false
          }

          if ( n.CODE.some( ( row ) => {

              return row.CODE == code && row.NAME == block[ 2 ]

            } ) ) {

            setLog( 'Code with the same number or name exists.', 'brightRed', [ block[ 1 ], code ] )

            return false
          }

          n.CODE.push( {

            CODE: code,
            NAME: block[ 2 ],
            MARK: {}
          } )

          report[ n.NAME ].COUNT += 1

          break
        }
      }

      continue
    }

    var variable = line.match( /(.*?)\s{1}(.*?)$/i )

    if ( variable && variable.length > 0 ) {

      switch ( d ) {

        case 3: {

          var _cur = n.CODE.pop()

          _cur.MARK[ variable[ 1 ] ] = variable[ 2 ].trim()

          n.CODE.push( _cur )

          break
        }
      }

      continue
    }

    /* Check the end of the line. */
    if ( RegExp( /^}$/g ).test( line ) ) {

      d = d - 1

      switch ( d ) {

        case 1: {

          if ( n.NAME ) data.CODE.push( n )

          break
        }
      }
    }
  }

  return true
}

/**
 * Create structure file.
 * @param { string } path - File path that needs reference for structure generation(*.struct).
 * @param { object } data - Generated structure object.
 * @param {*} struct 
 * @param { object } report - An object for outputting creation results.
 * @returns 
 */
function getStruct ( path, data, struct, report ) {

  var l = 0
  var d = 0
  var p = PATH.join( process.cwd(), path )

  if ( FS.existsSync( p ) == false ) {

    setLog( 'Structure file not found.', 'brightRed', [ p ] )

    return false
  }

  /* Read file line by line. */
  var liner = new LINE( p )

  while ( line = liner.next() ) {

    l = l + 1

    try {

      line = line.toString().trim()

      if ( line.length < 1 ) continue

      var block = line.match( /(.*?)\s{1}\{$/i )

      if ( block && block.length > 0 ) {

        d = d + 1

        switch ( d ) {

          case 1: {

            if ( data[ block[ 1 ] ] ) break

            /* init data */
            data[ block[ 1 ] ] = []

            break
          }
          case 2: {

            block = block.input.match( /(.*?)\s{1}(.*?)\{$/i )

            /* Check for duplicate structures. */
            var cur = data.STRUCT.find( ( struct ) => {

              return struct.NAME === block[ 1 ]

            } ) || null

            if ( cur ) {

              var error = [

                [ cur.PATH, cur.NAME ],
                [ path, block[ 1 ] ]
              ]

              setLog( 'Structure with the same name exists.', 'brightRed', error )

              return false
            }

            data.STRUCT.push( {

              PATH: path,
              NAME: block[ 1 ],
              MARK: block[ 2 ],
              DATA: []
            } )

            report.push( block[ 1 ] )

            break
          }
          case 3: {

            var cur = data.STRUCT.pop()

            block = block.input.match( /(.*?)\s{1}(.*?)\s{1}([^\{]+)/i )

            cur.DATA.push( getData( block, cur.NAME, struct ) )

            data.STRUCT.push( cur )

            break
          }
        }

        continue
      }

      var variable = line.match( /([^\s]+)\s{1}([^\s]+)\s?(.*?)$/i )

      if ( variable && variable.length > 0 ) {

        var cur = data.STRUCT.pop()

        switch ( d ) {

          case 2: {

            cur.DATA.push( getData( variable, cur.NAME, struct ) )

            break
          }

          case 3: {

            var pop = cur.DATA.pop()

            pop.OPTION[ variable[ 1 ] ] = [ variable[ 2 ], variable[ 3 ] ].join( ' ' )

            cur.DATA.push( pop )

            break
          }
        }

        data.STRUCT.push( cur )

        continue
      }

      /* Check the end of the line. */
      if ( RegExp( /^}$/g ).test( line ) ) {

        d = d - 1
      }
    } catch ( error ) {

      setLog( 'Syntax error occurred.', 'brightRed', [

        [ p, l ]
      ] )

      return false
    }
  }

  return true
}

/**
 * Manufacture objects that fit patterns.
 * @param { array< string > } paths - Pattern file list.
 * @returns 
 */
function getManufacture ( paths ) {

  var data = {}
  var error = []
  var report = {

    code: {},
    class: {},
    struct: []
  }
  var verify = {

    proc: {},
    struct: {}
  }

  for ( let path of paths ) {

    var d = 0
    var l = 0
    var k = null
    var n = null

    var liner = new LINE( path )

    while ( line = liner.next() ) {

      l = l + 1

      try {

        line = line.toString().trim()

        if ( line.length < 1 ) continue

        /* Checking import patterns and loading files. */
        if ( RegExp( /^(import\s{1}(.*?)$)/g ).test( line ) ) {

          let ext = PATH.extname( line )
          let name = line.replace( 'import', '' ).trim()

          if ( ext ) {

            switch ( ext ) {

              case '.code': {

                if ( getCode( name, data, report.code ) ) break

                return false
              }

              case '.struct': {

                if ( getStruct( name, data, verify.struct, report.struct ) ) break

                return false
              }
            }

            continue
          }
        }

        var block = line.match( /(.*?)\s{1}\{$/i )

        if ( block && block.length > 0 ) {

          d = d + 1

          switch ( d ) {

            case 1: {

              if ( data[ block[ 1 ] ] ) break

              /* init api */
              data[ block[ 1 ] ] = []

              break
            }
            case 2: {

              block = block.input.match( /(.*?)\s{1}(.*?)\{$/i )

              /* Check class name writing rules. */
              if ( RegExp( /^[0-9a-zA-Z_]+$/g ).test( block[ 1 ] ) == false ) {

                setLog( 'Class names are allowed only characters a-z, A-Z, 0-9, underline', 'brightRed', [ block[ 1 ] ] )

                return false
              }

              /* Check for duplicate api names. */
              if ( data.API.some( ( row ) => {

                  return row.NAME == block[ 1 ]

                } ) ) {

                setLog( 'Api with the same class exists.', 'brightRed', [ block[ 1 ] ] )

                return false
              }

              n = {

                BASE: null,
                NAME: block[ 1 ],
                MARK: block[ 2 ],
                FUNC: []
              }

              report.class[ block[ 1 ] ] = {

                COUNT: 0
              }

              break
            }
            case 3: {

              block = block.input.match( /(.*?)\s{1}(.*?)\s{1}([^\{]+)/i )

              code = parseInt( block[ 2 ] )

              /* Check for duplicate API numbers. */
              if ( isNaN( code ) ) {

                setLog( 'Code value of API function can input only integer.', 'brightRed', [

                  [ block[ 1 ], block[ 2 ] ]
                ] )

                return false
              }

              /* Check for duplicate API function names and output errors. */
              var func = n.FUNC.find( ( row ) => {

                return row.NAME === block[ 1 ] || row.CODE === code

              } ) || null

              if ( func ) {

                var error = [

                  [ func.path, func.NAME, func.CODE ],
                  [ path, block[ 1 ], code ]
                ]

                setLog( 'Api with the same function exists.', 'brightRed', error )

                return false
              }

              n.FUNC.push( {

                CODE: code,
                NAME: block[ 1 ],
                DESC: block[ 3 ].trim(),
                PATH: path
              } )

              report.class[ n.NAME ].COUNT += 1

              continue
            }
            case 4: {

              /* Check ACCP reserved words. */
              if ( RegExp( /^(PROC|MARK|OPT|REQ|RES)\s{1}\{/g ).test( block.input ) == false ) {

                setLog( 'Only the following instructions are allowed to blockcode.', 'brightRed', [ 'OPT', 'REQ', 'RES', 'PROC', 'MARK' ] )

                return false
              }

              k = {

                NAME: block[ 1 ]
              }

              switch ( k.NAME ) {

                case 'REQ':
                case 'RES':
                case 'OPT':
                case 'MARK':
                case 'PROC': {

                  k.DATA = []

                  break
                }
              }

              continue
            }
            case 5: {

              switch ( k.NAME ) {

                case 'REQ':
                case 'RES': {

                  block = block.input.match( /(.*?)\s{1}(.*?)\s{1}([^\{]+)/i )

                  k.DATA.push( getData( block, getTop( n ).NAME, verify.struct ) )

                  break
                }
              }

              continue
            }
          }

          continue
        }

        var variable = line.match( /([^\s]+)\s{1}([^\s]+)\s?(.*?)$/i )

        /* Check ACCP reserved words. */
        if ( variable && variable.length > 0 ) {

          switch ( variable[ 1 ] ) {

            case 'GET':
            case 'PUT':
            case 'POST':
            case 'PATCH':
            case 'DELETE': {

              var cur = n.FUNC.pop()

              cur[ variable[ 1 ] ] = variable[ 2 ]

              n.FUNC.push( cur )

              continue
            }
            case 'COMP': {

              var cur = n.FUNC.pop()

              cur[ variable[ 1 ] ] = variable[ 2 ] === 'true'

              n.FUNC.push( cur )

              continue
            }
            case 'BASE': {

              n.BASE = variable[ 2 ]

              continue
            }
          }

          if ( k && k.NAME ) {

            switch ( k.NAME ) {

              case 'OPT': {

                k.DATA.push( {

                  NAME: variable[ 1 ],
                  VALUE: Boolean( variable[ 2 ] )
                } )

                break
              }
              case 'REQ':
              case 'RES': {

                switch ( d ) {

                  case 4: {

                    k.DATA.push( getData( variable, getTop( n ).NAME, verify.struct ) )

                    break
                  }

                  case 5: {

                    var pop = k.DATA.pop()

                    pop.OPTION[ variable[ 1 ] ] = [ variable[ 2 ], variable[ 3 ] ].join( ' ' )

                    k.DATA.push( pop )

                    break
                  }
                }

                break
              }
              case 'MARK': {

                k.DATA.push( {

                  NAME: variable[ 1 ],
                  MARK: [ variable[ 2 ], variable[ 3 ] ].join( ' ' )
                } )

                break
              }
              case 'PROC': {

                let code = parseInt( variable[ 1 ] )

                if ( isNaN( code ) ) {

                  setLog( 'PROC code can input only integer.', 'brightRed', [

                    [ variable[ 1 ], variable[ 2 ] ]
                  ] )

                  return false
                }

                k.DATA.push( {

                  NAME: variable[ 2 ],
                  CODE: code
                } )

                if ( verify.proc[ code ] ) {

                  verify.proc[ code ].COUNT += 1

                  break
                }

                verify.proc[ code ] = {

                  CODE: code,
                  NAME: variable[ 2 ],
                  COUNT: 1,
                  PARENT: getTop( n ).NAME
                }

                break
              }
            }
          }

          continue
        }

        /* Check the end of the line. */
        if ( RegExp( /^}$/g ).test( line ) ) {

          d = d - 1

          switch ( d ) {

            case 1: {

              if ( n.NAME ) {

                data.API.push( n )
              }

              break
            }

            case 3: {

              if ( k.NAME ) {

                var pop = n.FUNC.pop()

                pop[ k.NAME ] = k.DATA

                n.FUNC.push( pop )
              }

              break
            }
          }
        }
      } catch ( error ) {

        setLog( 'Syntax error occurred.', 'brightRed', [

          [ path, l ]
        ] )

        return false
      }
    }
  }

  /* Object verification. */
  var keys = {

    code: Object.keys( report.code ),
    class: Object.keys( report.class )
  }

  var result = {

    code: [],
    class: []
  }

  let name = keys.code.find( ( name ) => {

    return keys.class.indexOf( name ) > -1
  } )

  if ( name ) {

    setLog( `Duplicate names exist in API Class and Code.`, 'brightRed', [ name ] )

    return null
  }

  for ( i of Object.keys( keys ) ) {

    for ( j of Object.keys( report[ i ] ) ) {

      if ( report.struct.indexOf( j ) > -1 ) {

        setLog( `Duplicate names exist in API ${ i[ 0 ].toUpperCase().concat( i.substr( 1 ) ) } and Struct.`, 'brightRed', [ j ] )

        return null
      }

      result[ i ].push( [ j, report[ i ][ j ].COUNT ] )
    }
  }

  for ( var key of Object.keys( verify.struct ) ) {

    if ( report.struct.indexOf( key ) < 0 ) {

      error.push( [ verify.struct[ key ].PARENT, key ] )
    }
  }

  if ( error.length > 0 ) {

    setLog( 'Structure is not declared.', 'brightRed', error )

    return null
  }

  for ( var key of Object.keys( verify.proc ) ) {

    var p = verify.proc[ key ]

    if ( data.API.some( ( n ) => {

        return n.FUNC.some( ( row ) => {

          let name = p.NAME.split( '.' )

          return n.NAME == name[ 0 ] && row.CODE == p.CODE && row.NAME == name[ 1 ]
        } )
      } ) ) {

      continue
    }

    error.push( [ p.PARENT, p.NAME, key ] )
  }

  if ( error.length > 0 ) {

    setLog( 'Code number specified by PROC name does not exist.', 'brightRed', error )

    return null
  }

  setLog( 'Class count', 'brightGreen', [

    [ keys.class.length ]
  ] )

  setLog( 'Function count', 'brightGreen', result.class )

  setLog( 'Struct count', 'brightGreen', [

    [ report.struct.length ]
  ] )

  setLog( 'Code class count', 'brightGreen', [

    [ keys.code.length ]
  ] )

  setLog( 'Code message count', 'brightGreen', result.code )

  return data
}

/**
 * Generating shell commands.
 */
COMMAND.version( '1.3.1-beta' )

COMMAND
  .option( '--compile', 'Compile patterns.' )
  .option( '--examples <folder>', 'Generate an example file.' )

COMMAND.parse( process.argv )

if ( COMMAND.compile ) {

  setPrint( '\n!', 'Start accp complie\n', 'yellow' )

  setExcute()

  setPrint( '\n!', 'Complete accp complie\n', 'yellow' )

  return
}

if ( COMMAND.examples ) {

  setPrint( '\n!', 'Start accp make examples file\n', 'yellow' )

  setExamples()

  setPrint( '\n!', 'Complete accp make examples file\n', 'yellow' )

  return
}