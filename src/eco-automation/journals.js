const puppeteer = require('puppeteer');

const {getJournals} = require('../xlsx-api/xlsx-reader.js');

async function openECO(url) {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--enable-features=NetworkService'],
        defaultViewport: null,
        ignoreHTTPSErrors: true
    });

    const page = await browser.newPage();
    await page.goto(url);

    return {browser, page};
}



const start = async () => {
    const {browser, page} = await openECO('https://eservice.eco.loc.gov/siebel/app/eservice/enu?SWECmd=Start');
    
    const journals = getJournals('journals.xlsx');
    let currentJournal = 0;

    let {title, year_of_completion, published_date, internal_tracking_number} = journals[currentJournal];


    page.on('framenavigated', async (frame) => {
        
        // try to find the title input element –> autofill if it exists
        try {
          await frame.waitForSelector('textarea[aria-labelledby="Title_Label"]', { timeout: 5000 });
          await frame.$eval('textarea[aria-labelledby="Title_Label"]', (textarea, value) => {
            textarea.value = value;
          }, `${title}`);
          await page.focus('textarea[aria-labelledby="Title_Label"]');
        } catch (error) {
        }

        // try to find the year of completion input element –> autofill if it exists
        try {
            await frame.waitForSelector('input[aria-labelledby="Year_of_Completion_Label"]', { timeout: 5000 });
            await frame.$eval('input[aria-labelledby="Year_of_Completion_Label"]', (input, value) => {
                input.value = value;
            }, `${year_of_completion}`);
            await page.focus('input[aria-labelledby="Year_of_Completion_Label"]');
        } catch (error) {
        }
        
        // try to find the pub date input element –> autofill if it exists
        try {
            await frame.waitForSelector('input[aria-labelledby="Publication_Date_Label"]', { timeout: 5000 });
            await frame.$eval('input[aria-labelledby="Publication_Date_Label"]', (input, value) => {
                input.value = value;
            }, `${published_date}`);
            await page.focus('input[aria-labelledby="Publication_Date_Label"]');
        } catch (error) {
        }

        // try to find the InternalTrackingNumber_Label" input element –> autofill if it exists
        try {
            await frame.waitForSelector('input[aria-labelledby="InternalTrackingNumber_Label"]', { timeout: 5000 });
            const input = await frame.$('input[aria-labelledby="InternalTrackingNumber_Label"]');
            const readOnly = await input.evaluate((node) => {
                return node.readOnly || node.getAttribute('aria-readonly') === 'true';
            });
            if (readOnly) {
                return;
            }
            await frame.$eval('input[aria-labelledby="InternalTrackingNumber_Label"]', (input, value) => {
                input.value = value;
            }, internal_tracking_number);
            await page.focus('input[aria-labelledby="InternalTrackingNumber_Label"]');
        } catch (error) {
            //console.log(error);
        }
        
    });
}

start();
