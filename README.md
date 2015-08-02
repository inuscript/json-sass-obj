# json-sass-obj

Object mode wrapper for [jsonSass](https://github.com/acdlite/json-sass)

## Usage Example

```js
var File = require("vinyl")
var jsonSassObj = require("json-sass-obj")

var fakeFile = new File({
  path: "path/to/some.json",
  contents: new Buffer(JSON.stringify({
    "foo" : "baz",
    "bee" : [1,2,3]
  }))
})
var stream = jsonSassObj({
  prefix: "$someItem: ",
  suffix: " !default;"
})
stream.write(fakeFile)
stream.once('data', function(file){
  var scss = file.contents.toString()
  // scss
  //
  // $someItem: (
  //  foo: baz,
  //  bee: (1, 2, 3)
  // ) !default

  // file.path === "path/to/some.scss"

})

```
