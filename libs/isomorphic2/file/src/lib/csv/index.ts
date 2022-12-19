export async function createCSVString(dataArr: string[][]) {
    return dataArr.map(item => item.join(',')).join('\n');
}

export async function readCSVString(str: string) {
    return str.split('\n').map(item => item.split(','));
}