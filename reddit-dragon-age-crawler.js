var request = require('request');
var cheerio = require('cheerio');
//var URL = require('url-parse');
var fs = require('fs'); //node way of implementing FILE I/O 
//g simple wrappers around standard POSIX functions. Node File System (fs)
var subbredditLink = "http://reddit.com/r/dragonage";

request (subbredditLink, function(err, response, body){
    //200 is okay = the HTTP
    if (!err && response.statusCode == 200) {
        var $ = cheerio.load(body);
       $('div#siteTable > div.link').each(function(index){
          var postTitle = $(this).find('p.title > a.title').text().trim();
          var ratings =  $(this).find('div.score.unvoted').text().trim();
          var user = $(this).find('a.author').text().trim();
          console.log("Title: " + postTitle);
          console.log("Score: " + ratings);
          console.log("User: " + user);
          fs.appendFileSync('reddit.txt', postTitle + '\n' + ratings + '\n' + user + '\n');

        });
    }
});