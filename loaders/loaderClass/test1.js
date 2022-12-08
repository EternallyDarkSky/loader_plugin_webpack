
// // 同步loader 写法一
// module.exports = function (content){
//     return content
// }
// 同步loader 写法二
// callback 的调用意味着异步Loader执行完毕
module.exports = function (content,map,meta) {
    console.log("同步Loader 完成 ");
    /**
     *  第一个参数： err 代表是否有错误
     *  第二个参数： content 代表处理后的内容
     *  第三个参数： sourceMap 要求继续传递
     *  第四个参数:  meta  给其他loader 传递的参数
     */
    this.callback(null,content,map,meta);
}
