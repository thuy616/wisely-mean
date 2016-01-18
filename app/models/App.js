var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppSchema = new Schema({
    name: String,
    labels: [String],
    price: Number,
    currency: String,
    url: String,
    description: String,
    rating: Number,
    rating_count: Number,
    developer: String,
    developer_url: String,
    release_date: Date,
    image_small: String,
    image_medium: String,
    image_large: String,
    screenshots: [String],
    rank: Number
});

module.exports = mongoose.model('App', AppSchema);