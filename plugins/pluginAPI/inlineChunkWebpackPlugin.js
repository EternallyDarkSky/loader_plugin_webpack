
const HtmlWebpackPlugin = require('safe-require')('html-webpack-plugin');
class inlineChunkWebpackPlugin {

    apply(compiler) {
        compiler.hooks.compilation.tap('inlineChunkWebpackPlugin', (compilation) => {
            // 获取 htmlwebpackplugin 的 hooks
            // 注册 hooks  alterAssetTagGroups
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tap(
                'inlineChunkWebpackPlugin', // <-- Set a meaningful name here for stacktraces
                (assets) => {
                    assets.headTags = this.getInlineChunk(assets.headTags,compilation.assets);
                    assets.bodyTags = this.getInlineChunk(assets.bodyTags,compilation.assets);
                }
            ),
            // 删除 对应的runtime文件
            HtmlWebpackPlugin.getHooks(compilation).afterEmit.tap(
                'inlineChunkWebpackPlugin', // <-- Set a meaningful name here for stacktraces
                () => {
                    Object.keys( compilation.assets).forEach((item)=>{
                        if (/runtime(.*)\.js/g.test(item)) {
                            delete compilation.assets[item]
                        }
                    })
                }
            )
        })
    }


    getInlineChunk(Tags,asssets) {
        return Tags.map(element => {
            if (element.tagName !== "script") return element;
            const filepath = element.attributes.src
            if (!filepath) return element
            if (!/runtime(.*)\.js/g.test(filepath)) return element
            return {
                "tagName": "script",
                "meta": {
                    "plugin": "html-webpack-plugin"
                },
                "innerHTML": asssets[filepath].source(),
                "closeTag": true
            }
        });

        // 目前
        // [
        //     {
        //         "tagName": "script",
        //         "voidTag": false,
        //         "meta": {
        //             "plugin": "html-webpack-plugin"
        //         },
        //         "attributes": {
        //             "defer": true,
        //             "src": "./runtime~main.js.js"
        //         }
        //     },
        //   ...
        // ]
        // 目标
        // [
        //     {
        //         "tagName": "script",
        //         "voidTag": false,
        //         "meta": {
        //             "plugin": "html-webpack-plugin"
        //         },
        //         "innerHTML":runtime内容，
        //          "closeTag":true
        //     },
        //   ...
        // ]
    }
}

module.exports = inlineChunkWebpackPlugin