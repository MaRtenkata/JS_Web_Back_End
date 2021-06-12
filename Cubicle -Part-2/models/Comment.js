const  { Schema, model } = require('mongoose');

const scheme = new Schema({
    author: {type: String, required: true},
    content: { type: String, required: true, maxLength: 250}
});

module.exports = model('Comment', scheme);