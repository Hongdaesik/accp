import { Observable, map } from 'rxjs'

import { 
  HttpClient, 
  HttpParams,
  HttpHeaders
} from '@angular/common/http'

import { 
  Injectable 
} from '@angular/core'

/* Virtual file for writing example code. */
import {
  ConfigService
} from 'src/app/service/config.service'
import {
  PreloaderService
} from 'src/app/service/preloader.service'

/* import request */
import * as Req from '../req/dev_test_2'

/* import response */
import * as Res from '../res/dev_test_2'

@Injectable( {

  providedIn: 'root'
} )
export class Dev_test_2Service {

  constructor(

    private http: HttpClient,
    
    /* Virtual file for writing example code. */
    private configService: ConfigService,
    private preloaderService: PreloaderService
  ) {}

  setReq( param: any, encode: boolean = false ) {

    try {

      if ( param == null || param == 'null' || param == undefined || param == 'undefined' ) return ''

      return encode ? encodeURIComponent( param ) : param

    } catch ( _ ) {

      return ''
    }
  }
  
  /** 
   * Description: function description 
     - Code: 200
     - Complete: true
   *
   * Process: 
     - nothing
   *
   * Question:
     - param1 mark variable explain */
  putTest( req?: Req.PutTest ): Observable< Res.PutTest > {

    this.preloaderService.start()

    let parameters: HttpParams = new HttpParams()

    .set( 'param1', this.setReq( req?.param1 ) )
    .set( 'param2', encodeURIComponent( JSON.stringify( req?.param2 ) ) )
    .set( 'param3', this.setReq( req?.param3 ) )
    .set( 'param4', this.setReq( req?.param4 ) )
    .set( 'param5', this.setReq( req?.param5, true ) )
    .set( 'param6', this.setReq( req?.param6 ) )
    .set( 'param7', encodeURIComponent( JSON.stringify( req?.param7 ) ) )
    .set( 'param8', this.setReq( req?.param8 ) )

    return this.http.put < Res.PutTest > ( 'http://localhost:8080/test2/test', parameters, { headers: this.configService.headers } ).pipe( map( res => {

      this.preloaderService.stop()

      return res

    }, ( error: any ) => {

      this.preloaderService.stop()

      alert( error )
    } ) )
  }

  /** 
   * Description: function description 
     - Code: 201
     - Complete: true
   *
   * Process: 
     - nothing
   *
   * Question:
     - param1 mark variable explain */
  deleteTest( req?: Req.DeleteTest ): Observable< Res.DeleteTest > {

    this.preloaderService.start()

    let parameters: HttpParams = new HttpParams()

    .set( 'param1', this.setReq( req?.param1 ) )
    .set( 'param2', encodeURIComponent( JSON.stringify( req?.param2 ) ) )
    .set( 'param3', this.setReq( req?.param3 ) )
    .set( 'param4', this.setReq( req?.param4 ) )
    .set( 'param5', this.setReq( req?.param5, true ) )
    .set( 'param6', this.setReq( req?.param6 ) )
    .set( 'param7', encodeURIComponent( JSON.stringify( req?.param7 ) ) )
    .set( 'param8', this.setReq( req?.param8 ) )

    return this.http.delete < Res.DeleteTest > ( 'http://localhost:8080/test2/test?' + parameters, { headers: this.configService.headers } ).pipe( map( res => {

      this.preloaderService.stop()

      return res

    }, ( error: any ) => {

      this.preloaderService.stop()

      alert( error )
    } ) )
  }
}
