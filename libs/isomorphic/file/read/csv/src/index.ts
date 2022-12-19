async function readCSVString(str: string) {
    return str.split('\n').map(item => item.split(','));
}
export default readCSVString