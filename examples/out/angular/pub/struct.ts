
export function setClone( d: any ): any {

  return Object.assign( new Object(), d )
}

export function setClear( p: any ): any {

  for ( let k in p ) {
    
    if ( p[ k ] instanceof Object ) {

      p[ k ] = p[ k ] instanceof Array ? new Array() : new Object()

      continue
    }
    
    p[ k ] = undefined
  }

  return p
}

export function setAttribute( p: any, d: any ): any {

  for ( let k in d ) {
    
    if ( p[ k ] instanceof Object ) {

      if ( p[ k ] == undefined ) p[ k ] = d[ k ] instanceof Array ? new Array() : new Object()

      p[ k ] = setAttribute( p[ k ], d[ k ] )

      continue
    }

    if ( p[ k ] instanceof Array ) {

      p[ k ].push( d[ k ] )

      continue
    }

    p[ k ] = d[ k ] instanceof Array ? [ ...d[ k ] ] : d[ k ] instanceof Object ? { ...d[ k ] } : d[ k ]
  }

  return p
}

/** Description: 프리로더 설정 */
export class Preloader {

  public preloader: PreloaderInterface = {

    animate: true
  }
}

export interface PreloaderInterface {

  animate: boolean
}

/** Description: Status information  */
export class Status {

  [ key: string ]: any

  /** @type { number } Error code */
  public code?: number
  /** @type { string } Error message */
  public message?: string

  /**
   * @constructor
   * @param { number } data.code Error code
   * @param { string } data.message Error message
   */
  constructor( data? : { code?: number, message?: string } ) {

    setAttribute( this, data )
  }

  /** 초기화 함수
   * @param { any } data
   * @param { number } data.code Error code
   * @param { string } data.message Error message
   */
  onInit( data?: { code?: number, message?: string } ) {

    setAttribute( this, data )

    return this
  }
}

/** Description: Response information  */
export class Response {

  [ key: string ]: any

  /** @type { number } int variable */
  public param1?: number
  /** @type { any } data variable */
  public param2: any = new Object()
  /** @type { number } float variable */
  public param3?: number
  /** @type { number } double variable */
  public param4?: number
  /** @type { string } string variable */
  public param5?: string
  /** @type { boolean | number } boolean variable */
  public param6?: boolean | number
  /** @type { Parameter } struct variable */
  public param7: Parameter = new Parameter()
  /** @type { number } description of the value */
  public param8?: number
  /** @type { number[] } int array variable */
  public param9?: number[]
  /** @type { Parameter[] } struct array variable */
  public param10: Parameter[] = []

  /**
   * @constructor
   * @param { number } data.param1 int variable
   * @param { any } data.param2 data variable
   * @param { number } data.param3 float variable
   * @param { number } data.param4 double variable
   * @param { string } data.param5 string variable
   * @param { boolean | number } data.param6 boolean variable
   * @param { Struct.Parameter } data.param7 struct variable
   * @param { number } data.param8 description of the value
   * @param { number[] } data.param9 int array variable
   * @param { Struct.Parameter[] } data.param10 struct array variable
   */
  constructor( data? : { param1?: number, param2?: any, param3?: number, param4?: number, param5?: string, param6?: boolean | number, param7?: Parameter, param8?: number, param9?: number[], param10?: Parameter[] } ) {

    setAttribute( this, data )
  }

  /** 초기화 함수
   * @param { any } data
   * @param { number } data.param1 int variable
   * @param { any } data.param2 data variable
   * @param { number } data.param3 float variable
   * @param { number } data.param4 double variable
   * @param { string } data.param5 string variable
   * @param { boolean | number } data.param6 boolean variable
   * @param { Struct.Parameter } data.param7 struct variable
   * @param { number } data.param8 description of the value
   * @param { number[] } data.param9 int array variable
   * @param { Struct.Parameter[] } data.param10 struct array variable
   */
  onInit( data?: { param1?: number, param2?: any, param3?: number, param4?: number, param5?: string, param6?: boolean | number, param7?: Parameter, param8?: number, param9?: number[], param10?: Parameter[] } ) {

    setAttribute( this, data )

    return this
  }
}

/** Description: Param information  */
export class Parameter {

  [ key: string ]: any

  /** @type { number } int variable */
  public param1?: number
  /** @type { any } data variable */
  public param2: any = new Object()
  /** @type { number } float variable */
  public param3?: number
  /** @type { number } double variable */
  public param4?: number
  /** @type { string } string variable */
  public param5?: string
  /** @type { boolean | number } boolean variable */
  public param6?: boolean | number
  /** @type { number } description of the value */
  public param7?: number

  /**
   * @constructor
   * @param { number } data.param1 int variable
   * @param { any } data.param2 data variable
   * @param { number } data.param3 float variable
   * @param { number } data.param4 double variable
   * @param { string } data.param5 string variable
   * @param { boolean | number } data.param6 boolean variable
   * @param { number } data.param7 description of the value
   */
  constructor( data? : { param1?: number, param2?: any, param3?: number, param4?: number, param5?: string, param6?: boolean | number, param7?: number } ) {

    setAttribute( this, data )
  }

  /** 초기화 함수
   * @param { any } data
   * @param { number } data.param1 int variable
   * @param { any } data.param2 data variable
   * @param { number } data.param3 float variable
   * @param { number } data.param4 double variable
   * @param { string } data.param5 string variable
   * @param { boolean | number } data.param6 boolean variable
   * @param { number } data.param7 description of the value
   */
  onInit( data?: { param1?: number, param2?: any, param3?: number, param4?: number, param5?: string, param6?: boolean | number, param7?: number } ) {

    setAttribute( this, data )

    return this
  }
}

