import { compose } from 'redux';
import { ExcelJSData, createExcelJSBuffer } from '@bugofbook/isomorphic/file/write/exceljs';
import {
    appendLink,
    bodyAppendLink,
    setFileName,
    handleDownload,
    afterDownload,
} from '@bugofbook/browser/file/write/core';

function createExcelBolb(buffer: BlobPart): Blob {
    return new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;',
    });
}

export async function downloadExcelFile(
    dataArr: ExcelJSData[],
    fileName: 'my-excel'
) {
    const buffer = await createExcelJSBuffer(dataArr);
    const blob = createExcelBolb(buffer);
    const downloadExcelLink = compose(
        handleDownload,
        bodyAppendLink,
        setFileName(`${fileName}.xlsx`),
        appendLink
    )(blob);
    afterDownload(downloadExcelLink);
}
