
// 清除内容中的console.log 语句
module.exports = function (content){

    // console.log("----- clear log");
    return content.replace(/console\.log\(.*\);?/g,'')

}