import 'dart:async';
import 'dart:developer';

import 'package:dio/dio.dart' as dio;

import 'package:flutter/res/dev_test_1.dart' as res;

import 'package:flutter/pub/code.dart';
import 'package:flutter/pub/config.dart';
import 'package:flutter/pub/struct.dart' as struct;

class Dev_test_1Service {

  static final dio.Dio _dio = dio.Dio(); 

  Dev_test_1Service._(); 

    /// Desc: function description
  /// Code: 100
  /// Comp: true
  ///
  /// Process: 
  /// * [DEV_TEST_1.PostTest] 101
  /// * [DEV_TEST_2.DeleteTest] 201
  ///
  /// Question:
  /// * param1 mark variable explain
  static Future< struct.Response > gettest( Map< String, String > headers, { dynamic req, bool useLog = false, dio.CancelToken? cancelToken } ) async {

    /// Debug request
    if ( useLog ) log( 'Request name: "get:GetTest", path: "/http://localhost:8080/test1/test", req: "${ req?.toJson() }"' );

    return _dio.get( 'http://localhost:8080/test1/test', queryParameters: req?.toJson(), options: dio.Options( headers: headers ), cancelToken: cancelToken ).timeout( const Duration( seconds: Config.timeoutPublic ), onTimeout: () {

      throw TimeoutException( null );

    } ).then( ( http ) {

      /// Debug response
      if ( useLog ) log( 'Response name: "get:GetTest", path: "/http://localhost:8080/test1/test", res: "$http"' );
  
      if ( http.statusCode != Code.statusSuccess ) throw InvalidStatusCodeException( http.statusCode );
  
      struct.Response raw = struct.Response();
  
      raw.response = res.GetTest.fromJson( http.data );
  
      raw.status = raw.response?.status;
  
      return raw;
    } );
  }
  
  /// Desc: function description
  /// Code: 101
  /// Comp: true
  ///
  /// Process: 
  /// * nothing
  ///
  /// Question:
  /// * param1 mark variable explain
  static Future< struct.Response > posttest( Map< String, String > headers, { dynamic req, bool useLog = false, dio.CancelToken? cancelToken } ) async {

    /// Debug request
    if ( useLog ) log( 'Request name: "post:PostTest", path: "/http://localhost:8080/test1/test", req: "${ req?.toJson() }"' );

    return _dio.post( 'http://localhost:8080/test1/test', data: req?.toJson(), options: dio.Options( headers: headers ), cancelToken: cancelToken ).timeout( const Duration( seconds: Config.timeoutPublic ), onTimeout: () {

      throw TimeoutException( null );

    } ).then( ( http ) {

      /// Debug response
      if ( useLog ) log( 'Response name: "post:PostTest", path: "/http://localhost:8080/test1/test", res: "$http"' );
  
      if ( http.statusCode != Code.statusSuccess ) throw InvalidStatusCodeException( http.statusCode );
  
      struct.Response raw = struct.Response();
  
      raw.response = res.PostTest.fromJson( http.data );
  
      raw.status = raw.response?.status;
  
      return raw;
    } );
  }
  
}
