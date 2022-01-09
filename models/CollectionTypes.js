const { Schema, model } = require('mongoose')

const schema = new Schema({
    type: { type: String, required: true },
})

module.exports = model('collectiontypes', schema)
