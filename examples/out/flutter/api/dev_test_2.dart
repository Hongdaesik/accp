
import 'dart:async';
import 'dart:collection';

import 'package:dio/dio.dart' as dio;
import 'package:flutter/material.dart';

import 'package:fancast_flutter/network/req/dev_test_2.dart' as req;
import 'package:fancast_flutter/network/res/dev_test_2.dart' as res;

import 'package:fancast_flutter/network/pub/config.dart';
import 'package:fancast_flutter/network/pub/struct.dart' as struct;

class Dev_test_2Service {

  static final dio.Dio _dio = dio.Dio(); 

  Dev_test_2Service._(); 
  
  /// Desc: function description, If [pub] is false, connect to the development server.
  /// Code: 200
  /// Comp: true
  ///
  /// Process: 
  /// * nothing
  ///
  /// Question:
  /// * param1 mark variable explain
  static Future< struct.Response > putTest( HashMap< String, String > headers, { req.PutTest? req, bool pub = true, dio.CancelToken? cancelToken } ) async {

    /// Debug request
    if ( !pub ) debugPrint( 'Request name: "put:PutTest", path: "/http://localhost:8080/test2/test", req: "${ req?.toJson() }"' );

    return _dio.put( '${ pub ? Config.pub : Config.dev }/http://localhost:8080/test2/test', data: req?.toJson(), options: dio.Options( headers: headers ), cancelToken: cancelToken ).timeout( const Duration( seconds: Config.timeout ), onTimeout: () {

      throw TimeoutException( null );

    } ).then( ( http ) {

      /// Debug response
      if ( !pub ) debugPrint( 'Response name: "put:PutTest", path: "/http://localhost:8080/test2/test", res: "$http"' );
  
      if ( http.statusCode != Config.statusSuccess ) throw InvalidStatusCodeException( http.statusCode );
  
      struct.Response raw = struct.Response();
  
      raw.response = res.PutTest.fromJson( http.data );
  
      raw.status = raw.response?.status;
  
      return raw;
    } );
  }

  /// Desc: function description, If [pub] is false, connect to the development server.
  /// Code: 201
  /// Comp: true
  ///
  /// Process: 
  /// * nothing
  ///
  /// Question:
  /// * param1 mark variable explain
  static Future< struct.Response > deleteTest( HashMap< String, String > headers, { req.DeleteTest? req, bool pub = true, dio.CancelToken? cancelToken } ) async {

    /// Debug request
    if ( !pub ) debugPrint( 'Request name: "delete:DeleteTest", path: "/http://localhost:8080/test2/test", req: "${ req?.toJson() }"' );

    return _dio.delete( '${ pub ? Config.pub : Config.dev }/http://localhost:8080/test2/test', queryParameters: req?.toJson(), options: dio.Options( headers: headers ), cancelToken: cancelToken ).timeout( const Duration( seconds: Config.timeout ), onTimeout: () {

      throw TimeoutException( null );

    } ).then( ( http ) {

      /// Debug response
      if ( !pub ) debugPrint( 'Response name: "delete:DeleteTest", path: "/http://localhost:8080/test2/test", res: "$http"' );
  
      if ( http.statusCode != Config.statusSuccess ) throw InvalidStatusCodeException( http.statusCode );
  
      struct.Response raw = struct.Response();
  
      raw.response = res.DeleteTest.fromJson( http.data );
  
      raw.status = raw.response?.status;
  
      return raw;
    } );
  }
}