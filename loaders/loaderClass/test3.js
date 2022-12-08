

// raw Loader
module.exports=  function (content,map,meta){
    console.log(meta);
    console.log(content);
    return content

}
module.exports.raw = true