var jsToSassString = require('json-sass/lib/jsToSassString') // TODO: Fix if json-sass bug
var through2 = require("through2")
var replaceExt = require('replace-ext');

module.exports = function(options){
  return through2.obj(function(file, enc, cb){
    var jsValue = JSON.parse(file.contents.toString())
    var sassString = jsToSassString(jsValue)
    // sassString = options.prefix + sassString + options.suffix;
    file.contents = new Buffer(sassString)
    if(typeof file.path === "string"){
      file.path = replaceExt(file.path, ".scss")
    }
    this.push(file)
    cb()
  })
}