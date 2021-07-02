const {readFile, writeFile} = require('fs')

function savePath(dest,file, cb){
    writeFile(dest, file, (err, data)=>{
        if(err){
            return cb(err)
        }
    })
}



function readPath(filename, cb){
    readFile(filename, 'utf8', (err, data)=>{
        if(err){
            return cb(err)
        }
        return cb(null, data)
    })
}

module.exports = (arr, dest, cb)=>{
    const length = arr.length
    if(typeof(arr) !== 'object' || length===0){
        const err = 'List of files should an array and not empty'
        return process.nextTick(()=>cb(err)) 
    }

    if(arr.some(file=>typeof(file)!=='string')){
        const err = 'Paths should be strings'
        return process.nextTick(()=>cb(err))
    }

    function asyncRead(index){
        if(index===length){
            return cb
        }
        const filePath = arr[index]
        readPath(filePath, (err,data)=>{
            
            if(err){
                return cb(err)
            }
            let fileTo = data
            if(index>0){ // if copying more than one file
                readPath(dest, (err, data)=>{
                    if(err){
                        return cb(err)
                    }
                    fileTo = fileTo.concat(data)
                    savePath(dest, fileTo, err=>{
                        if(err){
                            return cb(err)
                        }
                    })
                })
            }else{
                savePath(dest, fileTo, err=>{
                    if(err){
                        return cb(err)
                    }
                })
            }
        })
        asyncRead(index+1)
    }
    asyncRead(0)  
}


