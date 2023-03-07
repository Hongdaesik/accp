
import 'package:json_annotation/json_annotation.dart';

part 'struct.g.dart';

/// Description: Response infomation 
@JsonSerializable()
class RES_DATA {

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
  @JsonKey( name: 'param7' ) PARAM_DATA? param7;
  /// description of the value
  @JsonKey( name: 'param8' ) int? param8;
  /// int array variable
  @JsonKey( name: 'param9' ) List< int >? param9;
  /// struct array variable
  @JsonKey( name: 'param10' ) List< PARAM_DATA >? param10;

  RES_DATA( { 

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

  factory RES_DATA.fromJson( Map< String, dynamic > json ) => _$RES_DATAFromJson( json );

  Map< String, dynamic > toJson() => _$RES_DATAToJson( this );
}

/// Description: Param infomation 
@JsonSerializable()
class PARAM_DATA {

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

  PARAM_DATA( { 

    this.param1,
    this.param2,
    this.param3,
    this.param4,
    this.param5,
    this.param6,
    this.param7
   } );

  factory PARAM_DATA.fromJson( Map< String, dynamic > json ) => _$PARAM_DATAFromJson( json );

  Map< String, dynamic > toJson() => _$PARAM_DATAToJson( this );
}
