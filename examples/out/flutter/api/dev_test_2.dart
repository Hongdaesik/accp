import 'dart:async';
import 'dart:developer';

import 'package:dio/dio.dart' as dio;

import 'package:flutter/res/dev_test_2.dart' as res;

import 'package:flutter/pub/code.dart';
import 'package:flutter/pub/config.dart';
import 'package:flutter/pub/struct.dart' as struct;

class Dev_test_2Service {

  static final dio.Dio _dio = dio.Dio(); 

  Dev_test_2Service._(); 

  /// Desc: function description
  /// Code: 200
  /// Comp: true
  ///
  /// Process: 
  /// * nothing
  ///
  /// Question:
  /// * param1 mark variable explain
  static Future< struct.Response > puttest( Map< String, String > headers, { dynamic req, bool useLog = false, dio.CancelToken? cancelToken } ) async {

    /// Debug request
    if ( useLog ) log( 'Request name: "put:PutTest", path: "/http://localhost:8080/test2/test", req: "${ req?.toJson() }"' );

    return _dio.put( 'http://localhost:8080/test2/test', data: req?.toJson(), options: dio.Options( headers: headers ), cancelToken: cancelToken ).timeout( const Duration( seconds: Config.timeoutPublic ), onTimeout: () {

      throw TimeoutException( null );

    } ).then( ( http ) {

      /// Debug response
      if ( useLog ) log( 'Response name: "put:PutTest", path: "/http://localhost:8080/test2/test", res: "$http"' );

      if ( http.statusCode != Code.statusSuccess ) throw InvalidStatusCodeException( http.statusCode );

      struct.Response raw = struct.Response();

      raw.response = res.PutTest.fromJson( http.data );

      raw.status = raw.response?.status;

      return raw;
    } );
  }
  /// Desc: function description
  /// Code: 201
  /// Comp: true
  ///
  /// Process: 
  /// * nothing
  ///
  /// Question:
  /// * param1 mark variable explain
  static Future< struct.Response > deletetest( Map< String, String > headers, { dynamic req, bool useLog = false, dio.CancelToken? cancelToken } ) async {

    /// Debug request
    if ( useLog ) log( 'Request name: "delete:DeleteTest", path: "/http://localhost:8080/test2/test", req: "${ req?.toJson() }"' );

    return _dio.delete( 'http://localhost:8080/test2/test', queryParameters: req?.toJson(), options: dio.Options( headers: headers ), cancelToken: cancelToken ).timeout( const Duration( seconds: Config.timeoutPublic ), onTimeout: () {

      throw TimeoutException( null );

    } ).then( ( http ) {

      /// Debug response
      if ( useLog ) log( 'Response name: "delete:DeleteTest", path: "/http://localhost:8080/test2/test", res: "$http"' );

      if ( http.statusCode != Code.statusSuccess ) throw InvalidStatusCodeException( http.statusCode );

      struct.Response raw = struct.Response();

      raw.response = res.DeleteTest.fromJson( http.data );

      raw.status = raw.response?.status;

      return raw;
    } );
  }
}