
import Foundation

/** 
 * Notice: An example file. There may be syntax errors. */
extension AlamofireModel {

  /** Description: class 1 description  */
  class DEV_TEST_1 {
    
    var base: String = "http://localhost:8080"

    /** 
     * Code: 1
     * Method: post
     * Complete: true
     * Description: function description 
     
     - Process: 
       - DEV_TEST_1.TEST_API_2: 2
     
     - Question:
       - param1: markvariable explain */
    static public func TEST_API_1( req: DEV_TEST_1_REQ.TEST_API_1, completion: @escaping ( Any? ) -> Void ) {

      AlamofireModel.shared.request( address: base + "/test_1_1.api", method: .post, parameters: req, multipart: true, completion: completion )
    }

    /** 
     * Code: 2
     * Method: post
     * Complete: true
     * Description: function description 
     
     - Process: 
       - DEV_TEST_2.TEST_API_2: 2
     
     - Question:
       - param1: markvariable explain */
    static public func TEST_API_2( req: DEV_TEST_1_REQ.TEST_API_2, completion: @escaping ( Any? ) -> Void ) {

      AlamofireModel.shared.request( address: base + "/test_1_2.api", method: .post, parameters: req, multipart: false, completion: completion )
    }
  }

  /** Description: class 2 description  */
  class DEV_TEST_2 {
    
    var base: String = "http://localhost:8181"

    /** 
     * Code: 1
     * Method: get
     * Complete: true
     * Description: function description 
     
     - Process: 
       - DEV_TEST_1.TEST_API_2: 2
     
     - Question:
       - param1: markvariable explain */
    static public func TEST_API_1( req: DEV_TEST_2_REQ.TEST_API_1, completion: @escaping ( Any? ) -> Void ) {

      AlamofireModel.shared.request( address: base + "/test_2_1.api", method: .get, parameters: req, multipart: false, completion: completion )
    }

    /** 
     * Code: 2
     * Method: get
     * Complete: true
     * Description: function description 
     
     - Process: 
       - nothing
     
     - Question:
       - param1: markvariable explain */
    static public func TEST_API_2( req: DEV_TEST_2_REQ.TEST_API_2, completion: @escaping ( Any? ) -> Void ) {

      AlamofireModel.shared.request( address: base + "/test_2_2.api", method: .get, parameters: req, multipart: false, completion: completion )
    }
  }

}