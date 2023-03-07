#!/usr/bin/env node

const FS = require( 'fs' )
const PATH = require( 'path' )
const COMMAND = require( 'commander' )

// dependency
const LINE = require( 'n-readlines' )
const COLOR = require( 'colors' )

const CONFIG = {

  EXAMPLES: '../examples'
}

// module
function Gen( path ) {

  this.path = path
  this.stream = null
}

Gen.prototype.open = function( encoding = 'utf8' ) {

  if ( this.stream ) {

    return
  }

  this.stream = FS.createWriteStream( this.path, {

    encoding: encoding
  } )
}

Gen.prototype.close = function() {

  if ( this.stream ) {

    this.stream.end()

    this.stream = null
  }
}

Gen.prototype.print = function( content ) {

  if ( this.stream == null ) {

    return
  }

  this.stream.write( content )
}

// func, system
function setLog( content, color, array = [], prefix = '  ' ) {

  setPrint( '*', content, color )

  // check array
  if ( array.length > 0 ) {

    // get clone
    array = JSON.parse( JSON.stringify( array ) )

    // get cur
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

function setFile( dir, loc, spc = '', sep = ' ' ) {

  let entries = FS.readdirSync( loc )

  entries.forEach( ( entry ) => {

    // get loc
    let _loc = PATH.join( loc, entry )

    // check dir
    if ( FS.lstatSync( _loc ).isDirectory() ) {

      FS.mkdirSync( PATH.join( dir, entry ) )

      // get prefix
      let prefix = entries[ entries.length - 1 ] == entry ? '└' : '├'

      // set print
      setPrint( '* ' + spc + prefix, entry, 'brightGreen' )

      // set file
      setFile( PATH.join( dir, entry ), _loc, spc + sep )

    } else {

      // make file
      FS.writeFileSync( PATH.join( dir, entry ), FS.readFileSync( _loc ) )
    }
  } )
}

function setPrint( prefix, content, color = 'white' ) {

  if ( content ) {

    console.log( prefix.white, content[ color ] )

    return
  }

  console.log( prefix.white )
}

function setExcute() {

  // set init
  var paths = []
  var patterns = []

  // check api
  var api = PATH.join( process.cwd(), 'api' )

  try {

    // get entry
    for ( let entry of FS.readdirSync( api ) ) {

      var path = PATH.join( api, entry )

      // check dir
      if ( FS.lstatSync( path ).isDirectory() ) continue

      // check ext
      if ( PATH.extname( entry ).indexOf( '.api' ) < 0 ) continue

      // set path
      paths.push( path )
    }
  } catch ( error ) {

    setLog( 'Could not find api file', 'brightRed' )

    return
  }

  // check path arr
  if ( paths.length < 1 ) {

    setLog( 'Could not find file with api extension', 'brightRed' )

    return
  }

  setLog( 'Checked api file', 'white', paths )

  // check pattern
  let pattern = PATH.join( process.cwd(), 'pattern' )

  try {

    for ( let entry of FS.readdirSync( pattern ) ) {

      patterns.push( PATH.join( pattern, entry ) )
    }
  } catch ( error ) {

    setLog( 'Could not find pattern file', 'brightRed' )

    return
  }

  // check pattern arr
  if ( patterns.length < 1 ) {

    setLog( 'Could not find pattern file', 'brightRed' )

    return
  }

  setLog( 'Checked pattern file', 'white', patterns )

  for ( path of paths ) {

    setLog( 'Start pattern process', 'brightMagenta', [ path ] )

    // get manufacture
    var manufacture = getManufacture( [ path ] )

    // check manufacture
    if ( manufacture ) {

      // require pattern
      for ( let pattern of patterns ) {

        try {

          require( pattern )( manufacture, Gen )

          setLog( 'Create pattern', 'brightBlue', [ pattern ] )

        } catch ( error ) {

          if ( error.message.indexOf( 'require(...)' ) > -1 ) {

            // print file
            setLog( 'Include the following code in your pattern file.', 'brightRed', [ pattern ] )

            // print code
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

function setExamples() {

  // get dir
  var loc = PATH.join( __dirname, CONFIG.EXAMPLES )
  var dir = PATH.join( process.cwd(), COMMAND.examples )

  setPrint( '*', COMMAND.examples, 'brightGreen' )

  // check examples
  if ( FS.existsSync( dir ) ) {

    setLog( `The "${ COMMAND.examples }" folder exists.`, 'brightRed' )

    return
  }

  // make dir
  FS.mkdirSync( dir )

  // make project
  setFile( dir, loc )
}

// func, manufacture
function getTop( _class ) {

  if ( _class.FUNC.length > 0 ) {

    return _class.FUNC[ _class.FUNC.length - 1 ]
  }

  return null
}

function getData( variable, parent, struct ) {

  // get class
  let _class = variable[ 2 ].replace( /(\[|\])/g, '' )

  // check class
  switch ( _class.toLowerCase() ) {

    case 'int':
    case 'data':
    case 'float':
    case 'double':
    case 'string':
    case 'boolean': {

      // do noting
      break
    }

    default: {

      // set struct
      if ( struct[ _class ] ) {

        struct[ _class ].COUNT += 1

        break

      }

      struct[ _class ] = {

        COUNT: 1,
        PARENT: parent
      }

      break
    }
  }

  // get array
  let _array = RegExp( /\[(.*?)\]/g ).test( variable[ 2 ] )

  return {

    NAME: variable[ 1 ],
    MARK: variable[ 3 ].trim(),
    CLASS: _class,
    ARRAY: _array,
    OPTION: {}
  }
}

function getCode( path, data, report ) {

  // init
  var _deep = 0
  var _path = PATH.join( process.cwd(), path )
  var _class = null

  // check file
  if ( FS.existsSync( _path ) == false ) {

    setLog( 'Code file not found.', 'brightRed', [ _path ] )

    return false
  }

  var liner = new LINE( _path )

  while ( line = liner.next() ) {

    // get trim 
    line = line.toString().trim()

    // check line
    if ( line.length < 1 ) continue

    // get block
    var block = line.match( /(.*?)\s{1}\{$/i )

    // check block
    if ( block && block.length > 0 ) {

      _deep = _deep + 1

      switch ( _deep ) {

        case 1: {

          // check struct
          if ( data[ block[ 1 ] ] ) break

          // init struct
          data[ block[ 1 ] ] = []

          break
        }
        case 2: {

          block = block.input.match( /(.*?)\s{1}(.*?)\{$/i )

          // check class
          if ( RegExp( /^[0-9a-zA-Z_]+$/g ).test( block[ 1 ] ) == false ) {

            setLog( 'Class names are allowed only characters a-z, A-Z, 0-9, underline', 'brightRed', [ block[ 1 ] ] )

            return false
          }

          // check class
          if ( data.CODE.some( ( row ) => {

              return row.NAME == block[ 1 ]

            } ) ) {

            setLog( 'Code with the same class exists.', 'brightRed', [ block[ 1 ] ] )

            return false
          }

          // set class
          _class = {

            NAME: block[ 1 ],
            MARK: block[ 2 ],
            CODE: []
          }

          // set report
          report[ block[ 1 ] ] = {

            COUNT: 0
          }

          break
        }
        case 3: {

          block = block.input.match( /(.*?)\s{1}(.*?)\s{1}\{$/i )

          let code = parseInt( block[ 1 ] )

          // check code
          if ( isNaN( code ) ) {

            setLog( 'Beginning of a code value can only be an integer.', 'brightRed', [ block[ 1 ] ] )

            return false
          }

          // check class
          if ( _class.CODE.some( ( row ) => {

              return row.CODE == code && row.NAME == block[ 2 ]

            } ) ) {

            setLog( 'Code with the same number or name exists.', 'brightRed', [ block[ 1 ], code ] )

            return false
          }

          // set class
          _class.CODE.push( {

            CODE: code,
            NAME: block[ 2 ],
            MARK: {}
          } )

          // set report
          report[ _class.NAME ].COUNT += 1

          break
        }
      }

      continue
    }

    // get variable
    var variable = line.match( /(.*?)\s{1}(.*?)$/i )

    // check variable
    if ( variable && variable.length > 0 ) {

      switch ( _deep ) {

        case 3: {

          var _cur = _class.CODE.pop()

          _cur.MARK[ variable[ 1 ] ] = variable[ 2 ].trim()

          _class.CODE.push( _cur )

          break
        }
      }

      continue
    }

    // check end
    if ( RegExp( /^}$/g ).test( line ) ) {

      _deep = _deep - 1

      // check deep
      switch ( _deep ) {

        case 1: {

          // check class
          if ( _class.NAME ) {

            data.CODE.push( _class )
          }

          break
        }
      }
    }
  }

  return true
}

function getStruct( path, data, struct, report ) {

  // init
  var _line = 0
  var _deep = 0
  var _path = PATH.join( process.cwd(), path )

  // check file
  if ( FS.existsSync( _path ) == false ) {

    setLog( 'Structure file not found.', 'brightRed', [ _path ] )

    return false
  }

  var _liner = new LINE( _path )

  // get line
  while ( line = _liner.next() ) {

    // set line
    _line = _line + 1

    try {

      // get trim 
      line = line.toString().trim()
  
      // check line
      if ( line.length < 1 ) continue
  
      // get block
      var block = line.match( /(.*?)\s{1}\{$/i )
  
      // check block
      if ( block && block.length > 0 ) {
  
        _deep = _deep + 1
  
        switch ( _deep ) {
  
          case 1: {
  
            // check struct
            if ( data[ block[ 1 ] ] ) break
  
            // init struct
            data[ block[ 1 ] ] = []
  
            break
          }
          case 2: {
  
            block = block.input.match( /(.*?)\s{1}(.*?)\{$/i )
  
            // check struct
            var cur = data.STRUCT.find( ( struct ) => {
  
              return struct.NAME === block[ 1 ]
  
            } ) || null
  
            // same struct
            if ( cur ) {
  
              // get error
              var error = [
  
                [ cur.PATH, cur.NAME ],
                [ path, block[ 1 ] ]
              ]
  
              setLog( 'Structure with the same name exists.', 'brightRed', error )
  
              return false
            }
  
            // set struct
            data.STRUCT.push( {
  
              PATH: path,
              NAME: block[ 1 ],
              MARK: block[ 2 ],
              DATA: []
            } )
  
            // set report
            report.push( block[ 1 ] )
  
            break
          }
          case 3: {
  
            var cur = data.STRUCT.pop()
  
            block = block.input.match( /(.*?)\s{1}(.*?)\s{1}([^\{]+)/i )
  
            // set data
            cur.DATA.push( getData( block, cur.NAME, struct ) )
  
            data.STRUCT.push( cur )
  
            break
          }
        }
  
        continue
      }
  
      // get variable
      var variable = line.match( /([^\s]+)\s{1}([^\s]+)\s?(.*?)$/i )
  
      // check variable
      if ( variable && variable.length > 0 ) {
  
        // get cur
        var cur = data.STRUCT.pop()
  
        switch ( _deep ) {
  
          case 2: {
  
            // set data
            cur.DATA.push( getData( variable, cur.NAME, struct ) )
  
            break
          }
  
          case 3: {
  
            // get data
            var _cur = cur.DATA.pop()
  
            // set option
            _cur.OPTION[ variable[ 1 ] ] = [ variable[ 2 ], variable[ 3 ] ].join( ' ' )
  
            // set option
            cur.DATA.push( _cur )
  
            break
          }
        }
  
        // set cur
        data.STRUCT.push( cur )
  
        continue
      }
  
      // check end
      if ( RegExp( /^}$/g ).test( line ) ) {
  
        _deep = _deep - 1
      }
    } catch ( error ) {

      setLog( 'Syntax error occurred.', 'brightRed', [
        
        [ _path, _line ]
      ] )

      return false
    }
  }

  return true
}

function getManufacture( paths ) {

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

  // get path
  for ( let path of paths ) {

    var _key = null
    var _line = 0
    var _deep = 0
    var _class = null
    var _liner = new LINE( path )

    while ( line = _liner.next() ) {

      // set line
      _line = _line + 1

      try {

        // get trim 
        line = line.toString().trim()

        // check line
        if ( line.length < 1 ) continue

        // check import
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

        // get block
        var block = line.match( /(.*?)\s{1}\{$/i )

        if ( block && block.length > 0 ) {

          _deep = _deep + 1

          // check deep
          switch ( _deep ) {

            case 1: {

              // check api
              if ( data[ block[ 1 ] ] ) break

              // init api
              data[ block[ 1 ] ] = []

              break
            }
            case 2: {

              block = block.input.match( /(.*?)\s{1}(.*?)\{$/i )

              // check class
              if ( RegExp( /^[0-9a-zA-Z_]+$/g ).test( block[ 1 ] ) == false ) {

                setLog( 'Class names are allowed only characters a-z, A-Z, 0-9, underline', 'brightRed', [ block[ 1 ] ] )

                return false
              }

              // check class
              if ( data.API.some( ( row ) => {

                  return row.NAME == block[ 1 ]

                } ) ) {

                setLog( 'Api with the same class exists.', 'brightRed', [ block[ 1 ] ] )

                return false
              }

              // set class
              _class = {

                BASE: null,
                NAME: block[ 1 ],
                MARK: block[ 2 ],
                FUNC: []
              }

              // set report
              report.class[ block[ 1 ] ] = {

                COUNT: 0
              }

              break
            }
            case 3: {

              block = block.input.match( /(.*?)\s{1}(.*?)\s{1}([^\{]+)/i )

              // get code
              code = parseInt( block[ 2 ] )

              // check code
              if ( isNaN( code ) ) {

                setLog( 'Code value of API function can input only integer.', 'brightRed', [

                  [ block[ 1 ], block[ 2 ] ]
                ] )

                return false
              }

              // check func
              var func = _class.FUNC.find( ( row ) => {

                return row.NAME === block[ 1 ] || row.CODE === code

              } ) || null

              // same func
              if ( func ) {

                // get error
                var error = [

                  [ func.path, func.NAME, func.CODE ],
                  [ path, block[ 1 ], code ]
                ]

                setLog( 'Api with the same function exists.', 'brightRed', error )

                return false
              }

              // set func
              _class.FUNC.push( {

                CODE: code,
                NAME: block[ 1 ],
                DESC: block[ 3 ].trim(),
                PATH: path
              } )

              // set report
              report.class[ _class.NAME ].COUNT += 1

              continue
            }
            case 4: {

              // check key
              if ( RegExp( /^(PROC|MARK|OPT|REQ|RES)\s{1}\{/g ).test( block.input ) == false ) {

                setLog( 'Only the following instructions are allowed to blockcode.', 'brightRed', [ 'OPT', 'REQ', 'RES', 'PROC', 'MARK' ] )

                return false
              }

              // init key
              _key = {

                NAME: block[ 1 ]
              }

              // set data
              switch ( _key.NAME ) {

                case 'REQ':
                case 'RES':
                case 'OPT':
                case 'MARK':
                case 'PROC': {

                  _key.DATA = []

                  break
                }
              }

              continue
            }
            case 5: {

              // check key
              switch ( _key.NAME ) {

                case 'REQ':
                case 'RES': {

                  block = block.input.match( /(.*?)\s{1}(.*?)\s{1}([^\{]+)/i )

                  // set data
                  _key.DATA.push( getData( block, getTop( _class ).NAME, verify.struct ) )

                  break
                }
              }

              continue
            }
          }

          continue
        }

        // get variable
        var variable = line.match( /([^\s]+)\s{1}([^\s]+)\s?(.*?)$/i )

        // check variable
        if ( variable && variable.length > 0 ) {

          // check key
          switch ( variable[ 1 ] ) {

            case 'GET':
            case 'PUT':
            case 'POST':
            case 'PATCH':
            case 'DELETE': {

              // get data
              var cur = _class.FUNC.pop()

              cur[ variable[ 1 ] ] = variable[ 2 ]

              // set data
              _class.FUNC.push( cur )

              continue
            }
            case 'COMP': {

              // get data
              var cur = _class.FUNC.pop()

              cur[ variable[ 1 ] ] = variable[ 2 ] === 'true'

              // set data
              _class.FUNC.push( cur )

              continue
            }
            case 'BASE': {

              _class.BASE = variable[ 2 ]

              continue
            }
          }

          // check key
          if ( _key && _key.NAME ) {

            switch ( _key.NAME ) {

              case 'OPT': {

                _key.DATA.push( {

                  NAME: variable[ 1 ],
                  VALUE: Boolean( variable[ 2 ] )
                } )

                break
              }
              case 'REQ':
              case 'RES': {

                // check deep
                switch ( _deep ) {

                  case 4: {

                    // set data
                    _key.DATA.push( getData( variable, getTop( _class ).NAME, verify.struct ) )

                    break
                  }

                  case 5: {

                    // get data
                    var _cur = _key.DATA.pop()

                    // set option
                    _cur.OPTION[ variable[ 1 ] ] = [ variable[ 2 ], variable[ 3 ] ].join( ' ' )

                    // set data
                    _key.DATA.push( _cur )

                    break
                  }
                }

                break
              }
              case 'MARK': {

                // set data
                _key.DATA.push( {

                  NAME: variable[ 1 ],
                  MARK: [ variable[ 2 ], variable[ 3 ] ].join( ' ' )
                } )

                break
              }
              case 'PROC': {

                let code = parseInt( variable[ 1 ] )

                // check code
                if ( isNaN( code ) ) {

                  setLog( 'PROC code can input only integer.', 'brightRed', [

                    [ variable[ 1 ], variable[ 2 ] ]
                  ] )

                  return false
                }

                // set data
                _key.DATA.push( {

                  NAME: variable[ 2 ],
                  CODE: code
                } )

                // set proc
                if ( verify.proc[ code ] ) {

                  verify.proc[ code ].COUNT += 1

                  break
                }

                verify.proc[ code ] = {

                  CODE: code,
                  NAME: variable[ 2 ],
                  COUNT: 1,
                  PARENT: getTop( _class ).NAME
                }

                break
              }
            }
          }

          continue
        }

        // check end
        if ( RegExp( /^}$/g ).test( line ) ) {

          _deep = _deep - 1

          // check deep
          switch ( _deep ) {

            case 1: {

              // check class
              if ( _class.NAME ) {

                data.API.push( _class )
              }

              break
            }

            case 3: {

              // check key
              if ( _key.NAME ) {

                // get pop 
                var cur = _class.FUNC.pop()

                // set merge
                cur[ _key.NAME ] = _key.DATA

                // set data
                _class.FUNC.push( cur )
              }

              break
            }
          }
        }
      } catch ( error ) {

        setLog( 'Syntax error occurred.', 'brightRed', [

          [ path, _line ]
        ] )

        return false
      }
    }
  }

  // get key
  var keys = {

    code: Object.keys( report.code ),
    class: Object.keys( report.class )
  }

  // set result
  var result = {

    code: [],
    class: []
  }

  // get code with class
  let name = keys.code.find( ( name ) => {

    return keys.class.indexOf( name ) > -1
  } )

  // check name
  if ( name ) {

    // check name
    setLog( `Duplicate names exist in API Class and Code.`, 'brightRed', [ name ] )

    return null
  }

  // set result
  for ( i of Object.keys( keys ) ) {

    for ( j of Object.keys( report[ i ] ) ) {

      // check struct
      if ( report.struct.indexOf( j ) > -1 ) {

        // check name
        setLog( `Duplicate names exist in API ${ i[ 0 ].toUpperCase().concat( i.substr( 1 ) ) } and Struct.`, 'brightRed', [ j ] )

        return null
      }

      result[ i ].push( [ j, report[ i ][ j ].COUNT ] )
    }
  }

  // check struct
  for ( var key of Object.keys( verify.struct ) ) {

    if ( report.struct.indexOf( key ) < 0 ) {

      error.push( [ verify.struct[ key ].PARENT, key ] )
    }
  }

  // check error
  if ( error.length > 0 ) {

    setLog( 'Structure is not declared.', 'brightRed', error )

    return null
  }

  // check proc
  for ( var key of Object.keys( verify.proc ) ) {

    // get data
    var _proc = verify.proc[ key ]

    // check api
    if ( data.API.some( ( _class ) => {

        return _class.FUNC.some( ( row ) => {

          let name = _proc.NAME.split( '.' )

          return _class.NAME == name[ 0 ] && row.CODE == _proc.CODE && row.NAME == name[ 1 ]
        } )
      } ) ) {

      continue
    }

    error.push( [ _proc.PARENT, _proc.NAME, key ] )
  }

  // check error
  if ( error.length > 0 ) {

    setLog( 'Code number specified by PROC name does not exist.', 'brightRed', error )

    return null
  }

  // api print
  setLog( 'Class count', 'brightGreen', [

    [ keys.class.length ]
  ] )

  setLog( 'Function count', 'brightGreen', result.class )

  // struct count
  setLog( 'Struct count', 'brightGreen', [

    [ report.struct.length ]
  ] )

  // code print
  setLog( 'Code class count', 'brightGreen', [

    [ keys.code.length ]
  ] )

  setLog( 'Code message count', 'brightGreen', result.code )

  return data
}

COMMAND.version( '1.2.3-beta' )

// set option
COMMAND
  .option( '--compile', 'Compile patterns.' )
  .option( '--examples <folder>', 'Generate an example file.' )

COMMAND.parse( process.argv )

// check compile
if ( COMMAND.compile ) {

  setPrint( '\n!', 'Start accp complie\n', 'yellow' )

  setExcute()

  setPrint( '\n!', 'Complete accp complie\n', 'yellow' )

  return
}

// check examples
if ( COMMAND.examples ) {

  setPrint( '\n!', 'Start accp make examples file\n', 'yellow' )

  setExamples()

  setPrint( '\n!', 'Complete accp make examples file\n', 'yellow' )

  return
}