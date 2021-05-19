// title
// total videos
// actual videos  
// view watch time
// views
const puppeteer = require("puppeteer");
let page;
let cVideos = 0;
async function fn() {
    try {
        const browser = await puppeteer
            .launch({
                headless: false,
                defaultViewport: null,
                args: ["--start-maximized"],
            })
        let pages = await browser.pages();
        page = pages[0];
        await page.goto("https://www.youtube.com/playlist?list=PLzkuLC6Yvumv_Rd5apfPRWEcjf9b1JRnq");
        await page.waitForSelector("#stats>.style-scope.ytd-playlist-sidebar-primary-info-renderer", { visible: true });
        await page.waitForSelector("h1#title", { visible: true });
        // let {title,noofvideos,noofviews}=await page.evaluate(function(){// 
        let obj = await page.evaluate(function () {
            let allelements = document.querySelectorAll("#stats>.style-scope.ytd-playlist-sidebar-primary-info-renderer");
            let noofVideos = allelements[0].innerText;
            let noOfViews = allelements[1].innerText;//  in comment a log way is given
            let title = document.querySelector("h1#title").innerText;
            //this is short to write obj
               // return {title,noofvideos,noofviews}  
            let obj = {
                nfVideos: noofVideos,
                nfViews: noOfViews,
                title
            }
            return obj;
        });
        // console.log(title,noofvideos,noofviews)
        //  initially all videos -> title , duration
        console.log("Title", obj.title, " videos ", obj.nfVideos, "views ", obj.nfViews);
        let noOfVideos = obj.nfVideos.split(" ")[0];
        noOfVideos = Number(noOfVideos);
        let i = 0;
        // 700
        //83
        while ((noOfVideos - cVideos) > 100) {
            await scrollDown(page);
            console.log(i);
            i++;
        }
        // await page.waitForNavigation({waitUntil : networkidle0}) -// networkidel at insepect it shows current page list of videos after it appere properly 
      // after page apper complete because when scroll it  nameof videos comes but the pictire takes time to display thats y networldle becomes 0 (tick) after it apper and page scroll 
        // for rest 83 follow below
        // await page.waitForNavigation({ waitUntil: "networkidle0" });
        // 83 
        await waitTillHTMLRendered(page); // HTML FUNCTION 
        await scrollDown(); 
        console.log(cVideos);
        let videoSelector = "#video-title";
        let duration = "span.style-scope.ytd-thumbnail-overlay-time-status-renderer";
        // getTitleNDuration(videoSelector, duration);
        let titleDurArr = await page.evaluate(getTitleNDuration, videoSelector, duration);
        console.table(titleDurArr);
    } catch (err) {
        console.log(err);
    }
}
// scroll
async function scrollDown() {
    let length = await page.evaluate(function () {
        // console.log("scrolled");
        // -> time scroll
        let titleElems = document.querySelectorAll("#video-title");
        titleElems[titleElems.length - 1].scrollIntoView(true);
        return titleElems.length;
    });
    cVideos = length;
    // 100 - (noofVideos - Cvideos) > 100
// length is first 100 then length is 100 then again scroll down then 200 > 100 then again till so when it
// is less then again 100 then again htm function for remaining videos.
}
// duration title
function getTitleNDuration(videoSelector, duration) {
    let titleElementsArr = document.querySelectorAll(videoSelector);
    let durationElementArr = document.querySelectorAll(duration);
    // console.log("titlelength", titleElementsArr.length);
    // console.log("durationlength", durationElementArr.length);
    let titleDurArr = [];
    for (let i = 0; i < durationElementArr.length; i++) {
        let title = titleElementsArr[i].innerText;
        let duration = durationElementArr[i].innerText.trim();
        titleDurArr.push({ title, duration })
    }
    return titleDurArr;
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