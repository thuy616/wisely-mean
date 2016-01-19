var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppSchema = new Schema({
    name: String,
    labels: [String], // top_paid_apps, top_free_apps, top_grossing_apps, top_paid_games, top_free_games
    price: Number,
    currency: String,
    url: String,
    description: String,
    rating: Number,
    rating_count: Number,
    developer: String,
    developer_url: String,
    release_date: Date,
    version: String,
    image_small: String,
    image_medium: String,
    image_large: String,
    screenshots: [String],
    store: String, // Google, Apple
    genres: [String],
    updated: {type: Date, defautl: Date.now}
});

module.exports = mongoose.model('App', AppSchema);