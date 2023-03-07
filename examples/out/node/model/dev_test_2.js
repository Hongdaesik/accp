
/* require */
const CODE = require( '../code/code' )

const QUERY = require( '../query/dev_test_2' )

/* config */
const CONFIG = require( '../config/' + process.argv[ 2 ] )

function Dev_test_2() {}

/** 
 * Parameter: 
 * @param body.param1 int variable
 * @param body.param2 data variable
 * @param body.param3 float variable
 * @param body.param4 double variable
 * @param body.param5 string variable
 * @param body.param6 boolean variable
 * @param body.param7 struct variable
 * @param body.param8 description of the value
 */
Dev_test_2.prototype.putTest = async function( req ) {

  try {

    /* database connection sample
    var connection = await DB.connection.write()

    connection.commit()

    connection.release() */

    var response = CODE.SYSTEM_SUCCESS

    /* int variable 
    response.param1 = DB.get( data, 0, 0 ) */

    /* data variable 
    response.param2 = DB.get( data, 1, 0 ) */

    /* float variable 
    response.param3 = DB.get( data, 2, 0 ) */

    /* double variable 
    response.param4 = DB.get( data, 3, 0 ) */

    /* string variable 
    response.param5 = DB.get( data, 4, 0 ) */

    /* boolean variable 
    response.param6 = DB.get( data, 5, 0 ) */

    /* struct variable 
    response.param7 = DB.get( data, 6, 0 ) */

    /* description of the value 
    response.param8 = DB.get( data, 7, 0 ) */

    /* int array variable 
    response.param9 = DB.get( data, 8 ) */

    /* struct array variable 
    response.param10 = DB.get( data, 9 ) */

    return response

  } catch ( error ) {

    /* database error sample
    connection.rollback()

    connection.release() */

    if ( error && error.message ) {

      console.error( new Date(), error.message )

      return CODE.SYSTEM_DATABASE
    }

    return error
  }
}

/** 
 * Parameter: 
 * @param query.param1 int variable
 * @param query.param2 data variable
 * @param query.param3 float variable
 * @param query.param4 double variable
 * @param query.param5 string variable
 * @param query.param6 boolean variable
 * @param query.param7 struct variable
 * @param query.param8 description of the value
 */
Dev_test_2.prototype.deleteTest = async function( req ) {

  try {

    /* database connection sample
    var connection = await DB.connection.write()

    connection.commit()

    connection.release() */

    var response = CODE.SYSTEM_SUCCESS

    /* int variable 
    response.param1 = DB.get( data, 0, 0 ) */

    /* data variable 
    response.param2 = DB.get( data, 1, 0 ) */

    /* float variable 
    response.param3 = DB.get( data, 2, 0 ) */

    /* double variable 
    response.param4 = DB.get( data, 3, 0 ) */

    /* string variable 
    response.param5 = DB.get( data, 4, 0 ) */

    /* boolean variable 
    response.param6 = DB.get( data, 5, 0 ) */

    /* struct variable 
    response.param7 = DB.get( data, 6, 0 ) */

    /* description of the value 
    response.param8 = DB.get( data, 7, 0 ) */

    /* int array variable 
    response.param9 = DB.get( data, 8 ) */

    /* struct array variable 
    response.param10 = DB.get( data, 9 ) */

    return response

  } catch ( error ) {

    /* database error sample
    connection.rollback()

    connection.release() */

    if ( error && error.message ) {

      console.error( new Date(), error.message )

      return CODE.SYSTEM_DATABASE
    }

    return error
  }
}


var dev_test_2 = new Dev_test_2()

module.exports = dev_test_2