## Auto Create Code with Pattern files

Built to automatically create API codes or documents using concise code. You can change the code to what you want by using the pattern.

<br>

<br>

## Installation

```bash
npm install accp -g
```

<br>

<br>

## Visual Code Extension

[Visual Code Extension Program accp language](https://marketplace.visualstudio.com/items?itemName=Bettep.accp)

Open the file with the extension( `.api`, `.code`, `.struct` ).

Enter the `ctrl` + `k` `m` (change language mode ) command.

Select `Accp` and apply it.

<br><br>

## Example

```bash
accp --examples <folder>
```

An example file is created within the `<folder>`. Example project used a Swift pattern.

The folder structure is as follows.

<br>

`api` : Default document defining API( [.api](#api) ).

`code` : Error Code Definition and Translation( [.code](#code) ).

`struct` : Structure used in API( [.struct](#struct) ).

`pattern` : Custom pattern files( `.js` ).

*** All files and folders are required.**

<br><br>

## Compile

```bash
accp --compile
```

Compile progresses with reference to pattern file. Compilation results are returned to [OBJ](#obj) and [GEN](#gen).

<br>

```javascript
module.exports = function( OBJ, GEN ) { 
    
  /* Please write your code */ 
}
```

The following code shall be included in the `pattern/*.js` file.

<br>

![Compile result](https://raw.githubusercontent.com/Hongdaesik/accp/master/img/compile.jpg)

<br><br>

## Return value

#### GEN

GEN is a function that helps you create files.

<br>

##### initialization

```javascript
var api = new GEN( "file path" )
```

<br>

##### method

`api.open( encoding )` : Create write stream, default encoding `utf8`.

`api.print( string )` : Write the content.

`api.close()` : Close write stream.

<br><br>

#### OBJ

Object created through `accp --compile`.

```javascript
OBJ = {

  API: [ ( CLASS ) {
  
      BASE: String,
      NAME: String,
      MARK: String,
      FUNC: [ ( FUNC ) {
          
          CODE: Int,
          NAME: String,
          DESC: String
      
          /* Request method: address */
          ( POST | GET ): String
      
          /* Completion status */
          COMP: ( true | false )
      
          /* Associative process */
          PROC: [ {
            
              CODE: Int ( CLASS.FUNC.CODE ),
              NAME: String ( CLASS.FUNC.NAME )
          }, ... ],
          
          /* Comments about this function */
          MARK: [ {
              
              NAME: String,
              MARK: String
          }, ... ],
          
          REQ: [ ( DATA ) {
              
              NAME: String,
              MARK: String,
              CLASS: String,
              ARRAY: ( true | false ),
              OPTION: {

                  key: String,
                  key: String, ...
              }
          }, ... ],
          
          /* Be the same as REQ */
          RES: [ { ... } ],
          
          /* User defined value */
          OPT: {
            
              key: ( true | false ),
              key: ( true | false ), ...
          }
      }, ... ]
  }, ... ],
  
  CODE: [ ( CLASS ) {
    
      NAME: String,
      MARK: String,
      CODE: [ {

          CODE: Int,
          NAME: String,
          MARK: {
              
              key: String,
              key: String, ...
          }
      } ],
  }, ... ],
    
  STRUCT: [ {
              
      NAME: String,
      MARK: String,
      
      /* Be the same as REQ.DATA */
      DATA: [ { ... } ]
  }, ... ]
}
```

<br><br>

## Language

accp language is provided as a [visual code extension program](https://marketplace.visualstudio.com/items?itemName=Bettep.accp).

<br>

#### .api

![](https://raw.githubusercontent.com/Hongdaesik/accp/master/img/api.jpg)

###### Usage prefix 

`api` : Snippet for api.

`api class` : Snippet for api class.

`api function` : Snippet for api function.

<br>

#### .code

![](https://raw.githubusercontent.com/Hongdaesik/accp/master/img/code.jpg)

###### Usage prefix

`code` : Snippet for code.

`code class` : Snippet for code class.

`code function` : Snippet for code function.

<br>

#### .struct

![](https://raw.githubusercontent.com/Hongdaesik/accp/master/img/struct.jpg)

###### Usage prefix

`struct` : Snippet for struct.

`struct function` : Snippet for struct function.

<br><br>

## Raw data provided

`Int`

`Data`

`Float`

`Double`

`String`

`Boolean`

<br><br>

## Change Log

`1.0.4-beta` : Replace sample files.

`1.0.5-beta` : Usage prefix explain add.

`1.0.6-beta` : Homepage domain change.

<br><br>

## License

MIT

<br><br>

## Other programs

<https://bettep.org>