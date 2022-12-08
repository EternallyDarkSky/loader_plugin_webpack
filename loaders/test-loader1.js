
// 接受文件内容作为参数
// content 文件内容
// map SourceMap
// mete 别的loader传来的数据
module.exports = function (content,map,meta){
    console.log(content);
    
    /**
     *  第一个参数： err 代表是否有错误
     *  第二个参数： content 代表处理后的内容
     *  第三个参数： sourceMap 要求继续传递
     *  第四个参数:  meta  给其他loader 传递的参数
     */
    this.callback(null,content,map,{info:"Hello loader"});
}