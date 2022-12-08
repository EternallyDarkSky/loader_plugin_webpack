

class BannerWebpackPlugin {
    constructor(options) {
        this.options = options
    }
    apply(compalier) {
        compalier.hooks.emit.tapAsync("BannerWebpackPlugin", (compaliation,callback) => {
            // 1. 获取即将输出的资源文件 compailiation.assets
            // 2. 过滤只保留 js css 资源
            const extensions = ["css", 'js']
            const assets = Object.keys(compaliation.assets).filter((item) => {
                const splited = item.split(".").at(-1)
                return extensions.includes(splited)
            })
            // 3. 剩下资源加上注释
            // console.log(assets);
            const prefix = `
            /*
            * Author: ${this.options.author}
            */
            `
            assets.forEach((item)=>{
                const source =  compaliation.assets[item].source()
                const  content = prefix+source
                compaliation.assets[item]={
                    source(){ return content},
                    size(){ return content.length}
                }
            })

            callback()
        })
        
    }
}

module.exports = BannerWebpackPlugin