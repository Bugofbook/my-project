import { compose } from 'redux';
import createCSVString from '@bugofbook/isomorphic/file/write/csv';
import {
    appendLink,
    bodyAppendLink,
    setFileName,
    handleDownload,
    afterDownload,
} from '@bugofbook/browser/file/write/core';
function createCSVBolb(csvContent: string): Blob {
    return new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
}
async function downloadCSVFile(dataArr: string[][], fileName: 'my-csv') {
    const csvContent = await createCSVString(dataArr);
    const blob = createCSVBolb(csvContent);
    const downloadCSVLink = compose(
        handleDownload,
        bodyAppendLink,
        setFileName(`${fileName}.csv`),
        appendLink
    )(blob);
    afterDownload(downloadCSVLink);
}
export default downloadCSVFile;