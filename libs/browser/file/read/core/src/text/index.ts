async function readText(file: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = (event) => {
                if (event?.target?.result) {
                    if (typeof event.target.result === 'string') {
                        resolve(event.target.result);
                    } else {
                        throw new Error('data is a ArrayBuffer');
                    }
                } else {
                    throw new Error('no data in file');
                }
            };
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
}
export default readText;