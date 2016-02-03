/**
 * Created by thuy on 25/01/16.
 */

var App = require('./app/models/app');
var request = require("request");
var cheerio = require("cheerio");
//exports.results = [];

var url_top_paid = "https://play.google.com/store/apps/collection/topselling_paid"
var url_top_free = "https://play.google.com/store/apps/collection/topselling_free"


exports.scrape_top_free = function(callback) {
    request(url_top_free, function (error, response, body) {
        console.log("scraping free apps started...");

        if (error) {
            console.log("We’ve encountered an error: " + error);
            return;
        }

        var label = "top_free_apps"
        callback(readData(body, label));

    });
};

exports.scrape_top_paid = function(callback) {
    request(url_top_paid, function (error, response, body) {
        console.log("scraping paid apps started...");

        if (error) {
            console.log("We’ve encountered an error: " + error);
            return;
        }

        var label = "top_paid_apps"
       callback(readData(body, label));

    });

};


var readData = function(body, label) {
    var $ = cheerio.load(body),
        apps = $("div.card-content");
    var results = [];
    for (var i = 0; i < 24; i++) {

        var app = apps.get(i);
        var cover_img = $(app).find(".cover-image");
        var thisApp = new App();
        thisApp.labels = [];
        thisApp.genres = [];

        thisApp.labels.push(label);
        thisApp.image_large = $(cover_img).attr("data-cover-large");
        thisApp.image_small = $(cover_img).attr("data-cover-small");
        thisApp.image_medium = thisApp.img_large;


        var details = $(app).children(".details");
        thisApp.name = $(details).find(".title").attr("title");
        thisApp.url = "https://play.google.com" + $(details).find(".card-click-target").attr("href");
        thisApp.developer = $(details).find(".subtitle").attr("title");
        thisApp.developer_url = "https://play.google.com" + $(details).find(".subtitle").attr("href");
        thisApp.description = $(details).find(".description").text();
        // get only numbers and decimals of current rating
        thisApp.rating = $(app).children(".reason-set").find(".current-rating").attr("style").replace(/[^0-9.]/g, '');
        thisApp.rating_count = null;
        thisApp.price = "0";
        thisApp.currency = "";
        var display_price = $(app).children(".reason-set").find(".display-price");

        if (display_price.text()) {
            thisApp.price = display_price.text();

            console.log("app.price: " + thisApp.price);
        }
        results.push(thisApp);
    }
    return results;
}