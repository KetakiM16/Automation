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
    //return page.goto("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXKDSv9C9N0TFrJG0rVHyQgIlIdr7UTF2AfA&usqp=CAU")
})
.then(function(page){

    return page.screenshot({path : "example.png"});

})