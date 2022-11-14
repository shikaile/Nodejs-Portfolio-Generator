const fs = require('fs');

const writeFile = fileContent => {
    return new Promise((resolve, rejects) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
              // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
            if (err) {
                rejects(err);
                        // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
                return;
            }
            resolve({
                ok: true,
                message: 'File Created'
            });
    });
});
};

const copyFile = () => {
    return new Promise((resolve, rejects) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
            if (err) {
                rejects(err);
                        // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
                return;
            }
            resolve({
                ok: true,
                message: 'Style sheet Copied'
            });
    });
});
};

module.exports = {writeFile,copyFile};