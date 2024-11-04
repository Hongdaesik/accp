import 'package:json_annotation/json_annotation.dart';

part 'struct.g.dart';

/// Description: Status information 
@JsonSerializable()
class Status {

  /// Error code
  @JsonKey( name: 'code' ) int? code;
  /// Error message
  @JsonKey( name: 'message' ) String? message;

  Status( { 

    this.code,
    this.message
   } );

  factory Status.fromJson( Map< String, dynamic > json ) => _$StatusFromJson( json );

  Map< String, dynamic > toJson() => _$StatusToJson( this );
}

/// Description: Response information 
@JsonSerializable()
class Response {

  /// int variable
  @JsonKey( name: 'param1' ) int? param1;
  /// data variable
  @JsonKey( name: 'param2' ) dynamic param2;
  /// float variable
  @JsonKey( name: 'param3' ) double param3;
  /// double variable
  @JsonKey( name: 'param4' ) double? param4;
  /// string variable
  @JsonKey( name: 'param5' ) String? param5;
  /// boolean variable
  @JsonKey( name: 'param6' ) int? param6;
  /// struct variable
  @JsonKey( name: 'param7' ) Parameter? param7;
  /// description of the value
  @JsonKey( name: 'param8' ) int? param8;
  /// int array variable
  @JsonKey( name: 'param9' ) List< int >? param9;
  /// struct array variable
  @JsonKey( name: 'param10' ) List< Parameter >? param10;

  Response( { 

    this.param1,
    this.param2,
    this.param3,
    this.param4,
    this.param5,
    this.param6,
    this.param7,
    this.param8,
    this.param9,
    this.param10
   } );

  factory Response.fromJson( Map< String, dynamic > json ) => _$ResponseFromJson( json );

  Map< String, dynamic > toJson() => _$ResponseToJson( this );
}

/// Description: Param information 
@JsonSerializable()
class Parameter {

  /// int variable
  @JsonKey( name: 'param1' ) int? param1;
  /// data variable
  @JsonKey( name: 'param2' ) dynamic param2;
  /// float variable
  @JsonKey( name: 'param3' ) double param3;
  /// double variable
  @JsonKey( name: 'param4' ) double? param4;
  /// string variable
  @JsonKey( name: 'param5' ) String? param5;
  /// boolean variable
  @JsonKey( name: 'param6' ) int? param6;
  /// description of the value
  @JsonKey( name: 'param7' ) int? param7;

  Parameter( { 

    this.param1,
    this.param2,
    this.param3,
    this.param4,
    this.param5,
    this.param6,
    this.param7
   } );

  factory Parameter.fromJson( Map< String, dynamic > json ) => _$ParameterFromJson( json );

  Map< String, dynamic > toJson() => _$ParameterToJson( this );
}

