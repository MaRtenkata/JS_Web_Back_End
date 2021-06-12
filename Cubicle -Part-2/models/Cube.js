const  { Schema, model } = require('mongoose');
const Comment = require('./Comment');


const scheme = new Schema({
    name: { type: String, required: true },
    description:{ type: String, required: true, maxLength: 500},
    imageUrl: { type: String, required: true, match: /^https?:\/\// },
    difficulty: { type: Number, required: true, min: 1, max: 6},
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
    accessory: [{ type: Schema.Types.ObjectId, ref: 'Accessory'}]  
});


module.exports = model('Cube', scheme);