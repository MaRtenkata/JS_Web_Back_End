const  { Schema, model } = require('mongoose');

const scheme = new Schema({
    name: { type: String, required: true },
    description:{ type: String, required: true, maxLength: 500},
    imageUrl: { type: String, required: true, match: /^https?:\/\// },
});


module.exports = model('Accessory', scheme);