const xlsx = require('xlsx');
const fs = require('fs');

// Iterate through each row in the "Standard" worksheet, returns a formatted array of standard objects
const getStandards = (fileName) => {
    const workbook = xlsx.readFile(fileName);
    const sheet = workbook.Sheets['Standard'];

    const standards = [];
    
    let i = 2;
    while (sheet[`A${i}`]) {
        const standard = {
            "Designation": sheet[`A${i}`].v,
            "Year-Date": sheet[`B${i}`].v,
            "Title": sheet[`C${i}`].v,
            "Published-Date": sheet[`D${i}`].v,
            "Joint-Acronym": sheet[`E${i}`].v,
            "ECO-Filed-Date": sheet[`F${i}`].v,
            "PDF-File-Name": sheet[`G${i}`].v,
            "BOS": sheet[`H${i}`].v,
            "Action-Type": sheet[`I${i}`].v,
            "Prev-Reg-1": sheet[`J${i}`].v,
            "Prev-Reg-1-Date": sheet[`K${i}`].v,
            "Prev-Reg-2": sheet[`L${i}`].v,
            "Prev-Reg-2-Date": sheet[`M${i}`].v,
            "Row": i,
        }
        standards.push(standard);
        i++;
    }

    return standards;
}

function formatDate(date) {
    // convert "YYYY-MM-DD" to "MM/DD/YYYY"
    const dateArray = date.split('-');
    return `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`;
}

function getYear(date) {
    // convert "YYYY-MM-DD" to "YYYY"
    const dateArray = date.split('-');
    return dateArray[0];
}
const getJournals = (fileName) => {
    const workbook = xlsx.readFile(fileName);
   // console.log(workbook.Sheets);
    const sheet = workbook.Sheets['Sheet1'];    
    
    const journals = [];
    let i = 1; 
    while (sheet[`A${i}`]) {
        const journal = {
            "internal_tracking_number": sheet[`A${i}`].v,
            "title": sheet[`B${i}`].v,
            "published_date": formatDate(sheet[`C${i}`].v),
            "year_of_completion": getYear(sheet[`D${i}`].v),
        }
        journals.push(journal);
        i++;
    }
    return journals;
}



module.exports = {getStandards, getJournals};


