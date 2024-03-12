
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

    p[ k ] = d[ k ]
  }

  return p
}

/** Description: Status information  */
export class Status {

  /** @type { number } Error code */
  public code?: number
  /** @type { string } Error message */
  public message?: string

  /**
   * @constructor
   * @param { number } code Error code
   * @param { string } message Error message
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
export class RES_DATA {

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
  /** @type { PARAM_DATA } struct variable */
  public param7: PARAM_DATA = new PARAM_DATA()
  /** @type { number } description of the value */
  public param8?: number
  /** @type { number[] } int array variable */
  public param9?: number[]
  /** @type { PARAM_DATA[] } struct array variable */
  public param10: PARAM_DATA[] = []

  /**
   * @constructor
   * @param { number } param1 int variable
   * @param { any } param2 data variable
   * @param { number } param3 float variable
   * @param { number } param4 double variable
   * @param { string } param5 string variable
   * @param { boolean | number } param6 boolean variable
   * @param { Struct.PARAM_DATA } param7 struct variable
   * @param { number } param8 description of the value
   * @param { number[] } param9 int array variable
   * @param { Struct.PARAM_DATA[] } param10 struct array variable
   */
  constructor( data? : { param1?: number, param2?: any, param3?: number, param4?: number, param5?: string, param6?: boolean | number, param7?: PARAM_DATA, param8?: number, param9?: number[], param10?: PARAM_DATA[] } ) {

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
   * @param { Struct.PARAM_DATA } data.param7 struct variable
   * @param { number } data.param8 description of the value
   * @param { number[] } data.param9 int array variable
   * @param { Struct.PARAM_DATA[] } data.param10 struct array variable
   */
  onInit( data?: { param1?: number, param2?: any, param3?: number, param4?: number, param5?: string, param6?: boolean | number, param7?: PARAM_DATA, param8?: number, param9?: number[], param10?: PARAM_DATA[] } ) {

    setAttribute( this, data )

    return this
  }
}

/** Description: Param information  */
export class PARAM_DATA {

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
   * @param { number } param1 int variable
   * @param { any } param2 data variable
   * @param { number } param3 float variable
   * @param { number } param4 double variable
   * @param { string } param5 string variable
   * @param { boolean | number } param6 boolean variable
   * @param { number } param7 description of the value
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

