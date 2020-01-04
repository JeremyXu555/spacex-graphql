const imageUpload = (imageStatus: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        console.log(`Current status: ${imageStatus}`);
        reject('something wrong');
        resolve('called when using then');
// either resolve or reject will be called, they won't be called at the same time
// Promise either completed or failed
    });
}

imageUpload('complete')
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error)
    });

import fs = require('fs');
function readFileAsync(filename: string): Promise<any> {
// fs.readFile takes a callback as a parameter, and we can wrap it using Promise
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}
