var assert = require("power-assert") 
var File = require('vinyl');
var jsonSassObj = require("../")
var fs = require("fs")

describe("json-sass-obj", function(){
  it("should return sass file object", function(done){
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
      assert.equal(scss, fs.readFileSync("./test/fixture/map.scss"))
      assert.equal(file.path, "path/to/some.scss")
      done()
    })
  })
  it("should return sass file object withoud path ", function(done){
    var fakeFile = new File({
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
      assert.equal(scss, fs.readFileSync("./test/fixture/map.scss"))
      done()
    })
  })
})