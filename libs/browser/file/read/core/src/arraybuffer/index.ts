async function readArrayBuffer(file: Blob): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = (event) => {
                if (event?.target?.result) {
                    if (event.target.result instanceof ArrayBuffer) {
                        resolve(event.target.result);
                    } else {
                        throw new Error('data is a string');
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
export default readArrayBuffer;