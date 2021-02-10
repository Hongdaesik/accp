
/**
 * Description: Response infomation 
 
 - Parameters: 
   - param1: int variable
   - param2: data variable
   - param3: float variable
   - param4: double variable
   - param5: string variable
   - param6: boolean variable
   - param7: struct variable
   - param8: description of the value
     - 0=: explain value
     - 1>: explain value
     - 2<: explain value
     - 3!: explain value
   - param9: int array variable
   - param10: struct array variable*/
struct RES_DATA: Codable {

  /**
  - int variable */
  var param1: Int?

  /**
  - data variable */
  var param2: URL?

  /**
  - float variable */
  var param3: Float?

  /**
  - double variable */
  var param4: Double?

  /**
  - string variable */
  var param5: String?

  /**
  - boolean variable */
  var param6: Boolean?

  /**
  - struct variable */
  var param7: PARAM_DATA?

  /**
  - description of the value
    - 0=: explain value
    - 1>: explain value
    - 2<: explain value
    - 3!: explain value */
  var param8: Int?

  /**
  - int array variable */
  var param9: [Int]?

  /**
  - struct array variable */
  var param10: [PARAM_DATA]?

  init( param1: Int? = nil, param2: URL? = nil, param3: Float? = nil, param4: Double? = nil, param5: String? = nil, param6: Boolean? = nil, param7: PARAM_DATA? = nil, param8: Int? = nil, param9: [Int]? = nil, param10: [PARAM_DATA]? = nil ) {

    self.param1 = param1
    self.param2 = param2
    self.param3 = param3
    self.param4 = param4
    self.param5 = param5
    self.param6 = param6
    self.param7 = param7
    self.param8 = param8
    self.param9 = param9
    self.param10 = param10
  }

  init( from decoder: Decoder ) throws {

    let container = try decoder.container( keyedBy: CodingKeys.self )

    self.param1 = ( try? container.decode( Int.self, forKey: .param1 ) ) ?? nil
    self.param2 = ( try? container.decode( URL.self, forKey: .param2 ) ) ?? nil
    self.param3 = ( try? container.decode( Float.self, forKey: .param3 ) ) ?? nil
    self.param4 = ( try? container.decode( Double.self, forKey: .param4 ) ) ?? nil
    self.param5 = ( try? container.decode( String.self, forKey: .param5 ) ) ?? nil
    self.param6 = ( try? container.decode( Boolean.self, forKey: .param6 ) ) ?? nil
    self.param7 = ( try? container.decode( PARAM_DATA.self, forKey: .param7 ) ) ?? nil
    self.param8 = ( try? container.decode( Int.self, forKey: .param8 ) ) ?? nil
    self.param9 = ( try? container.decode( [Int].self, forKey: .param9 ) ) ?? nil
    self.param10 = ( try? container.decode( [PARAM_DATA].self, forKey: .param10 ) ) ?? nil
  }
}

/**
 * Description: Param infomation 
 
 - Parameters: 
   - param1: int variable
   - param2: data variable
   - param3: float variable
   - param4: double variable
   - param5: string variable
   - param6: boolean variable
   - param7: description of the value
     - 0=: explain value
     - 1>: explain value
     - 2<: explain value
     - 3!: explain value*/
struct PARAM_DATA: Codable {

  /**
  - int variable */
  var param1: Int?

  /**
  - data variable */
  var param2: URL?

  /**
  - float variable */
  var param3: Float?

  /**
  - double variable */
  var param4: Double?

  /**
  - string variable */
  var param5: String?

  /**
  - boolean variable */
  var param6: Boolean?

  /**
  - description of the value
    - 0=: explain value
    - 1>: explain value
    - 2<: explain value
    - 3!: explain value */
  var param7: Int?

  init( param1: Int? = nil, param2: URL? = nil, param3: Float? = nil, param4: Double? = nil, param5: String? = nil, param6: Boolean? = nil, param7: Int? = nil ) {

    self.param1 = param1
    self.param2 = param2
    self.param3 = param3
    self.param4 = param4
    self.param5 = param5
    self.param6 = param6
    self.param7 = param7
  }

  init( from decoder: Decoder ) throws {

    let container = try decoder.container( keyedBy: CodingKeys.self )

    self.param1 = ( try? container.decode( Int.self, forKey: .param1 ) ) ?? nil
    self.param2 = ( try? container.decode( URL.self, forKey: .param2 ) ) ?? nil
    self.param3 = ( try? container.decode( Float.self, forKey: .param3 ) ) ?? nil
    self.param4 = ( try? container.decode( Double.self, forKey: .param4 ) ) ?? nil
    self.param5 = ( try? container.decode( String.self, forKey: .param5 ) ) ?? nil
    self.param6 = ( try? container.decode( Boolean.self, forKey: .param6 ) ) ?? nil
    self.param7 = ( try? container.decode( Int.self, forKey: .param7 ) ) ?? nil
  }
}
