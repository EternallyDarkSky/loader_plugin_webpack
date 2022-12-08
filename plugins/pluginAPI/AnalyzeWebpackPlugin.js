class AnalyzeWebpackPlugin{

    apply(compalier){
        compalier.hooks.emit.tapAsync("AnalyzeWebpackPlugin", (compalitation, callback) => {
            
            // 1. 遍历所有即将输出的文件，获取其尺寸
            const assets = Object.entries(compalitation.assets)
            // 2. 生成一个 md 文件
            /**
            |  表头   | 表头  |
            |  ----  | ----  |
            | 单元格  | 单元格 |
            | 单元格  | 单元格 |
             */
            let content = `|资源名称|资源大小|\n|----|----|`
            assets.forEach(([filename,file])=>{
                content += `\n|${filename}|${Math.ceil(file.size()/1024)}kb|`
            })
            
            compalitation.assets['./static/analyse.md']={
                 source(){
                    return content
                 },
                 size(){
                    return content.length
                 }
            }
            debugger
            callback()
        })
    }
}

module.exports = AnalyzeWebpackPlugin