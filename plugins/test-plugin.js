
/**
 *  1. webpack 加载 webpack.config.js 中全部配置 ， 此时 就会调用 new TestPlugin() , 执行 构造方法
 *  2. webpack 创建compiler 对象
 *  3. 遍历所有的 plugins 中插件的 apply 方法。
 *  4. 执行剩下编译流程(触发hooks 函数)
 */
class TestPlugin{

    constructor (){
        console.log("constructor");
    }

    apply(compiler){
        // console.log("apply");
        // compiler.hooks.environment.tap("TestPlugin",()=>{
        //     // console.log(this instanceof TestPlugin);  // true
        //     // console.log(this);
        // })

        // compiler.hooks.emit.tap("TestPlugin",(compilation)=>{
        //     console.log("1");
        // })
        compiler.hooks.emit.tapAsync ("TestPlugin",(compilation,callback)=>{
            debugger
            console.log("2");
            setTimeout(()=>{
                callback()
            },2000)
        })
        // compiler.hooks.emit.tapPromise ("TestPlugin",(compilation)=>{
        //     console.log("3");
        //     return new Promise((r,j)=>{
        //         setTimeout(()=>{
        //             r()
        //         },1000)
        //     })
        // })

        // debugger 
        // console.log(compiler);
        // compiler.hooks.make.tapAsync("TestPlugin",(compilation,callback)=>{
        //     debugger
        //     console.log(compilation);
        //     compilation.hooks.seal.tap("TestPlugin",()=>{
        //         console.log("seal");
        //     });
        //     callback()
        // })
    }
}

module.exports = TestPlugin