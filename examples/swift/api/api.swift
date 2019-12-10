
import Foundation

extension AlamofireModel {

  /** Description: class 1 description  */
  class DEV_TEST_1 {

    /** 
     * Code: 1
     * Complete: true
     * Description: function description 
     
     - Process: 
       - DEV_TEST_1.TEST_API_2: 2
     
     - Question:
       - param1: markvariable explain */
    static public func TEST_API_1 ( req: DEV_TEST_1_REQ.TEST_API_1, completion: @escaping ( Any? ) -> Void ) {

      AlamofireModel.shared.request( address: "http://localhost:8080" + "test_1_1.api", method: .post, parameters: req, multipart: false, completion: completion )
    }

    /** 
     * Code: 2
     * Complete: true
     * Description: function description 
     
     - Process: 
       - DEV_TEST_2.TEST_API_2: 2
     
     - Question:
       - param1: markvariable explain */
    static public func TEST_API_2 ( req: DEV_TEST_1_REQ.TEST_API_2, completion: @escaping ( Any? ) -> Void ) {

      AlamofireModel.shared.request( address: "http://localhost:8080" + "test_1_2.api", method: .post, parameters: req, multipart: false, completion: completion )
    }
  }

  /** Description: class 2 description  */
  class DEV_TEST_2 {

    /** 
     * Code: 1
     * Complete: true
     * Description: function description 
     
     - Process: 
       - DEV_TEST_1.TEST_API_2: 2
     
     - Question:
       - param1: markvariable explain */
    static public func TEST_API_1 ( req: DEV_TEST_2_REQ.TEST_API_1, completion: @escaping ( Any? ) -> Void ) {

      AlamofireModel.shared.request( address: "http://localhost:8080" + "test_2_1.api", method: .get, parameters: req, multipart: false, completion: completion )
    }

    /** 
     * Code: 2
     * Complete: true
     * Description: function description 
     
     - Process: 
       - nothing
     
     - Question:
       - param1: markvariable explain */
    static public func TEST_API_2 ( req: DEV_TEST_2_REQ.TEST_API_2, completion: @escaping ( Any? ) -> Void ) {

      AlamofireModel.shared.request( address: "http://localhost:8080" + "test_2_2.api", method: .get, parameters: req, multipart: false, completion: completion )
    }
  }

}