const puppeteer = require('puppeteer')

async function queueSearch(url) {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--enable-features=NetworkService'],
        ignoreHTTPSErrors: true
    });

    const page = await browser.newPage();
    let results = [];
    
    const responsePromise = new Promise((resolve) => {
        page.on('response', async response => {
            if (response.url().endsWith('advance_search') && response.request().method() === 'POST') {
                const responseJson = await response.json();
                for (let result of responseJson.data) {
                    const regNumber = result.hit.registration_number_list[0].registration_number;
                    const regDate = result.hit.registration_number_list[0].registration_date.substring(0, 4);
                    results.push({regNumber, regDate});
                }
                resolve(results);
            }
        });
    });
    
    await page.goto(url);
    const response = await responsePromise;
    await browser.close();
    return response;
}


module.exports = {queueSearch};

