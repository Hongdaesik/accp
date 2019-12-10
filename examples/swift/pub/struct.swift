
/**
 * Description: Response infomation 
 
 - Parameters: 
   - param1: int variable
   - param2: data variable
   - param3: float variable
   - param4: double variable
   - param5: string variable
   - param6: struct variable
   - param7: description of the value
     - 0=: explainvalue
     - 1>: explainvalue
     - 2<: explainvalue
     - 3!: explainvalue
   - param8: int array variable
   - param9: struct array variable*/
struct RES_DATA: Codable {

  /**
  - int variable */
  var param1: Int!

  /**
  - data variable */
  var param2: Data!

  /**
  - float variable */
  var param3: Float!

  /**
  - double variable */
  var param4: Double!

  /**
  - string variable */
  var param5: String!

  /**
  - struct variable */
  var param6: PARAM_DATA!

  /**
  - description of the value
    - 0=: explainvalue
    - 1>: explainvalue
    - 2<: explainvalue
    - 3!: explainvalue */
  var param7: Int!

  /**
  - int array variable */
  var param8: [Int]!

  /**
  - struct array variable */
  var param9: [PARAM_DATA]!

  init ( from decoder: Decoder ) throws {

    let container = try decoder.container( keyedBy: CodingKeys.self )

    self.param1 = ( try? container.decode( Int.self, forKey: .param1 ) ) ?? nil
    self.param2 = ( try? container.decode( Data.self, forKey: .param2 ) ) ?? nil
    self.param3 = ( try? container.decode( Float.self, forKey: .param3 ) ) ?? nil
    self.param4 = ( try? container.decode( Double.self, forKey: .param4 ) ) ?? nil
    self.param5 = ( try? container.decode( String.self, forKey: .param5 ) ) ?? nil
    self.param6 = ( try? container.decode( PARAM_DATA.self, forKey: .param6 ) ) ?? nil
    self.param7 = ( try? container.decode( Int.self, forKey: .param7 ) ) ?? nil
    self.param8 = ( try? container.decode( [Int].self, forKey: .param8 ) ) ?? nil
    self.param9 = ( try? container.decode( [PARAM_DATA].self, forKey: .param9 ) ) ?? nil
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
   - param6: description of the value
     - 0=: explainvalue
     - 1>: explainvalue
     - 2<: explainvalue
     - 3!: explainvalue*/
struct PARAM_DATA: Codable {

  /**
  - int variable */
  var param1: Int!

  /**
  - data variable */
  var param2: Data!

  /**
  - float variable */
  var param3: Float!

  /**
  - double variable */
  var param4: Double!

  /**
  - string variable */
  var param5: String!

  /**
  - description of the value
    - 0=: explainvalue
    - 1>: explainvalue
    - 2<: explainvalue
    - 3!: explainvalue */
  var param6: Int!

  init ( from decoder: Decoder ) throws {

    let container = try decoder.container( keyedBy: CodingKeys.self )

    self.param1 = ( try? container.decode( Int.self, forKey: .param1 ) ) ?? nil
    self.param2 = ( try? container.decode( Data.self, forKey: .param2 ) ) ?? nil
    self.param3 = ( try? container.decode( Float.self, forKey: .param3 ) ) ?? nil
    self.param4 = ( try? container.decode( Double.self, forKey: .param4 ) ) ?? nil
    self.param5 = ( try? container.decode( String.self, forKey: .param5 ) ) ?? nil
    self.param6 = ( try? container.decode( Int.self, forKey: .param6 ) ) ?? nil
  }
}
