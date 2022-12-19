import { readText } from '@bugofbook/browser/file/read/core';
import readCSVString from '@bugofbook/isomorphic/file/read/csv';

async function readCSVFile(file: File) {
    const text = await readText(file);
    return readCSVString(text);
}

export default readCSVFile