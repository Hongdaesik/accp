

function CODE() {

  /* API */
  this.API_ERROR1 = 1
  this.API_ERROR2 = 2
  /* SYSTEM */
  this.SYSTEM_ERROR1 = 3
  this.SYSTEM_ERROR2 = 4

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

          /* API */
          case 1: return 'Korean description'
          case 2: return 'Korean description'
          /* SYSTEM */
          case 3: return 'Korean description'
          case 4: return 'Korean description'
        }

        break
      }
      case 'ja': {

        switch ( code ) {

          /* API */
          case 1: return 'Japanese description'
          case 2: return 'Japanese description'
          /* SYSTEM */
          case 3: return 'Japanese description'
          case 4: return 'Japanese description'
        }

        break
      }
      default: {

        switch ( code ) {

          /* API */
          case 1: return 'English description'
          case 2: return 'English description'
          /* SYSTEM */
          case 3: return 'English description'
          case 4: return 'English description'
        }

        break
      }
      
    }
  }
}

module.exports = new CODE()