
import Foundation

extension AlamofireModel {

  /** Description: class description  */
  struct DEV_TEST_1 {

    /** 
     * Code: 100
     * Complete: true
     * Description: function description 
     
     - Process: 
       - DEV_TEST_1.PostTest: 101
       - DEV_TEST_2.DeleteTest: 201
     
     - Question:
       - param1: mark variable explain */
    static public func GetTest ( req: DEV_TEST_1_REQ.GetTest, completion: @escaping ( Any? ) -> Void ) {

      AlamofireModel.shared.request( address: "http://localhost:8080/test1/test", method: .get, parameters: req, multipart: true, completion: completion )
    }

    /** 
     * Code: 101
     * Complete: true
     * Description: function description 
     
     - Process: 
       - nothing
     
     - Question:
       - param1: mark variable explain */
    static public func PostTest ( req: DEV_TEST_1_REQ.PostTest, completion: @escaping ( Any? ) -> Void ) {

      AlamofireModel.shared.request( address: "http://localhost:8080/test1/test", method: .post, parameters: req, multipart: false, completion: completion )
    }
  }

  /** Description: class description  */
  struct DEV_TEST_2 {

    /** 
     * Code: 200
     * Complete: true
     * Description: function description 
     
     - Process: 
       - nothing
     
     - Question:
       - param1: mark variable explain */
    static public func PutTest ( req: DEV_TEST_2_REQ.PutTest, completion: @escaping ( Any? ) -> Void ) {

      AlamofireModel.shared.request( address: "http://localhost:8080/test2/undefined", method: .get, parameters: req, multipart: false, completion: completion )
    }

    /** 
     * Code: 201
     * Complete: true
     * Description: function description 
     
     - Process: 
       - nothing
     
     - Question:
       - param1: mark variable explain */
    static public func DeleteTest ( req: DEV_TEST_2_REQ.DeleteTest, completion: @escaping ( Any? ) -> Void ) {

      AlamofireModel.shared.request( address: "http://localhost:8080/test2/undefined", method: .get, parameters: req, multipart: false, completion: completion )
    }
  }

}