// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var url = require('url');

var request = require("request");
var cheerio = require("cheerio");


// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

var port     = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test'); // connect to our database
var Bear     = require('./app/models/bear');
var App = require('./app/models/app');



// ROUTES FOR OUR API
// =============================================================================

// create our backend router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')

    // create a bear (accessed at POST http://localhost:8080/bears)
    .post(function(req, res) {

        var bear = new Bear();		// create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)
        bear.specie = req.body.specie;

        console.log("name: " + req.body.name);
        console.log("specie: " + req.body.specie);

        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });


    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    })

    .delete(function(req, res){
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;

        Bear.remove({
            _id: query.id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')

    // get the bear with that id
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    })

    // update the bear with this id
    .put(function(req, res) {

        Bear.findById(req.params.bear_id, function(err, bear) {

            if (err)
                res.send(err);

            bear.name = req.body.name;
            bear.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Bear updated!' });
            });

        });
    })

    // delete the bear with this id
    .delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// on routes that end in /api/android/apps
router.route('/apps')

    .get(function(req, res) {

        //App.find(function(err, apps) {
        //    if (err)
        //        res.send(err);
        //
        //    res.json(apps);
        //});

        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;

        var filter = query.filter

        console.log ("filter: " + filter);
        if (filter == "all" || !filter) {
            // ?filter=all
            App.find(function(err, apps) {
                if (err)
                    res.send(err);

                res.json(apps);
            });
        } else {
            // e.g.: ?filter=top_paid_apps
            App.find({'labels' : filter}, function(err, apps) {
                if (err)
                    res.send(err);

                res.json(apps);
            });
        }
    })

    .post(function(req, res){
        // find app with the same google id (not the default mongo _id)
        App.findOne({'name': req.body.name }, function(err, app) {
            if (err) res.send(err);

            if (!app) {
                app = new App();
                app.genres = [];
                app.labels = [];
            }
            app.name = req.body.name;
            //app.id = req.body.id;
            app.url = req.body.url;
            app.image_small = req.body.image;
            app.image_medium = req.body.image; //TODO
            app.image_large = req.body.image; //TODO

            app.labels.push(req.body.label);
            app.price = req.body.price;
            app.currency = req.body.currency;

            app.description = req.body.description;
            app.rating = req.body.rating;
            app.rating_count = req.body.rating_count;
            app.developer = req.body.developer;
            app.developer_url = req.body.developer_url;

            console.log("app: ");
            console.log(app);
            // if not exist, create a new App object

            // save
            app.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'App created!' });
            });
        });
        //var app;


    })

    // simply clean up all db before adding new results
    // TODO: only update entries
    .delete(function(req, res) {
        App.remove(function(err, apps) {
            if (err)
                res.send(err);

            res.json({ message: 'All apps Successfully deleted' });
        });
    });

router.route("/apps/android")
    .post(function(req, res) {

        console.log("scraping triggered");
        var scraper = require('./playstore_scraper');
        scraper.scrape_top_free(addOrUpdateApps);
        scraper.scrape_top_paid(addOrUpdateApps)
        res.json({message: "Scraping done!"});

    })
    .get(function(req, res) {

        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;

        var filter = query.filter

        if (filter == "all" || !filter) {
            // ?filter=all
            App.find(function(err, apps) {
                if (err)
                    res.send(err);

                res.json(apps);
            });
        } else {
            // e.g.: ?filter=top_paid_apps
            App.find({'labels' : filter}, function(err, apps) {
                if (err)
                    res.send(err);

                res.json(apps);
            });
        }
    })

    .delete(function(req, res) {
        App.remove(function(err, apps) {
            if (err)
                res.send(err);

            res.json({ message: 'All apps Successfully deleted' });
        });
    });

router.route("/apps/ios")
    .get(function(req, res) {
        var helper = require("./apple_connector");

        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;

        var filter = query.filter

        if (filter === "all" || !filter) {
            // ?filter=all

            helper.load_all(function(apps){
                console.log("free apps: " + apps.length);
                res.json(apps);
            });

        } else if (filter === "top_paid_apps") {
            helper.load_top_paid(function(apps){
                // do something
                res.json(apps);
            });
        } else if (filter === "top_free_apps") {
            helper.load_top_free(function(apps){
                // do something
                res.json(apps);
            });
        }




    });

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

//// FRONTEND ROUTER
//var front_router = express.Router();
//
//// test route to make sure everything is working (accessed at GET http://localhost:8080/front)
//front_router.get('/', function(req, res) {
//    res.json({ message: 'Welcome to our frontend page!' });
//});
//
//app.use('/public', front_router);
//app.use(express.static('public'));

// front-end routes
app.get('*', function(req, res) {
    console.log("load our public//index.html file");
    res.sendfile('./public/index.html'); // load our public/index.html file
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

var addOrUpdateApps = function(apps) {
    apps.forEach(function(thisApp) {
        // find app with the same google id (not the default mongo _id)
        App.findOne({'name': thisApp.name}, function (err, app) {
            if (err) {
                // resend err
            }
            if (!app) {
                app = thisApp;
            } else {
                app.labels.push(thisApp.labels);
            }
            // save
            app.save(function (err) {
                // resend error
            });
            console.log("app \""+ thisApp.name + " saved");
        });
    });
}