// let fs = require("fs")

// console.log("before");
// fs.readFile("f1.txt",cb);
// function cb(err,data){  // if files takes time to load on server then put it into another thread or core
//     if(err){
//         console.log(err) //   before runs then after runs because just beacuse of some load on thred which() function readfile and cb )
//     }else{               // thet function send is send aon another thred or core so that apart from that work should be done.
//         console.log("data" + data)// in short put hevy work on another thred
//     }                            
// }
// console.log("after");

// part 1
// let fs = require("fs")
// function fn() {
//     console.log("hello")
//     let frP = fs.promises.readFile("f1.txt") // heavy task thats y ans will be
//     return frP                         // - hello
// }                                      // rval from fn { <pending>}
// let  rval = fn();
// console.log("rval from fn", rval);

//  part 2
// async function 
let fs = require("fs")
console.log("before")
function fn() {
    console.log("hello")
    // node api will run frp  as another thread and then (aatach )
    let frP = fs.promises.readFile("f1.txt")// heavy task thats y ans will be
    console.log(" file read has been started");
    return frP  ;                          
}                                     //output     
let  rval = fn();                     //1 before
console.log("rval from fn", rval);    //2 hello
 // attach  node api                    // 3 file rea has been started
rval.then(function(Pval){             // 4 rval from fn {pending}
    console.log("pval is from fn" + Pval) //5 after
})
console.log("After")                      //6  pval is from Pval
// see theory at book



// 



