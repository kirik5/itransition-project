const Collection = require('../models/Collection')
const fs = require('fs')
const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink)

module.exports = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const collection = await Collection.findOne({ _id: req.params.id })
        if (collection.image) {
            await unlinkAsync(collection.image)
        }
        next()
    } catch (error) {
        res.status(500).json({ message: 'Что-то пошло не так..(' })
    }
}
