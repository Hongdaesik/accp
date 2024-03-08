
/* dependency */
const ROUTER = require( 'express' ).Router()

/* Virtual file for writing example code. */
const FUNC = require( '..' )

const MODEL = require( '../model/dev_test_2' )

/** 
* Code: 200
* Complete: true
* Description: function description 
* 
* Process: 
* * notihng
*
* Question:
* * param1 mark variable explain */
ROUTER.put( '/test', 

/* Declare a function for parameter value existence and data restriction. */
function ( req, res, next ) {

  let response = FUNC.chkVal( req, {

    /* description of the value */
    param8: FUNC.getVal( req.body.param8, 30 )
      
  } )

  if ( response.status?.code ) return res.json( response )

  return next()

}, async function( req, res ) {

console.log( new Date(), `Route.Put ${ req.baseUrl + req.path }` )

return res.json( await MODEL.putTest( req ) )
} )


/** 
* Code: 201
* Complete: true
* Description: function description 
* 
* Process: 
* * notihng
*
* Question:
* * param1 mark variable explain */
ROUTER.delete( '/test', 

/* Declare a function for parameter value existence and data restriction. */
function ( req, res, next ) {

  let response = FUNC.chkVal( req, {

    /* description of the value */
    param8: FUNC.getVal( req.query.param8, 30 )
      
  } )

  if ( response.status?.code ) return res.json( response )

  return next()

}, async function( req, res ) {

console.log( new Date(), `Route.Delete ${ req.baseUrl + req.path }` )

return res.json( await MODEL.deleteTest( req ) )
} )


module.exports = ROUTER
