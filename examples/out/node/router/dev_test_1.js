
/* dependency */
const ROUTER = require( 'express' ).Router()

/* require */
const FUNC = require( '../library/func' )

const MODEL = require( '../model/dev_test_1' )

/* config */
const CONFIG = require( '../config/' + process.argv[ 2 ] )

/** 
 * Code: 100
 * Complete: true
 * Description: function description 
 * 
 * Process: 
 * * [DEV_TEST_1.PostTest] 101
 * * [DEV_TEST_2.DeleteTest] 201
 *
 * Question:
 * * param1 mark variable explain */
ROUTER.get( '/test', /* FUNC.setParams, */ async function( req, res ) {

  console.log( new Date(), `Route.Get ${ req.baseUrl + req.path } ${ req.user.ip } ${ req.user?.token?.keyUser ? req.user.token.keyUser : '' }` )

  return res.json( await MODEL.getTest( req ) )
} )

/** 
 * Code: 101
 * Complete: true
 * Description: function description 
 * 
 * Process: 
 * * nothing
 *
 * Question:
 * * param1 mark variable explain */
ROUTER.post( '/test', /* FUNC.setParams, */ async function( req, res ) {

  console.log( new Date(), `Route.Post ${ req.baseUrl + req.path } ${ req.user.ip } ${ req.user?.token?.keyUser ? req.user.token.keyUser : '' }` )

  return res.json( await MODEL.postTest( req ) )
} )

module.exports = ROUTER