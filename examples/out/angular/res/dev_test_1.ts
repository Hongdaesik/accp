import * as Struct from '../pub/struct'

/** Description: function description */
export class GetTest {

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
  /** @type { Struct.RES_DATA } struct variable */
  public param7: Struct.RES_DATA = new Struct.RES_DATA()
  /** @type { number } description of the value */
  public param8?: number
  /** @type { number[] } int array variable */
  public param9?: number[]
  /** @type { Struct.PARAM_DATA[] } struct array variable */
  public param10: Struct.PARAM_DATA[] = []

  /** @type { Struct.Status | undefined } 상태 정보 */
  public status?: Struct.Status

  /**
   * @constructor
   * @param { any } data
   * @param { number } data.param1 int variable
   * @param { any } data.param2 data variable
   * @param { number } data.param3 float variable
   * @param { number } data.param4 double variable
   * @param { string } data.param5 string variable
   * @param { boolean | number } data.param6 boolean variable
   * @param { Struct.RES_DATA } data.param7 struct variable
   * @param { number } data.param8 description of the value
   * @param { number[] } data.param9 int array variable
   * @param { Struct.PARAM_DATA[] } data.param10 struct array variable
   */
  constructor( data?: { param1?: number, param2?: any, param3?: number, param4?: number, param5?: string, param6?: boolean | number, param7?: Struct.RES_DATA, param8?: number, param9?: number[], param10?: Struct.PARAM_DATA[] } ) {

    Struct.setAttribute( this, data )
  }
}
/** Description: function description */
export class PostTest {

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
  /** @type { Struct.RES_DATA } struct variable */
  public param7: Struct.RES_DATA = new Struct.RES_DATA()
  /** @type { number } description of the value */
  public param8?: number
  /** @type { number[] } int array variable */
  public param9?: number[]
  /** @type { Struct.PARAM_DATA[] } struct array variable */
  public param10: Struct.PARAM_DATA[] = []

  /** @type { Struct.Status | undefined } 상태 정보 */
  public status?: Struct.Status

  /**
   * @constructor
   * @param { any } data
   * @param { number } data.param1 int variable
   * @param { any } data.param2 data variable
   * @param { number } data.param3 float variable
   * @param { number } data.param4 double variable
   * @param { string } data.param5 string variable
   * @param { boolean | number } data.param6 boolean variable
   * @param { Struct.RES_DATA } data.param7 struct variable
   * @param { number } data.param8 description of the value
   * @param { number[] } data.param9 int array variable
   * @param { Struct.PARAM_DATA[] } data.param10 struct array variable
   */
  constructor( data?: { param1?: number, param2?: any, param3?: number, param4?: number, param5?: string, param6?: boolean | number, param7?: Struct.RES_DATA, param8?: number, param9?: number[], param10?: Struct.PARAM_DATA[] } ) {

    Struct.setAttribute( this, data )
  }
}

