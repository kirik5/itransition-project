const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    name: { type: String, required: true },
    tags: { type: String, required: true },
    collectionOwner: {
        type: Types.ObjectId,
        ref: 'Collection',
        required: true,
    },
    additionalFields: { type: Object },
})

module.exports = model('Item', schema)
