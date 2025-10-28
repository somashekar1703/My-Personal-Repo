const { error, Console } = require('console');
const excelutils = require('exceljs');
class ExcelUtils {
    constructor(filepath, sheetname) {
        this.filepath = filepath;
        this.sheetname = sheetname;
        this.excelworkbk = new excelutils.Workbook();
    }
    async getWorkSheetfromExcl() {
        console.log("File reading started..." + this.filepath)
        await this.excelworkbk.xlsx.readFile(this.filepath);
        console.log("File reading completed...")
        console.log("Going to specific sheet to read data: " + this.sheetname);
        const getworksheeet = this.excelworkbk.getWorksheet(this.sheetname);
        if (!getworksheeet) throw new Error(` ${getworksheeet} - not found in given file...`)
        return getworksheeet;
    }
    async readValuefromExlUsingTcId(testcaseID, rownum, colnum) {
        if (!rownum) throw new Error("Row number not provide!.....");
        if (!colnum) throw new Error("Column number is not provided!....");
        if (!testcaseID) throw new Error("Testcase ID is not provided!....");

        const getworkshet = await this.getWorkSheetfromExcl();

        const ExlStepNoColValue = 1
        const ExlTestcaseIdColValue = 2
        const testdataRow = getworkshet.getRow(rownum);
        const ActualTestcaseIdValue = testdataRow.getCell(ExlTestcaseIdColValue).value;
        const StepNooOfGivenRow = testdataRow.getCell(ExlStepNoColValue).value;

        if (testcaseID === ActualTestcaseIdValue) {
            const testdatavalue = testdataRow.getCell(colnum).value;
            if (testdatavalue !== null && testdatavalue !== undefined && typeof testdatavalue !== 'object') {
                const value = String(testdatavalue).trim();
                return value;
            }
            else if (typeof testdatavalue == 'object') {
                const value = testdatavalue.text || testdatavalue.result || '';
                return String(value).trim();
            }
            else {
                throw new Error(`Value is empty for row ${rownum}, column ${colnum}`);
            }
        }
        else {
            throw new Error(`Test case Id: ${testcaseID} is not matching with given row number - ${rownum} 
    at serial No. ${StepNooOfGivenRow} or else check and give proper testcase ID`);
        }
    }
    async readValuefromExcel(rownum, colnum) {
        if (!rownum) throw new Error("Row number not provide!.....");
        if (!colnum) throw new Error("Column number is not provided!....");

        const getworkshet = await this.getWorkSheetfromExcl();
        const Excelvalue = getworkshet.getCell(rownum, colnum).value;
        if (Excelvalue == null || Excelvalue == undefined) {
            return null
        }
        else if (typeof Excelvalue == 'object') {
            const data = JSON.stringify(Excelvalue, null, 2);
            return data;
        }
        else return Excelvalue.toString().trim();
    }
    async writedataintoExcel(rownum, colnum, data) {
        if (!rownum) throw new Error("Row number not provide!.....");
        if (!colnum) throw new Error("Column number is not provided!....");
        if (!data) throw new Error("data is missing, Give data to enter or insert in excel file");

        const getworkshet = await this.getWorkSheetfromExcl();
        const dataEntryCell = getworkshet.getCell(rownum, colnum)
        console.info(`getCell() method Executed and cell co-ordinates are ${rownum},${colnum}....`)
        dataEntryCell.value = data
        console.info(`${data} is updated in cell...`)
        await this.excelworkbk.xlsx.writeFile(this.filepath);
        console.info("File Saved....")
        const dataAfterEntry = getworkshet.getCell(rownum, colnum).value;
        console.info("Comparing given value and value written in cell...")
        if (dataAfterEntry == data) {
            console.info(`Value successfully written into excel in ${rownum}th row at ${colnum}th column`);
            return true;
        }
        else {
            console.warn(`Warning: Data "${dataAfterEntry}" is not inserted or written into excel at row ${rownum}th and column ${colnum}`);
            return false;
        }

    }
    async getTotalRowCount() {
        let rowcount = 0;
        const WorkSheett = await this.getWorkSheetfromExcl();
        console.info("Finding  Total Row Count....")
        WorkSheett.eachRow({ includeEmpty: false }, (row, rownumber) => {
            if (rownumber > 0) //skipping the header row
            {
                rowcount++;
            }
        });
        console.info(`getTotalRowCount(): Total Row Count is "${rowcount}"`)
        return rowcount;
    }
    async getTotalColumnCount() {
        let colcount = 0;
        const WorkSheett = await this.getWorkSheetfromExcl();
        console.info("Finding  Total Column Count....")
        WorkSheett.eachRow({ includeEmpty: false }, (row) => {
            if (row.actualCellCount > colcount) {
                colcount = row.actualCellCount;
            }
        });
        console.info(`getTotalColumnCount(): Total Column Count is "${colcount}"`);
        return colcount;
    }
    async replaceCellValueUsingCorrespondingCell(currentCellVal, replacableValue, replacableValColHeader, coldirection, noOfSteps) {
        if (!currentCellVal) throw new Error("Current cell value is missing...");
        if (!replacableValue) throw new Error("Replacable value is missing...");
        if (!replacableValColHeader) throw new Error("Replacable Column Header value is missing...");
        if (!coldirection) throw new Error("column direction not provided to move");
        if (!noOfSteps) throw new Error("No of steps value is missing....");

        const WorkSheett = await this.getWorkSheetfromExcl();
        let currentCellCoordinates = { rowNum: -1, colNum: -1 };
        let found = false;
        let HeaderRowValue = 1
        WorkSheett.eachRow((row, rowNo) => {
            row.eachCell((cell, colno) => {
                if (cell.value == currentCellVal && !found) {
                    currentCellCoordinates.rowNum = rowNo;
                    currentCellCoordinates.colNum = colno;
                    console.log(`Current cell's row:${currentCellCoordinates.rowNum} and column:${currentCellCoordinates.colNum} values are stored`);
                    found = true;
                }
            })

        })
        if (!found) throw new Error(`current Cell Value is not matching with any one of the data in sheet:  ${this.sheetname}`)
        const ColDirect = coldirection.toLowerCase()
        if (ColDirect == 'forward') {
            console.log(`As mentioned, Moving ${noOfSteps} steps forward from current column`);
            currentCellCoordinates.colNum += noOfSteps;
            console.log(`Expected column - ${currentCellCoordinates.colNum}th`);
        }
        else if (ColDirect == 'backward') {
            console.log(`As mentioned, Moving ${noOfSteps} steps backward from current column`);
            currentCellCoordinates.colNum -= noOfSteps;
            console.log(`Expected column - ${currentCellCoordinates.colNum}th`);
        }
        else if (ColDirect == 'current') {
            console.log(`As mentioned, Not moving forward or backward from current column,replace of value take place in current column only.`);
            currentCellCoordinates.colNum = currentCellCoordinates.colNum + (noOfSteps - noOfSteps);
            console.log(`Expected column - ${currentCellCoordinates.colNum}th`);

        } else throw new Error("Index was out of boundary, Mention any one option - forward,backward & current");

        const expectedColHeaderVal = await this.readValuefromExcel(HeaderRowValue, currentCellCoordinates.colNum);
        console.log(`Expected column header value is ${expectedColHeaderVal}`);
        if (expectedColHeaderVal == null || expectedColHeaderVal == undefined)
            throw new Error(`Expected column header value is not declared or empty..`)
        else if (expectedColHeaderVal !== replacableValColHeader)
            throw new Error(`Expected:${expectedColHeaderVal} and Actual:${replacableValColHeader} column header values are matching, Please check once again`)
        else {
            const existingValue = await this.readValuefromExcel(currentCellCoordinates.rowNum, currentCellCoordinates.colNum);
            console.log(`Existing value retrive from sheet  - ${existingValue}`);
            if (existingValue !== null && existingValue !== undefined) {
                const Isreplaced = await this.writedataintoExcel(currentCellCoordinates.rowNum, currentCellCoordinates.colNum, replacableValue)
                if (Isreplaced) {
                    console.log(`"${replacableValue}" is replaced with "${existingValue}" at row ${currentCellCoordinates.rowNum}th and column ${currentCellCoordinates.colNum}th `);
                    return Isreplaced;
                }
                else throw new Error("Value is not replaced, please check once....");
            }
        }
    }
    async FindFirstEmptyRow(startRow = 1) {
        let RowVal = startRow;
        const getworkshet = await this.getWorkSheetfromExcl();
        console.info("Finding First Empty Row....")
        while (true) {
            const row = getworkshet.getRow(RowVal);
            const isempty = row.values.slice(1).every(cell => cell === null || cell === "");
            if (isempty) {
                console.info(`FindFirstEmptyRow(): First Empty Row is: ${RowVal}`);
                return RowVal;
            }
            RowVal++;
        }
    }
    async InsertDatainNewRow(Arraydata) {
        if (!Arraydata || !Arraydata.length) throw new Error("ERROR: Insert Data is missing....")
        const RowData = Arraydata;
        const datalength = Arraydata.length;
        console.info(`InsertDatainNewRow(): Length of given Data Array - ${datalength}`);
        const lastNonEmptyRowCount = await this.getTotalRowCount();
        const lastNonEmptyColCount = await this.getTotalColumnCount();
        const emptyRowNo = await this.FindFirstEmptyRow(lastNonEmptyRowCount);
        if (datalength !== lastNonEmptyColCount) throw new Error(`Given data length is not equal to total column count at ${emptyRowNo}th row`);

        console.info("Data inserting starts....")
        for (let i = 0; i < datalength; i++) {
            await this.writedataintoExcel(emptyRowNo, i + 1, RowData[i])
            console.debug(`${RowData[i]} inserted in ${emptyRowNo} row at ${i + 1} column`);
        }
        console.info("InsertDatainNewRow(): Given Data successfully inserted.....")
        return {
            InsertedRow: emptyRowNo,
            status: true,
            filepath: this.filepath
        }

    }














}
module.exports = { ExcelUtils };
