/**
煎蛋nodejs爬虫
**/
'use strict'

const superagent = require('superagent');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const dir = './images';

superagent.get('http://jandan.net/ooxx').end((err, docs) => {
    const $ = cheerio.load(docs.text);
    const imgArr = [];
    $('.commentlist li .text p img').each((idx, element) => {
        const $el = $(element);
        imgArr.push($el.attr('src'));
    })
    for (var i = 0; i < imgArr.length; i++) {
        downloadImg(imgArr[i], imgArr[i].split('/')[4]);
    }
})

var downloadImg = (url, filename) => {
    request.head(url, (err, res, body) => {
        request(url).pipe(fs.createWriteStream(dir + '/' + filename));
    })
}
