var cheerio = require('cheerio');
var http = require('http');
var iconv = require('iconv-lite');
var fs = require('fs');

var url = 'http://www.ygdy8.net/html/gndy/dyzz/index.html';

http.get(url, function(sres) {
    var chunks = [];
    sres.on('data', function(chunk) {
          chunks.push(chunk);
        });
    sres.on('end', function() {
          var titles = [];
          var html = iconv.decode(Buffer.concat(chunks), 'gb2312');
          var $ = cheerio.load(html, {decodeEntities: false});
          var writeStream = fs.createWriteStream('output.txt');
          $('.co_content8 .ulink').each(function (idx, element) {
                  var $element = $(element);
                  titles.push({
                     title: $element.text()
                  });
                  writeStream.write($(element).text() + ',  ', 'UTF8'); // 输出流
                });
          console.log(titles);     
        });
});
