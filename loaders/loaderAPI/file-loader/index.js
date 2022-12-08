
const loaderUtils = require("loader-utils")

module.exports = function (content) {
    // 1. 生成 带 hash 的文件名
    let interpolatedName = loaderUtils.interpolateName(this, "[hash].[ext][query]",
        { content }
    );
    interpolatedName = `static/images/${interpolatedName}`;
    // 2. 手动迁移文件
    this.emitFile(interpolatedName,content)
    // 3. 返回 module.exports = "文件路径"
    return `module.exports = "${interpolatedName}"`
}
module.exports.raw = true
// 处理图片、字体文件（二进制数据） raw