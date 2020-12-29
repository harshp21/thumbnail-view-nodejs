const fs = require('fs');
const http = require('http');
const path = require('path');

const requiredPath = 'D:\\workspace';
const readDirOptions = { encoding: 'utf-8', withFileTypes: true };

let domContent = '';
const imageExtension = ['.png', '.jpg'];
const docExtension = ['.doc', '.docx'];
const imageThumbnail = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_OSrSvfJRvgue3poIyvx7iORZyMULm5uoZA&usqp=CAU';
const docThumbnail = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAD8CAMAAAAFbRsXAAAAZlBMVEU5gPv///+ewv8fU7FTj/syffsue/skd/t3pPzm7v50ovzy9v/U4f4pefuXtvxflfy5z/2kyP8oWbSWvf8jWr3c6P6sxv3X5f6cvP12o/ywyf3j7f+awf9VkfwtYMAnV7IuZcdNi/vEUSy1AAACuUlEQVR4nO3b63ISQRRF4RZhVBSJSYRcNJH3f0nNHZjb6UpNu3ez1ht8v+bUrp40T6ot5rcf4iVdSJr/+lkJZHYRl2hDMiTikLhEHRKWyEOiEn1IUGIAiUkcICGJBSQi8YAEJCaQcYkLZFRiAxmT+EBGJEaQYYkTZFBiBRmSeEEGJGaQfokbpFdiB+mT+EFmF9tKIN0SR0inxBLSJfGEdEhMIW2JK6QlsYUcS3whRxJjyKHEGXIgsYbsS7whexJzyJvEHfIqsYe8SPwhz5IKIE+SGiCPkiogDxJlyO8f4Wa3ypB0d38e7P5OGpIuP0Y714bEJeqQsEQeEpXoQ4ISA0hM4gAJSSwgEYkHJCAxgYxLXCCjEhvImMQHMiIxggxLnCCDEivIkMQLMiAxg/RL3CC9EjtIn8QP0iMxhHRLHCGdEktIl8QT0iExhbQlrpCWxBZyLPGFHEmMIYcSZ8iBxBqyL/GG7EnMIW8Sd8irxB7yIvGHPEsqgDxJaoA8SqqAPEjqgPyTVAJJl7VA0p9aIHMgYmVDFk2hFtNCFsvvhVrmSXIhq7PWP0ETdbYCAgQIECBAgEwNaa6234q0vWomhaTmU6HyHCd8xqsGRC0gagFRC4ha+btWsaaFLNafC7Vm1wICBAgQIECAhCGbL4XaTAtJq1K7Vp7jhM941YCoBUQtIGoBUeuEd63rZZGu2bWAAAECBAgQIOGam6+Fupn4vVYtj/xlA6IWELWAqAVErROGlByrMsqG7NbvajcNo/wZn3nT6kI2QIAAAQLkv0Ay38pMBkm7+buS+bLXc2upBkQtIGoBUQuIWkDUAqIWELWAqAVELSBqAVELiFpA1AKiFhC1gKgFRC0gagFRC4haQNQCohYQtYCoBUQtIGoBUQuIWkDUAqIWELWAqAVELSBqAVELiFpA1KoH8hf1znhNPIvNYAAAAABJRU5ErkJggg==';
const folderThumbnail = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBNOEX6BChcZPODKomaOaKPEX7ifOTKGBuAA&usqp=CAU';

const cardTitle = 'width:100%;text-align:center';
const cardThumbnailImg = 'width:100%;height:90%';
const card = 'width:150px;height:200px;display: inline-block;float: left;margin: 20px;';

function createDomForFolder(element) {
    return `<div style="${card}">
                <img style="${cardThumbnailImg}" src="${folderThumbnail}">
                <div style="${cardTitle}">${element.name}</div>
            </div>`;
}

function createDomForFiles(element) {
    let thumbnail = '';
    let extension = path.extname(element.name);
    if (imageExtension.includes(extension)) {
        thumbnail = imageThumbnail;
    } else if (docExtension.includes(extension)) {
        thumbnail = docThumbnail;
    }
    return `<div style="${card}">
                <img style="${cardThumbnailImg}" src="${thumbnail}">
                <div style="${cardTitle}">${element.name}</div>
            </div>`;
}

fs.readdir(requiredPath, readDirOptions, function (err, data) {
    if (err) throw err;
    data.forEach(element => {
        if (element.isDirectory())
            domContent += createDomForFolder(element);

        else if (element.isFile())
            domContent += createDomForFiles(element);
    });
})

http.createServer(function (req, res) {

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(domContent);
    res.end();
}).listen(8080);

