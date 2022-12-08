

// 异步loader 
// callback 的调用意味着异步Loader执行完毕
module.exports = function (content,map,meta){
    const callback = this.async()
    setTimeout(()=>{

        console.log("异步Loader 完成");
        callback(null,content,map,meta)
    },1000)
}