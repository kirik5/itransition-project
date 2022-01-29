const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    mode: { type: String, required: true },
    translations: { type: Object },
    owner: { type: Types.ObjectId, ref: 'User', required: true },
})

module.exports = model('Config', schema)
