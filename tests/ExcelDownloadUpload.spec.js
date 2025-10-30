const { test, expect } = require('@playwright/test');
const { ExcelUtils } = require('../Utils/ExcelUtils');
const os = require('os');
const path = require('path');

test('@UITest Working on Excel download and upload', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    //Excel Download and validate the values in it....
    const downloadpromise = page.waitForEvent('download');
    await page.locator("#downloadButton").click();
    const download = await downloadpromise;
    const downloadfolder = await path.join(os.homedir(),'Downloads');
    console.log("User download folder: "+downloadfolder);
    const filepath = path.join(downloadfolder,download.suggestedFilename());
    console.log("filepath : " + filepath);
    await new Promise(r => setTimeout(r, 2000));
    await download.saveAs(filepath)

    await new Promise(r => setTimeout(r, 2000)); // Wait time to be ready for reading the data

    const Excel = new ExcelUtils(filepath, 'Sheet1');
    var rowNo = 5; var colNo = 2;
    const DataReadfromExcel = await Excel.readValuefromExcel(rowNo, colNo)
    console.log(`value at Row - ${rowNo} and Column - ${colNo} is ${DataReadfromExcel}`);

    //how many fruits data in excel....
    rowNo = 2;
    while (true) {
        const fruitName = await Excel.readValuefromExcel(rowNo, colNo);
        if (fruitName == null || fruitName == undefined || fruitName == "") {
            console.log(`There are no more fruit names after ${rowNo - 1}th row`)
            break;
        }
        console.log(`${fruitName} is at row ${rowNo}`);
        rowNo++;
    }

    //Working on writing into the Excel and uploading it....
  
    const replacedstatus = await Excel.replaceCellValueUsingCorrespondingCell("Apple",200,"price","forward",2);
    console.log(replacedstatus);
    const NonEmptyrowscount = await Excel.getTotalRowCount();
    const NonEmptycolcount = await Excel.getTotalColumnCount();

    console.log(`Non Empty Count: Row-${NonEmptyrowscount} & Column-${NonEmptycolcount}`);
    let InsertData = [7,"Watermelon","Light Green",100,"Summer"]
    const InsertedFilePath = (await Excel.InsertDatainNewRow(InsertData)).filepath;
    console.log(`Inserted in filepath: "${InsertedFilePath}"`);

    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles(InsertedFilePath);
    await expect(page.locator(".Toastify__toast-body")).toHaveText("Updated Excel Data Successfully.");
    
    await page.reload();

})