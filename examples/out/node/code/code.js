
function CODE() {

  /* TEST_CODE_1 */
  this.TEST_CODE_1_error_1 = 1
  this.TEST_CODE_1_error_2 = 2
  
  /* TEST_CODE_2 */
  this.TEST_CODE_2_error_1 = 1
  this.TEST_CODE_2_error_2 = 2

  /**
   * 사용자 언어 설정에 따른 에러 메시지 반환
   * @param { string } typeLang - req.user.typeLang, 사용자 언어
   * @param { number } code - 에러 코드
   * @returns { string } - 에러 메시지
   */
  this.getMessage = function( typeLang, code ) {

    switch ( typeLang.toLowerCase() ) {
      
      case 'ko': {

        switch ( code ) {

          /* TEST_CODE_1 */
          case 1: return 'Korean description'
          case 2: return 'Korean description'
          /* TEST_CODE_2 */
          case 1: return 'Korean description'
          case 2: return 'Korean description'
        }

        break
      }
      case 'ja': {

        switch ( code ) {

          /* TEST_CODE_1 */
          case 1: return 'Japanese description'
          case 2: return 'Japanese description'
          /* TEST_CODE_2 */
          case 1: return 'Japanese description'
          case 2: return 'Japanese description'
        }

        break
      }
      default: {

        switch ( code ) {

          /* TEST_CODE_1 */
          case 1: return 'English description'
          case 2: return 'English description'
          /* TEST_CODE_2 */
          case 1: return 'English description'
          case 2: return 'English description'
        }
      }
    }
  }
}

module.exports = new CODE()