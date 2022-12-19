import { Workbook, Worksheet } from 'exceljs';
/**
 * 處理表格的函式，比方說調整欄寬、合併儲存格、修改樣式等等
 */
export type ExcelJSStyleRule = (sheet: Worksheet) => Worksheet;

/**
 * 工作表的二維陣列資料
 */
export type ExcelJSContent = string[][];

/**
 * 形成一個 ExcelJS.Workbook所需的資料結構
 * @param sheetName - 工作表名稱
 * @param data - 二維陣列資料
 * @param titleData - 標頭二維陣列資料
 * @param ExcelJSStyleRules - 二維陣列資料
 */
export type ExcelJSData = {
    sheetName?: string;
    data?: ExcelJSContent;
    titleData?: ExcelJSContent;
    ExcelJSStyleRules?: ExcelJSStyleRule[];
};

// export
/**
 * 從 excel的工作表中讀取資料
 * @param ExcelJSData excel 的Worksheet
 */
function readExcelSheet(ExcelJSData: Worksheet) {
    const excelArray: string[][] = [];
    ExcelJSData.eachRow((row) => {
        const rowData: string[] = [];
        row.eachCell({ includeEmpty: true }, (cell) => {
            rowData.push(cell.text);
        });
        excelArray.push(rowData);
    });
    return excelArray;
}

/**
 *
 * @param buffer excel的buffer
 * @param sheetIndexArr 要讀取的excel的index
 * @returns
 */
function readExcelJSBuffer(buffer: ArrayBuffer, sheetIndexArr = [1]) {
    const workbook = new Workbook();
    return workbook.xlsx
        .load(buffer)
        .then(() => {
            const data = sheetIndexArr.map((index) => {
                const sheet = workbook.getWorksheet(index);
                return readExcelSheet(sheet);
            });
            return data;
        })
        .catch((error) => {
            throw new Error(error);
        });
}
export default readExcelJSBuffer;