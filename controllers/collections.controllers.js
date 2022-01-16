const Collection = require('../models/Collection')
const User = require('../models/User')

module.exports.create = async (req, res) => {
    try {
        const { name, description, theme, collectionschema } = req.body

        const collection = new Collection({
            name,
            description,
            theme,
            image: req.file ? req.file.path : '',
            owner: req.user.userId,
            collectionschema: JSON.parse(collectionschema),
        })
        await collection.save()
        res.status(201).json({ message: 'Коллекция создана!' })
    } catch (error) {
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте снова',
        })
    }
}

module.exports.getMyCollections = async (req, res) => {
    try {
        const collections = await Collection.find({
            owner: req.user.userId,
        })

        let collectionsFields
        if (collections) {
            collectionsFields = await Promise.all(
                collections.map(async coll => {
                    const owner = await User.findOne({ _id: coll.owner })
                    return {
                        id: coll._id,
                        name: coll.name,
                        description: coll.description.slice(0, 20) + '...',
                        theme: coll.theme,
                        ownerEmail: owner.email,
                        image: coll.image,
                    }
                })
            )
        }
        res.json(collectionsFields)
    } catch (error) {
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте снова',
        })
    }
}

module.exports.getAllCollections = async (req, res) => {
    try {
        const collections = await Collection.find({})
        const collectionsFields = await Promise.all(
            collections.map(async coll => {
                const owner = await User.findOne({ _id: coll.owner })
                return {
                    id: coll._id,
                    name: coll.name,
                    description: coll.description.slice(0, 20) + '...',
                    theme: coll.theme,
                    ownerEmail: owner.email,
                    image: coll.image,
                }
            })
        )
        res.json(collectionsFields)
    } catch (error) {
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте снова',
        })
    }
}

module.exports.deleteCollection = async (req, res) => {
    try {
        await Collection.deleteOne({ _id: req.params.id })
        res.json({ message: `Collection ${req.params.id} was deleted!` })
    } catch (error) {
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте снова',
        })
    }
}
