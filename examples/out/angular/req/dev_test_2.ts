import * as Struct from '../pub/struct'

/** Description: function description */
export class PutTest {

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
  /** @type { Struct.PARAM_DATA } struct variable */
  public param7: Struct.PARAM_DATA = new Struct.PARAM_DATA()
  /** @type { number } description of the value */
  public param8?: number

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
   */
  constructor( param1?: number, param2?: any, param3?: number, param4?: number, param5?: string, param6?: boolean | number, param7?: Struct.PARAM_DATA, param8?: number ) {

    Struct.setAttribute( this, { param1: param1, param2: param2, param3: param3, param4: param4, param5: param5, param6: param6, param7: param7, param8: param8 } )
  }

  /** 초기화 함수
   * @param { { clear?: boolean, param?: any } } data
   * @param { boolean? } data.clear 초기화 여부
   * @param { any? } data.param 할당할 파라미터 객체
   * @param { number } data.param.param1 int variable
   * @param { any } data.param.param2 data variable
   * @param { number } data.param.param3 float variable
   * @param { number } data.param.param4 double variable
   * @param { string } data.param.param5 string variable
   * @param { boolean | number } data.param.param6 boolean variable
   * @param { Struct.PARAM_DATA } data.param.param7 struct variable
   * @param { number } data.param.param8 description of the value
   */
  onInit( data?: { clear?: boolean, param?: { param1?: number, param2?: any, param3?: number, param4?: number, param5?: string, param6?: boolean | number, param7?: Struct.PARAM_DATA, param8?: number } } ) {

    if ( data?.clear ) Struct.setClear( this )

    Struct.setAttribute( this, Struct.setClone( data?.param ) )

    return this
  }
}
/** Description: function description */
export class DeleteTest {

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
  /** @type { Struct.PARAM_DATA } struct variable */
  public param7: Struct.PARAM_DATA = new Struct.PARAM_DATA()
  /** @type { number } description of the value */
  public param8?: number

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
   */
  constructor( param1?: number, param2?: any, param3?: number, param4?: number, param5?: string, param6?: boolean | number, param7?: Struct.PARAM_DATA, param8?: number ) {

    Struct.setAttribute( this, { param1: param1, param2: param2, param3: param3, param4: param4, param5: param5, param6: param6, param7: param7, param8: param8 } )
  }

  /** 초기화 함수
   * @param { { clear?: boolean, param?: any } } data
   * @param { boolean? } data.clear 초기화 여부
   * @param { any? } data.param 할당할 파라미터 객체
   * @param { number } data.param.param1 int variable
   * @param { any } data.param.param2 data variable
   * @param { number } data.param.param3 float variable
   * @param { number } data.param.param4 double variable
   * @param { string } data.param.param5 string variable
   * @param { boolean | number } data.param.param6 boolean variable
   * @param { Struct.PARAM_DATA } data.param.param7 struct variable
   * @param { number } data.param.param8 description of the value
   */
  onInit( data?: { clear?: boolean, param?: { param1?: number, param2?: any, param3?: number, param4?: number, param5?: string, param6?: boolean | number, param7?: Struct.PARAM_DATA, param8?: number } } ) {

    if ( data?.clear ) Struct.setClear( this )

    Struct.setAttribute( this, Struct.setClone( data?.param ) )

    return this
  }
}

