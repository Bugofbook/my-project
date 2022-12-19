import { readArrayBuffer } from '@bugofbook/browser/file/read/core';
import readExcelJSBuffer from '@bugofbook/isomorphic/file/read/exceljs';

async function readExcelFile(file: File, sheetIndexArr = [1]) {
    const arrayBuffer = await readArrayBuffer(file);
    return readExcelJSBuffer(arrayBuffer, sheetIndexArr);
}
export default readExcelFile