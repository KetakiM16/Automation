//title
//// total videos
// actual videos  
// view watch time
// views
const puppeteer = require('puppeteer');
let page;
let Cvideos = 0;
async function fn(){
    try {
    const browser = await puppeteer
        .launch({
        headless : false,
        defaultViewpoint : null,
        args: ["--start-maximized"],
        
        })
let pages =  await browser.pages();
let page = pages[0];
await page.goto("https://www.youtube.com/playlist?list=PLzkuLC6Yvumv_Rd5apfPRWEcjf9b1JRnq");
await page.waitForSelector("#stats>.style-scope.ytd-playlist-sidebar-primary-info-renderer",{visible: true});
await page.waitForSelector("h1#title",{visible: true});
// let {title,noofvideos,noofviews}=await page.evaluate(function(){// 

let obj = await page.evaluate(function(){
    let allelements = document.querySelectorAll("#stats>.style-scope.ytd-playlist-sidebar-primary-info-renderer");
    let noofvideos = allelements[0].innerText;
    let noofViews = allelements[1].innerText ;//  in comment a log way is given
    let title = document.querySelector("h1#title").innerText;
    //this is short to write obj
    // return {title,noofvideos,noofviews}  

     let obj = { 
          nfvideos : noofvideos,
           nfviews :  noofViews,
        title
        }
        return obj;
    });
// console.log(title,noofvideos,noofviews)
 console.log("title",obj.title,"videos", obj.nfvideos,"views", obj.nfviews)
 // title - #video-title
 // watch time -span.style-scope.ytd-thumbnail-overlay-time-status-renderer"

//  let videoSelector = "#video-title";
//  let duration = "span.style-scope.ytd-thumbnail-overlay-time-status-renderer"
 //await page.waitForSelector(videoSelector,{visible: true});
 //await page.waitForSelector(duration,{visible: true});
//let titleduArr = await page.evaluate(getTimeduration,videoSelector,duration);
 // console.table(titleduArr);
// scrolldownfuntion
let noofvideos =  obj.nfvideos.split(" ")[0];
noofvideos = Number(noofvideos);
let i = 0;
//700
//83 is in htm function running
while((noofvideos - Cvideos) > 100) {
    await scrollDown(page); // scroll it again function
    console.log[i]; // print title on index 0 to till end
    i++;
}
// await page.waitForNavigation({waitUntil : networkidle0}) -// networkidel at insepect it shows current page list of videos after it appere properly 
// after page apper complete because when scroll it  nameof videos comes but the pictire takes time to display thats y networldle becomes 0 (tick) after it apper and page scroll 
// for rest 83 follow below
await waitTillHTMLRendered(page);// HTML FUNCTION 
await scrollDown();
console.log(Cvideos);
 let videoSelector = "#video-title";
 let duration = "span.style-scope.ytd-thumbnail-overlay-time-status-renderer";
 //await page.waitForSelector(videoSelector,{visible: true});
 //await page.waitForSelector(duration,{visible: true});
let titleduArr = await page.evaluate(getTitleNDuration,videoSelector, duration);
 console.table(titleduArr);

} catch (error){
     console.log(error);
    }
}
//scroll
async function scrollDown() {
    let length = await page.evaluate(function () {
        // console.log("scrolled");
        // -> time scroll
        let titleElems = document.querySelectorAll("#video-title");
        titleElems[titleElems.length - 1].scrollIntoView(true);
        return titleElems.length;
    });
    

Cvideos = length;
}
// duration title
function getTitleNDuration(videoSelector,duration){
    let titleelmentArr = document.querySelectorAll(videoSelector);
    let duartionelemntArr = document.querySelectorAll(duration);
    //cosole.log("titlelength",titleelement.length) // both will print on browser console
    //cosole.log("duarationelementArr",duration.length)
    let titleduArr = [];
    for(let i = 0; i < duartionelemntArr.length; i++){
        let title = titleelmentArr[i].innerText;
        let duration = duartionelemntArr[i].innerText.trim();
        titleduArr.push({title, duration});

    }
    return titleduArr;

}
//  html wait 
async function waitTillHTMLRendered(page, timeout = 30000) {
    const checkDurationMsecs = 1000;
    const maxChecks = timeout / checkDurationMsecs;
    let lastHTMLSize = 0;
    let checkCounts = 1;
    let countStableSizeIterations = 0;
    const minStableSizeIterations = 3;

    while (checkCounts++ <= maxChecks) {
        let html = await page.content();
        let currentHTMLSize = html.length;

        let bodyHTMLSize = await page.evaluate(() => document.body.innerHTML.length);

        console.log('last: ', lastHTMLSize, ' <> curr: ', currentHTMLSize, " body html size: ", bodyHTMLSize);

        if (lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize)
            countStableSizeIterations++;
        else
            countStableSizeIterations = 0; //reset the counter

        if (countStableSizeIterations >= minStableSizeIterations) {
            console.log("Page rendered fully..");
            break;
        }

        lastHTMLSize = currentHTMLSize;
        await page.waitForTimeout(checkDurationMsecs);
    }
};

fn();