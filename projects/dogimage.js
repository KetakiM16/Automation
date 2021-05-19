const puppeteer = require('puppeteer');
let browser;
let page;
//let image;

puppeteer
  .launch({
  headless : false,
  defaultViewpoint : null,
  args: ["--start-maximized"]
  })
  .then(function(b){
      browser = b;
      return browser.pages();
  })
  .then(function(pages){
     page = pages[0];
    return page.goto("https://www.google.com/");
})
.then(function(){
    return Promise.all([  // array is given  // click function  in puppterr 
        page.waitForNavigation(),
        page.click("[data-pid='2']"),  // CSS selector of image
      ]);
})
.then(function(){
    return page.type(".gLFyf.gsfi", "dog")
})
.then(function(){
    return Promise.all([
        page.waitForNavigation(),
        page.click(".Tg7LZd")]);  //serch icon css selector  
})
.then(function(){
return page.screenshot({path :"dog.png"});
})
.then(function (){
    return browser.close();
})
.catch (function(err){
    console.log(err);
})
