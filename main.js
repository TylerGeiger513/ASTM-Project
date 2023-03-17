const {Search, Filter, ClaimantFilter}= require('./src/url-encoder.js');
const {queueSearch} = require('./src/search-api.js');
const {getStandards} = require('./src/xlsx-api/xlsx-reader.js');


const XLSX = require('xlsx');
const fs = require('fs');

const standards = getStandards('spreadsheet.xlsx');

// async function logStandards() {

//     for (const standard of standards) {
//         const response = await queueSearch(new Search([new ClaimantFilter(), new Filter(standard.Designation)]).getUrlFromFilters());
//         console.log(response);
//     }
    
// }

//logStandards();

//console.log(standards);



function isPreviousTitle(queryTitle, resultTitle) {``
    const queryId = queryTitle.split(' ')[1].split('-')[0]
    const regexString = `ASTM\\s${queryId}-\\d\\d`
    console.log(regexString)
    const regex = new RegExp(regexString);
    console.log(resultTitle.match(regex));

}   



