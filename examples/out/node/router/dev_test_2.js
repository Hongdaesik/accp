
/* dependency */
const ROUTER = require( 'express' ).Router()

/* require */
const FUNC = require( '../library/func' )

const MODEL = require( '../model/dev_test_2' )

/* config */
const CONFIG = require( '../config/' + process.argv[ 2 ] )

/** 
 * Code: 200
 * Complete: true
 * Description: function description 
 * 
 * Process: 
 * * nothing
 *
 * Question:
 * * param1 mark variable explain */
ROUTER.put( '/test', /* FUNC.setParams, */ async function( req, res ) {

  console.log( new Date(), `Route.Put ${ req.baseUrl + req.path } ${ req.user.ip } ${ req.user?.token?.keyUser ? req.user.token.keyUser : '' }` )

  return res.json( await MODEL.putTest( req ) )
} )

/** 
 * Code: 201
 * Complete: true
 * Description: function description 
 * 
 * Process: 
 * * nothing
 *
 * Question:
 * * param1 mark variable explain */
ROUTER.delete( '/test', /* FUNC.setParams, */ async function( req, res ) {

  console.log( new Date(), `Route.Delete ${ req.baseUrl + req.path } ${ req.user.ip } ${ req.user?.token?.keyUser ? req.user.token.keyUser : '' }` )

  return res.json( await MODEL.deleteTest( req ) )
} )

module.exports = ROUTER