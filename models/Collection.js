const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    theme: { type: String, required: true },
    image: { type: String },
    items: [{ type: Types.ObjectId, ref: 'Item' }],
    owner: { type: Types.ObjectId, ref: 'User', required: true },
    collectionschema: { type: Object, required: true },
})

module.exports = model('Collections', schema)
