const { debug } = require("webpack");

class cleanWebpackPlugin {
    constructor(options) {
        this.options = options
    }
    apply(compalier) {
        // 1. 获取输出目录 ，通过compalier 获取
        const outputpath = compalier.options.output.path;
        // 2. 通过文件以清空内容 compalier.outFileSystem 操作文件
        const fs = compalier.outputFileSystem;
        compalier.hooks.emit.tapAsync("cleanWebpackPlugin", (compalitation, callback) => {
            const err = this.removeFile(fs, outputpath);
            callback(err)
        })

    }
    removeFile(a, b) {
        try{
            const files = a.readdirSync(b)
            files.forEach((file) => {
                let newpath = b + "/" + file
                let stats = a.statSync(newpath)// '1.js'（得使用绝对路径）
                if (stats.isFile()) {
                    a.unlinkSync(newpath)
                } else {
                    this.removeFile(a, newpath)
                }
            })
               
        }catch(error){
            throw new Error(error)
        }
    }
}

module.exports = cleanWebpackPlugin