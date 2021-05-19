//  how to convert a cb fuction into call function 
// based asyc function into promise function
let fs = require ("fs")
 console.log("before");
 function myPromise(filepath){
    return new Promise(function fn(resolve, reject){
     console.log("hello")
     fs.readFile(filepath,function(error,data){
         if (error){
             reject (error);
         }else{
             resolve(filepath);
         }
     })
        })
 }
     
 
 let promise = myPromise("f1.txt");
 promise.then(function(data){
     comsole.log("data"+data);
 })
promise.catch(function(error){
    console.log(error);
})
console.log("after")