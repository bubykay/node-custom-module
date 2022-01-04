const {readdir, statSync, lstat} = require('fs')

function directory(path, cb){
    const k = readdir(path, (err, list)=>{
        if(err){
            return cb(err)
        }
        const dirLenght = list.length
        const files = []

    })

    function inward(index){
        if(index===dirLenght){
            return cb
        }
        const fileInfo = {}
        
    }
}









