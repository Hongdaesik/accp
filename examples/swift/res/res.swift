
import Foundation

/** 
 * Notice: An example file. There may be syntax errors. */

/** Description: class 1 description  */
class DEV_TEST_1_RES {

  /**
   - Parameters:
     - param1: int variable
     - param2: data variable
     - param3: float variable
     - param4: double variable
     - param5: string variable
     - param6: boolean variable
     - param7: struct variable
     - param8: description of the value
       - 0=: explain
       - 1>: explain
       - 2<: explain
       - 3!: explain
     - param9: int array variable
     - param10: struct array variable */
  class TEST_API_1: Codable {

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
    - boolean variable */
    var param6: Boolean!

    /**
    - struct variable */
    var param7: RES_DATA!

    /**
    - description of the value
      - 0=: explain
      - 1>: explain
      - 2<: explain
      - 3!: explain */
    var param8: Int!

    /**
    - int array variable */
    var param9: [Int]!

    /**
    - struct array variable */
    var param10: [PARAM_DATA]!

    required init ( from decoder: Decoder ) throws {

      let container = try decoder.container( keyedBy: CodingKeys.self )

      self.param1 = ( try? container.decode( Int.self, forKey: .param1 ) ) ?? nil
      self.param2 = ( try? container.decode( Data.self, forKey: .param2 ) ) ?? nil
      self.param3 = ( try? container.decode( Float.self, forKey: .param3 ) ) ?? nil
      self.param4 = ( try? container.decode( Double.self, forKey: .param4 ) ) ?? nil
      self.param5 = ( try? container.decode( String.self, forKey: .param5 ) ) ?? nil
      self.param6 = ( try? container.decode( Boolean.self, forKey: .param6 ) ) ?? nil
      self.param7 = ( try? container.decode( RES_DATA.self, forKey: .param7 ) ) ?? nil
      self.param8 = ( try? container.decode( Int.self, forKey: .param8 ) ) ?? nil
      self.param9 = ( try? container.decode( [Int].self, forKey: .param9 ) ) ?? nil
      self.param10 = ( try? container.decode( [PARAM_DATA].self, forKey: .param10 ) ) ?? nil
    }
  }

  /**
   - Parameters:
     - param1: int variable
     - param2: data variable
     - param3: float variable
     - param4: double variable
     - param5: string variable
     - param6: boolean variable
     - param7: struct variable
     - param8: description of the value
       - 0=: explain
       - 1>: explain
       - 2<: explain
       - 3!: explain
     - param9: int array variable
     - param10: struct array variable */
  class TEST_API_2: Codable {

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
    - boolean variable */
    var param6: Boolean!

    /**
    - struct variable */
    var param7: RES_DATA!

    /**
    - description of the value
      - 0=: explain
      - 1>: explain
      - 2<: explain
      - 3!: explain */
    var param8: Int!

    /**
    - int array variable */
    var param9: [Int]!

    /**
    - struct array variable */
    var param10: [PARAM_DATA]!

    required init ( from decoder: Decoder ) throws {

      let container = try decoder.container( keyedBy: CodingKeys.self )

      self.param1 = ( try? container.decode( Int.self, forKey: .param1 ) ) ?? nil
      self.param2 = ( try? container.decode( Data.self, forKey: .param2 ) ) ?? nil
      self.param3 = ( try? container.decode( Float.self, forKey: .param3 ) ) ?? nil
      self.param4 = ( try? container.decode( Double.self, forKey: .param4 ) ) ?? nil
      self.param5 = ( try? container.decode( String.self, forKey: .param5 ) ) ?? nil
      self.param6 = ( try? container.decode( Boolean.self, forKey: .param6 ) ) ?? nil
      self.param7 = ( try? container.decode( RES_DATA.self, forKey: .param7 ) ) ?? nil
      self.param8 = ( try? container.decode( Int.self, forKey: .param8 ) ) ?? nil
      self.param9 = ( try? container.decode( [Int].self, forKey: .param9 ) ) ?? nil
      self.param10 = ( try? container.decode( [PARAM_DATA].self, forKey: .param10 ) ) ?? nil
    }
  }
}
/** Description: class 2 description  */
class DEV_TEST_2_RES {

  /**
   - Parameters:
     - param1: int variable
     - param2: data variable
     - param3: float variable
     - param4: double variable
     - param5: string variable
     - param6: boolean variable
     - param7: struct variable
     - param8: description of the value
       - 0=: explain
       - 1>: explain
       - 2<: explain
       - 3!: explain
     - param9: int array variable
     - param10: struct array variable */
  class TEST_API_1: Codable {

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
    - boolean variable */
    var param6: Boolean!

    /**
    - struct variable */
    var param7: RES_DATA!

    /**
    - description of the value
      - 0=: explain
      - 1>: explain
      - 2<: explain
      - 3!: explain */
    var param8: Int!

    /**
    - int array variable */
    var param9: [Int]!

    /**
    - struct array variable */
    var param10: [PARAM_DATA]!

    required init ( from decoder: Decoder ) throws {

      let container = try decoder.container( keyedBy: CodingKeys.self )

      self.param1 = ( try? container.decode( Int.self, forKey: .param1 ) ) ?? nil
      self.param2 = ( try? container.decode( Data.self, forKey: .param2 ) ) ?? nil
      self.param3 = ( try? container.decode( Float.self, forKey: .param3 ) ) ?? nil
      self.param4 = ( try? container.decode( Double.self, forKey: .param4 ) ) ?? nil
      self.param5 = ( try? container.decode( String.self, forKey: .param5 ) ) ?? nil
      self.param6 = ( try? container.decode( Boolean.self, forKey: .param6 ) ) ?? nil
      self.param7 = ( try? container.decode( RES_DATA.self, forKey: .param7 ) ) ?? nil
      self.param8 = ( try? container.decode( Int.self, forKey: .param8 ) ) ?? nil
      self.param9 = ( try? container.decode( [Int].self, forKey: .param9 ) ) ?? nil
      self.param10 = ( try? container.decode( [PARAM_DATA].self, forKey: .param10 ) ) ?? nil
    }
  }

  /**
   - Parameters:
     - param1: int variable
     - param2: data variable
     - param3: float variable
     - param4: double variable
     - param5: string variable
     - param6: boolean variable
     - param7: struct variable
     - param8: description of the value
       - 0=: explain
       - 1>: explain
       - 2<: explain
       - 3!: explain
     - param9: int array variable
     - param10: struct array variable */
  class TEST_API_2: Codable {

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
    - boolean variable */
    var param6: Boolean!

    /**
    - struct variable */
    var param7: RES_DATA!

    /**
    - description of the value
      - 0=: explain
      - 1>: explain
      - 2<: explain
      - 3!: explain */
    var param8: Int!

    /**
    - int array variable */
    var param9: [Int]!

    /**
    - struct array variable */
    var param10: [PARAM_DATA]!

    required init ( from decoder: Decoder ) throws {

      let container = try decoder.container( keyedBy: CodingKeys.self )

      self.param1 = ( try? container.decode( Int.self, forKey: .param1 ) ) ?? nil
      self.param2 = ( try? container.decode( Data.self, forKey: .param2 ) ) ?? nil
      self.param3 = ( try? container.decode( Float.self, forKey: .param3 ) ) ?? nil
      self.param4 = ( try? container.decode( Double.self, forKey: .param4 ) ) ?? nil
      self.param5 = ( try? container.decode( String.self, forKey: .param5 ) ) ?? nil
      self.param6 = ( try? container.decode( Boolean.self, forKey: .param6 ) ) ?? nil
      self.param7 = ( try? container.decode( RES_DATA.self, forKey: .param7 ) ) ?? nil
      self.param8 = ( try? container.decode( Int.self, forKey: .param8 ) ) ?? nil
      self.param9 = ( try? container.decode( [Int].self, forKey: .param9 ) ) ?? nil
      self.param10 = ( try? container.decode( [PARAM_DATA].self, forKey: .param10 ) ) ?? nil
    }
  }
}