const puppeteer = require('puppeteer');
let browser;
let page;
//let image;

puppeteer
  .launch({
  headless : false,
  defaultViewpoint : null,
  args: ["--start-maximized"],
   slowMo: 50
  })
  .then(function(b){
      browser = b;
      return browser.pages();
  })
  .then(function(pages){
     page = pages[0];
    return page.goto("https://www.hackerrank.com/auth/login");
})
.then( function(){
    return page.type("#input-1", "pepefin342@troikos.com")
})
.then( function(){
    return page.type("#input-2","123456789")
})
.then( function(){

    return Promise.all([
       page.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"),
       page.waitForNavigation(),
    ])                      //serch icon css selector  
})    
.then( function(){
    return waitClickNavigate("[title='Interview Preparation Kit']")
   
})
.then(function(){
   return waitClickNavigate("[data-attr1= 'warmup']")
})
.then(function(){
  return waitClickNavigate(
      ".ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled"
  );
})
.then(function(){
    return page.waitForSelector("[data-attr2='Editorial']")
    
})
.then(function(){
    return page.click("[data-attr2='Editorial']")
    
})
.then(function(){
    return handleLockBtn();
})
.then(function(){
    console.log(1);
})
// .then(function copyText(selector) {
//     var copyText = document.querySelector(selector);
//     copyText.select();
//     document.execCommand("Copy");
//     return copyText.value;
//   })   
.then(function(){
    return page.evaluate(function(){
        return document.querySelector(
             ".challenge-editorial-block.editorial-setter-code pre").innerText;  
    });
})
// .then(function(data){
//     console.log(data);
// })
.then(function (c) {
    code = c;
}).then(function () {
    return page.evaluate(function () {
        return document.querySelector(".challenge-editorial-block.editorial-setter-code h3").innerText;
    });
}).then(function (lan) {
    language = lan;
    return page.waitForSelector('[data-attr2="Problem"]', {visible: true});
}).then(function () {
    return page.click('[data-attr2="Problem"]');
}).then(function () {
    return pasteCode(code, language);
}).then(function () {
    console.log(code);
}).then(function () {
    return browser.close();
})


// .then(function(){
//     return page.waitForSelector(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled")
    
// })
// .then(function(){
//     return page.click(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled")
    
// })

.catch(function(err){ 
                      
  console.log(err)

})
function pasteCode(code, language) {
    return page.waitForSelector("[type='checkbox']", {visible: true})
    .then(function () {
        return page.click("[type='checkbox']")
    }).then(function () {
        return page.waitForSelector("#input-1");
    }).then(function (){
        return page.type("#input-1", code)
    }).then(function (){
        return page.keyboard.down('Control');
    }).then(function () {
        return page.keyboard.press('A');
    }).then(function () {
        return page.keyboard.press('X');
    }).then(function () {
        return page.keyboard.up('Control');
    }).then(function () {
        return page.click('.css-1hwfws3');
    }).then(function () {
        return page.type('.css-1hwfws3', language);
    }).then(function () {
        return page.keyboard.press("Enter");
    }).then(function () {
        return page.keyboard.down("Control");
    }).then(function () {
        return page.click(".view-lines");
    }).then(function () {
        return page.keyboard.press('A');
    }).then(function () {
        return page.keyboard.press('V');
    }).then (function () {
        return page.keyboard.up("Control");
    }).then(function () {
        return page.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled");
    });
}
//if editorial is unlocked then we reslove it without doing anything, else unlock is clicked
function handleLockBtn(){
    return new Promise(function(resolve, reject){
        page
        .waitForSelector(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled",{visible: true})
        .then(function() {
            return page.click(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled");
        })
        .then(function(){
        resolve();
        })
        .catch(function(err){
            resolve(err);
        });
        
    });
}
//Complete repet task of click
function waitClickNavigate (Selector){
    return new Promise(function(resolve,reject){
        page
        .waitForSelector(Selector,{visible: true})
            .then(function(){
             return Promise.all([page.click(Selector),page.waitForNavigation()]);
        })
        .then(function(){
            resolve ();
        })
        .catch(function(error){
            reject (error);
        });
    });
}
