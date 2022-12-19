// @ts-// import ExcelJS from 'exceljs'
import { Workbook, Worksheet } from 'exceljs'
import { compose } from "redux"
/**
 * 處理表格的函式，比方說調整欄寬、合併儲存格、修改樣式等等
 */
export type ExcelJSStyleRule = (sheet: Worksheet) => Worksheet

/**
 * 工作表的二維陣列資料
 */
export type ExcelJSContent = string[][]

/**
 * 形成一個 ExcelJS.Workbook所需的資料結構
 * @param sheetName - 工作表名稱
 * @param data - 二維陣列資料
 * @param titleData - 標頭二維陣列資料
 * @param ExcelJSStyleRules - 二維陣列資料
 */
export type ExcelJSData = {
    sheetName?: string,
    data?: ExcelJSContent,
    titleData?: ExcelJSContent,
    ExcelJSStyleRules?: ExcelJSStyleRule[]
}
/**
 * 設定標頭
 * @param titleArr 標頭陣列
 * @param dataArr 資料陣列
 * @returns 
 */
function addTitleData (titleArr: ExcelJSContent, dataArr: ExcelJSContent) {
    return [...titleArr, ...dataArr]
}

/**
 * 把資料塞進工作表
 */
function appendDataToSheet(sheet: Worksheet, data: any[]) {
    data.forEach((rowData: any) => {
        sheet.addRow(rowData)
    })
    return sheet
}
/**
 * 生出一個 ExcelJS.Workbook的Buffer
 * @param dataArr 
 * @param styleRulesArr 
 * @returns 
 */
export async function createExcelJSBuffer(dataArr: ExcelJSData[]){
    const workbook = new Workbook()
    dataArr.forEach(({ sheetName = 'name', data = [] , titleData = [], ExcelJSStyleRules = [] }) => {
        const sheet = workbook.addWorksheet(sheetName)
        const ExcelJSData = addTitleData(titleData, data)
        const dataSheet = appendDataToSheet(sheet, ExcelJSData)
        compose(...ExcelJSStyleRules)(dataSheet)
    })
    return await workbook.xlsx.writeBuffer()
}

// export 
/**
 * 從 excel的工作表中讀取資料
 * @param ExcelJSData excel 的Worksheet
 */
function readExcelSheet(ExcelJSData: Worksheet) {
    const excelArray: string[][] = []
    ExcelJSData.eachRow((row) => {
        const rowData: string[] = []
        row.eachCell({ includeEmpty: true }, (cell) => {
            rowData.push(cell.text)
        })
        excelArray.push(rowData)
    })
    return excelArray
}

/**
 * 
 * @param buffer excel的buffer
 * @param sheetIndexArr 要讀取的excel的index
 * @returns 
 */
export function readExcelJSBuffer(buffer: ArrayBuffer, sheetIndexArr=[1]) {
    const workbook = new Workbook()
    return workbook.xlsx.load(buffer)
        .then(() => {
            const data = sheetIndexArr.map((index) => {
                const sheet = workbook.getWorksheet(index)
                return readExcelSheet(sheet)
            })
            return data
        })
        .catch((error) => {throw new Error(error)})
}