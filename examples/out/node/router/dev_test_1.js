
/* dependency */
const ROUTER = require( 'express' ).Router()

/* Virtual file for writing example code. */
const FUNC = require( '..' )

const MODEL = require( '../model/dev_test_1' )

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
ROUTER.get( '/test', 

/* Declare a function for parameter value existence and data restriction. */
function ( req, res, next ) {

  let response = FUNC.chkVal( req, {

    /* description of the value */
    param8: FUNC.getVal( req.query.param8, 30 )
      
  } )

  if ( response.status?.code ) return res.json( response )

  return next()

}, async function( req, res ) {

console.log( new Date(), `Route.Get ${ req.baseUrl + req.path }` )

return res.json( await MODEL.getTest( req ) )
} )


/** 
* Code: 101
* Complete: true
* Description: function description 
* 
* Process: 
* * notihng
*
* Question:
* * param1 mark variable explain */
ROUTER.post( '/test', 

/* Declare a function for parameter value existence and data restriction. */
function ( req, res, next ) {

  let response = FUNC.chkVal( req, {

    /* description of the value */
    param8: FUNC.getVal( req.body.param8, 30 )
      
  } )

  if ( response.status?.code ) return res.json( response )

  return next()

}, async function( req, res ) {

console.log( new Date(), `Route.Post ${ req.baseUrl + req.path }` )

return res.json( await MODEL.postTest( req ) )
} )


module.exports = ROUTER
