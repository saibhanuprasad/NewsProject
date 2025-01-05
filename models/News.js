const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    image: {
        type: String, // This will store the URL of the image
        required: false // Set to true if you want to make it mandatory
    }
}, { timestamps: true });

const Item = mongoose.model('News', newsSchema);

module.exports = Item;