/**
 * Created by thuy on 27/01/16.
 */
var request = require("request");
var App = require('./app/models/app');
var url_top_free = "https://itunes.apple.com/fi/rss/topfreeapplications/limit=10/json";
var url_top_paid = "https://itunes.apple.com/fi/rss/toppaidapplications/limit=10/json";

exports.load_top_free = function(callback) {
    request(url_top_free, function (error, response, body) {
        var label = "top_free_apps";
        var json = JSON.parse(body);
        var apps = readJson(json, label);
        callback(apps);
    });
};

exports.load_top_paid = function(callback) {
    request(url_top_paid, function (error, response, body) {
        var label = "top_paid_apps";
        var json = JSON.parse(body);
        var apps = readJson(json, label);
        callback(apps);
    });
};

exports.load_all = function(callback) {
    var all = [];
    request(url_top_free, function (error, response, body) {
        var label = "top_free_apps";
        var json = JSON.parse(body);
        var apps = readJson(json, label);
        all.push.apply(all, apps);

        request(url_top_paid, function (error, response, body) {
            var label = "top_paid_apps";
            var json = JSON.parse(body);
            var apps = readJson(json, label);
            all.push.apply(all, apps);

            callback(all);
        });

    });

}

var readJson = function(json, label) {
    var apps = [];
    var feed = json["feed"],
        entry = feed["entry"];

    entry.forEach(function(app) {
        var thisApp = new App();
        thisApp.labels = [label];
        thisApp.name = app["im:name"]["label"];
        thisApp.url = app["id"]["label"];
        thisApp.image_small = app["im:image"][0]["label"];
        thisApp.image_medium = app["im:image"][1]["label"];
        thisApp.image_large = app["im:image"][2]["label"];
        thisApp.description = app["summary"]["label"];
        thisApp.price = app["im:price"]["attributes"]["amount"];
        thisApp.currency = app["im:price"]["attributes"]["currency"];
        thisApp.developer = app["im:artist"]["label"];
        thisApp.developer_url = app["im:artist"]["attributes"]["href"];
        thisApp.rating = null;
        thisApp.rating_count = null;
        apps.push(thisApp);
    });
    return apps;
}