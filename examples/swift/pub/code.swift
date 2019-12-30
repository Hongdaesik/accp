

/** 
 * Description: code description  */
class TEST_CODE_1 {

  enum CODE: Int {

    case error_1 adfasdf = 1
    case error_2 = 2
  }

  public func getMessage( code: Int, translate: String ) -> String {

    switch translate {

      case "ko":

        switch code {

          case 1: return "Korean description"
          case 2: return "Korean description"

          default: return "Unknown error"
        }
      case "ja":

        switch code {

          case 1: return "Japanese description"
          case 2: return "Japanese description"

          default: return "Unknown error"
        }
      default:

        switch code {

          case 1: return "English description"
          case 2: return "English description"

          default: return "Unknown error"
        }
    }
  }
}

/** 
 * Description: code description  */
class TEST_CODE_2 {

  enum CODE: Int {

    case error_1 = 1
    case error_2 = 2
  }

  public func getMessage( code: Int, translate: String ) -> String {

    switch translate {

      case "ko":

        switch code {

          case 1: return "Korean description"
          case 2: return "Korean description"

          default: return "Unknown error"
        }
      case "ja":

        switch code {

          case 1: return "Japanese description"
          case 2: return "Japanese description"

          default: return "Unknown error"
        }
      default:

        switch code {

          case 1: return "English description"
          case 2: return "English description"

          default: return "Unknown error"
        }
    }
  }
}