
import 'dart:async';
import 'dart:collection';

import 'package:dio/dio.dart' as dio;
import 'package:flutter/material.dart';

import 'package:fancast_flutter/network/req/dev_test_1.dart' as req;
import 'package:fancast_flutter/network/res/dev_test_1.dart' as res;

import 'package:fancast_flutter/network/pub/config.dart';
import 'package:fancast_flutter/network/pub/struct.dart' as struct;

class Dev_test_1Service {

  static final dio.Dio _dio = dio.Dio(); 

  Dev_test_1Service._(); 
  
  /// Desc: function description, If [pub] is false, connect to the development server.
  /// Code: 100
  /// Comp: true
  ///
  /// Process: 
  /// * [DEV_TEST_1.PostTest] 101
  /// * [DEV_TEST_2.DeleteTest] 201
  ///
  /// Question:
  /// * param1 mark variable explain
  static Future< struct.Response > getTest( HashMap< String, String > headers, { req.GetTest? req, bool pub = true, dio.CancelToken? cancelToken } ) async {

    /// Debug request
    if ( !pub ) debugPrint( 'Request name: "get:GetTest", path: "/http://localhost:8080/test1/test", req: "${ req?.toJson() }"' );

    return _dio.get( '${ pub ? Config.pub : Config.dev }/http://localhost:8080/test1/test', queryParameters: req?.toJson(), options: dio.Options( headers: headers ), cancelToken: cancelToken ).timeout( const Duration( seconds: Config.timeout ), onTimeout: () {

      throw TimeoutException( null );

    } ).then( ( http ) {

      /// Debug response
      if ( !pub ) debugPrint( 'Response name: "get:GetTest", path: "/http://localhost:8080/test1/test", res: "$http"' );
  
      if ( http.statusCode != Config.statusSuccess ) throw InvalidStatusCodeException( http.statusCode );
  
      struct.Response raw = struct.Response();
  
      raw.response = res.GetTest.fromJson( http.data );
  
      raw.status = raw.response?.status;
  
      return raw;
    } );
  }

  /// Desc: function description, If [pub] is false, connect to the development server.
  /// Code: 101
  /// Comp: true
  ///
  /// Process: 
  /// * nothing
  ///
  /// Question:
  /// * param1 mark variable explain
  static Future< struct.Response > postTest( HashMap< String, String > headers, { req.PostTest? req, bool pub = true, dio.CancelToken? cancelToken } ) async {

    /// Debug request
    if ( !pub ) debugPrint( 'Request name: "post:PostTest", path: "/http://localhost:8080/test1/test", req: "${ req?.toJson() }"' );

    return _dio.post( '${ pub ? Config.pub : Config.dev }/http://localhost:8080/test1/test', data: req?.toJson(), options: dio.Options( headers: headers ), cancelToken: cancelToken ).timeout( const Duration( seconds: Config.timeout ), onTimeout: () {

      throw TimeoutException( null );

    } ).then( ( http ) {

      /// Debug response
      if ( !pub ) debugPrint( 'Response name: "post:PostTest", path: "/http://localhost:8080/test1/test", res: "$http"' );
  
      if ( http.statusCode != Config.statusSuccess ) throw InvalidStatusCodeException( http.statusCode );
  
      struct.Response raw = struct.Response();
  
      raw.response = res.PostTest.fromJson( http.data );
  
      raw.status = raw.response?.status;
  
      return raw;
    } );
  }
}