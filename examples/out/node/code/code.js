

function CODE() {

  /* TEST_CODE_1 */
  this.TEST_CODE_1_error_1 = 1
  this.TEST_CODE_1_error_2 = 2
  /* TEST_CODE_2 */
  this.TEST_CODE_2_error_1 = 1
  this.TEST_CODE_2_error_2 = 2

  /**
   * Error message returned according to user language settings.
   * @param { string } typeLang
   * @param { number } code
   * @returns { string }
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

        break
      }
      
    }
  }
}

module.exports = new CODE()