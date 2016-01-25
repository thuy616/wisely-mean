/**
 * Created by thuy on 25/01/16.
 */
var request = require("request");
var cheerio = require("cheerio");
var url_top_free = "https://play.google.com/store/apps/collection/topselling_free"
var url_top_paid = "https://play.google.com/store/apps/collection/topselling_paid"


request(url_top_free, function (error, response, body) {
    if (!error) {
        var $ = cheerio.load(body),
            apps = $(".card.apps").html();
        console.log("Html content: ");
        console.log(apps);
    } else {
        console.log("We’ve encountered an error: " + error);
    }
});


request(url_top_paid, function (error, response, body) {
    if (!error) {
        var $ = cheerio.load(body),
            apps = $(".card.apps").html();
        console.log("Html content: ");
        console.log(apps);
    } else {
        console.log("We’ve encountered an error: " + error);
    }
});

