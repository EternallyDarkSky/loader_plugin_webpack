

module.exports = function (content){
    
}

module.exports.pitch = function (remainRequest){

    // remainRequest 代表 剩下的 loader 
    // console.log(remainRequest);

    // 1. 绝对路径修改为相对路径
    const relativepath = remainRequest.split("!").map(abspath=>{
        return this.utils.contextify(this.context,abspath)
    }).join("!")
    console.log(relativepath);

    // 2. 引入 css-loader 处理后的资源
        // 使用inline-loader 用法
    // 3.动态创建 style 标签
        // ../../../node_modules/css-loader/dist/cjs.js!./index.css
    const script = `
    import style from "!!${relativepath}"
    const styleEL = document.createElement("style");
    styleEL.innerHTML = style;
    document.head.appendChild(styleEL)
    `
    // 熔断
    return script
}