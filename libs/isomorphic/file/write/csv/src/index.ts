async function createCSVString(dataArr: string[][]) {
    return dataArr.map((item) => item.join(',')).join('\n');
}
export default createCSVString