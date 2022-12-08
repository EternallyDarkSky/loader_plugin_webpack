const schema = require("./schema.json")
const babel = require("@babel/core")
// https://babel.docschina.org/docs/en/babel-core/


module.exports = function (content) {
    const options = this.getOptions(schema)
    const callback = this.async()

    //  使用babel 对代码进行编译转换
    babel.transform(content, options, function (err, result) {
        // result; // => { code, map, ast }
        if(err) callback(err) ;
        else callback(null,result.code)
    });
}