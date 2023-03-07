const PATH = require( 'path' )

const BASE = 'out/flutter'

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

  // set api
  gen( OBJ, GEN )

  // get struct
  struct( OBJ, GEN )
}

function gen( OBJ, GEN ) {

  // set config
  var config = new GEN( PATH.join( BASE, 'pub', 'config.dart' ) )

  config.open()

  config.print( `
class Config {

  static const dev = 'http://localhost:8080';

  static const pub = 'http:..localhost';

  static const timeout = 20;

  static const statusSuccess = 200;
}

class InvalidStatusCodeException implements Exception {

  final int? statusCode;

  InvalidStatusCodeException( this.statusCode );

  @override
  String toString() {

    return "InvalidStatusCodeException. status code : $statusCode";
  }
}
` )

  config.close()

  for ( API of OBJ.API ) {

    // init
    var api = new GEN( PATH.join( BASE, 'api', `${ API.NAME.toLowerCase() }.dart` ) )
    var req = new GEN( PATH.join( BASE, 'req', `${ API.NAME.toLowerCase() }.dart` ) )
    var res = new GEN( PATH.join( BASE, 'res', `${ API.NAME.toLowerCase() }.dart` ) )

    // set open
    api.open()
    req.open()
    res.open()

    setApi( api, API )

    setReq( req, API )

    setRes( res, API )

    // set close
    api.close()
    req.close()
    res.close()
  }
}

function struct( OBJ, GEN ) {

  // init
  var out = new GEN( PATH.join( BASE, 'pub', 'struct.dart' ) )

  // set open
  out.open()

  // set def
  out.print( `
import 'package:json_annotation/json_annotation.dart';

part 'struct.g.dart';
` )

  // set struct
  for ( STRUCT of OBJ.STRUCT ) {

    setStruct( out, STRUCT )
  }

  // set close
  out.close()
}

function setApi( api, API ) {

  api.print( `
import 'dart:async';
import 'dart:collection';

import 'package:dio/dio.dart' as dio;
import 'package:flutter/material.dart';

import 'package:fancast_flutter/network/req/${ API.NAME.toLowerCase() }.dart' as req;
import 'package:fancast_flutter/network/res/${ API.NAME.toLowerCase() }.dart' as res;

import 'package:fancast_flutter/network/pub/config.dart';
import 'package:fancast_flutter/network/pub/struct.dart' as struct;

class ${ getClassName( API.NAME ) }Service {

  static final dio.Dio _dio = dio.Dio(); 

  ${ getClassName( API.NAME ) }Service._(); 
  ${ Array.from( API.FUNC, ( FUNC ) => {

    if ( FUNC.COMP == false ) return

    var METHOD = getMethod( FUNC )

    return `
  /// Desc: ${ FUNC.DESC }, If [pub] is false, connect to the development server.
  /// Code: ${ FUNC.CODE }
  /// Comp: ${ FUNC.COMP.toString() }
  ///
  /// Process: 
  ${ getProc( FUNC.PROC ) }
  ///
  /// Question:
  ${ getList( FUNC.MARK ) }
  static Future< struct.Response > ${ getFuncName( FUNC.NAME ) }( HashMap< String, String > headers, { req.${ FUNC.NAME }? req, bool pub = true, dio.CancelToken? cancelToken } ) async {

    /// Debug request
    if ( !pub ) debugPrint( 'Request name: "${ METHOD.NAME }:${ FUNC.NAME }", path: "/${ API.BASE }/${ METHOD.PATH }", req: "\${ req?.toJson() }"' );

    return _dio.${ METHOD.NAME }( '\${ pub ? Config.pub : Config.dev }/${ API.BASE }/${ METHOD.PATH }', ${ METHOD.QUERY ? 'queryParameters: req?.toJson()' : 'data: req?.toJson()' }, options: dio.Options( headers: headers ), cancelToken: cancelToken ).timeout( const Duration( seconds: Config.timeout ), onTimeout: () {

      throw TimeoutException( null );

    } ).then( ( http ) {

      /// Debug response
      if ( !pub ) debugPrint( 'Response name: "${ METHOD.NAME }:${ FUNC.NAME }", path: "/${ API.BASE }/${ METHOD.PATH }", res: "\$http"' );
  
      if ( http.statusCode != Config.statusSuccess ) throw InvalidStatusCodeException( http.statusCode );
  
      struct.Response raw = struct.Response();
  
      raw.response = res.${ FUNC.NAME }.fromJson( http.data );
  
      raw.status = raw.response?.status;
  
      return raw;
    } );
  }`
  } ).join( TYPO.LINE ) }
}` )
}

function setReq( req, API ) {

    // set req
    req.print( `
import 'package:json_annotation/json_annotation.dart';

import 'package:fancast_flutter/network/pub/struct.dart';

part '${ API.NAME.toLowerCase() }.g.dart';
` )

  for ( FUNC of API.FUNC ) {

    if ( FUNC.COMP == false ) continue

    req.print( `
/// Description: ${ FUNC.DESC }
@JsonSerializable()
class ${ FUNC.NAME } {

  ${ getInitialize( FUNC.REQ, true ) }

  ${ FUNC.NAME }(${ getStruct( FUNC.REQ ) });

  factory ${ FUNC.NAME }.fromJson( Map< String, dynamic > json ) => _$${ FUNC.NAME }FromJson( json );

  Map< String, dynamic > toJson() => _$${ FUNC.NAME }ToJson( this );
}
` )
  }
}

function setRes( res, API ) {

    // set res
    res.print( `
import 'package:json_annotation/json_annotation.dart';

import 'package:fancast_flutter/network/pub/struct.dart';

part '${ API.NAME.toLowerCase() }.g.dart';
` )

  for ( FUNC of API.FUNC ) {

    if ( FUNC.COMP == false ) continue

    if ( FUNC.RES == undefined ) FUNC.RES = []

    res.print( `
/// Description: ${ FUNC.DESC }
@JsonSerializable()
class ${ FUNC.NAME } {

  ${ getInitialize( FUNC.RES, true ) }

  ${ FUNC.NAME }(${ getStruct( FUNC.RES ) });

  factory ${ FUNC.NAME }.fromJson( Map< String, dynamic > json ) => _$${ FUNC.NAME }FromJson( json );

  Map< String, dynamic > toJson() => _$${ FUNC.NAME }ToJson( this );
}
` )
  }
}

function setStruct( out, STRUCT ) {

  out.print( `
/// Description: ${ STRUCT.MARK }
@JsonSerializable()
class ${ STRUCT.NAME } {

  ${ getInitialize( STRUCT.DATA ) }

  ${ STRUCT.NAME }(${ getStruct( STRUCT.DATA ) });

  factory ${ STRUCT.NAME }.fromJson( Map< String, dynamic > json ) => _$${ STRUCT.NAME }FromJson( json );

  Map< String, dynamic > toJson() => _$${ STRUCT.NAME }ToJson( this );
}
` )
}

/* function */
function getCode( CODE ) {

  var values = [ `${ TYPO.LINE + TYPO.SPC2 }/* ${ CODE.NAME } */` ]

  return values.concat( Array.from( CODE.CODE, ( ROW ) => {

    return `public static readonly ${ CODE.NAME }_${ ROW.NAME } = ${ ROW.CODE }`
  } ) )
}

function getPath( path ) {

  if ( path == '/' ) return ''

  return path
}

function getProc( PROC ) {

  if ( PROC ) {

    return Array.from( PROC, ROW => {

      return `/// * [${ ROW.NAME }] ${ ROW.MARK || ROW.CODE }`

    } ).join( TYPO.LINE + TYPO.SPC2 )
  }

  return '/// * nothing'
}

function getList( MARK ) {

  if ( MARK ) {

    return Array.from( MARK, ROW => {

      return `/// * ${ ROW.NAME } ${ ROW.MARK || ROW.CODE }`

    } ).join( TYPO.LINE + TYPO.SPC2 )
  }

  return '/// * nothing'
}

function getClass( DATA, parent = false ) {

  switch ( DATA.CLASS ) {

    case 'Int':
    case 'Double': {

      return DATA.ARRAY ? `List< ${ DATA.CLASS.toLowerCase() } >?` : `${ DATA.CLASS.toLowerCase() }?`
    }
    case 'Data': {

      return DATA.ARRAY ? 'List< dynamic >?' : 'dynamic'
    }
    case 'Float': {

      return DATA.ARRAY ? 'List< double >?' : 'double'
    }
    case 'Boolean': {

      return DATA.ARRAY ? 'List< int >?' : 'int?'
    }
    default: {

      return DATA.ARRAY ? `List< ${ DATA.CLASS } >?` : `${ DATA.CLASS }?`
    }
  }
}

function getStruct( DATA ) {

  if ( DATA ) {

    return ` { ${ TYPO.LINE + TYPO.LINE + TYPO.SPC4 }${ Array.from( DATA, ( _DATA ) => `this.${ _DATA.NAME }` ).join( TYPO.COMMA + TYPO.LINE + TYPO.SPC4 ) + TYPO.LINE + TYPO.SPC2 } } `
  }

  return TYPO.EMPTY
}

function getMethod( FUNC ) {

  if ( FUNC.GET ) {

    return {

      PATH: getPath( FUNC.GET ),
      NAME: 'get',
      QUERY: true
    }
  }

  if ( FUNC.PUT ) {

    return {

      PATH: getPath( FUNC.PUT ),
      NAME: 'put',
      QUERY: false
    }
  }

  if ( FUNC.POST ) {

    return {

      PATH: getPath( FUNC.POST ),
      NAME: 'post',
      QUERY: false
    }
  }

  if ( FUNC.PATCH ) {

    return {

      PATH: getPath( FUNC.PATCH ),
      NAME: 'patch',
      QUERY: false
    }
  }

  return {

    PATH: getPath( FUNC.DELETE ),
    NAME: 'delete',
    QUERY: true
  }
}

function getFuncName( NAME ) {

  return NAME.substr( 0, 1 ).toLowerCase() + NAME.substr( 1 )
}

function getClassName( NAME ) {

  return NAME.substr( 0, 1 ).toUpperCase() + NAME.substr( 1 ).toLowerCase()
}

function getInitialize( DATA, parent = false ) {

  if ( DATA ) {

    return Array.from( DATA, ( _DATA ) => `/// ${ _DATA.MARK + TYPO.LINE + TYPO.SPC2 }@JsonKey( name: '${ _DATA.NAME }' ) ${ getClass( _DATA, parent ) } ${_DATA.NAME };` ).join( TYPO.LINE + TYPO.SPC2 )
  }

  return TYPO.EMPTY
}