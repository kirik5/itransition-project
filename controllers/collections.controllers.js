const Collection = require('../models/Collection')
const User = require('../models/User')
const Item = require('../models/Item')

module.exports.createCollection = async (req, res) => {
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

module.exports.updateCollection2 = async (req, res) => {
    const { name, description, theme } = req.body
    await Collection.updateOne(
        { _id: req.params.id },
        { name, description, theme, image: req.file ? req.file.path : '' }
    )
    res.json({ message: `Item ${req.params.id} was updated!` })
}

module.exports.createItem = async (req, res) => {
    try {
        const { collectionId, name, tags, ...rest } = req.body
        const newItem = new Item({
            name,
            tags,
            collectionOwner: collectionId,
            additionalFields: { ...rest },
        })
        const savedItem = await newItem.save()
        let request = {
            id: savedItem._id,
            name: savedItem.name,
            tags: savedItem.tags,
        }
        if (savedItem.additionalFields) {
            request = { ...request, ...savedItem.additionalFields }
        }
        res.status(201).json(request)
    } catch (error) {
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте снова',
        })
    }
}

module.exports.deleteItem = async (req, res) => {
    try {
        const item = await Item.findOne({ _id: req.params.id })
        const collection = await Collection.findOne({
            _id: item.collectionOwner,
        })

        if (collection.owner.toString() !== req.user.userId.toString()) {
            throw new Error({ message: 'Вам не пренадлежит данная коллекция' })
        }

        await Item.deleteOne({ _id: req.params.id })
        res.json({ message: `Item ${req.params.id} was deleted!` })
    } catch (error) {
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте снова',
        })
    }
}

module.exports.getCollectionItems = async (req, res) => {
    try {
        const items = await Item.find({ collectionOwner: req.params.id })

        const transformItems = items.map(elem => {
            let result = { id: elem._id, name: elem.name, tags: elem.tags }
            if (elem.additionalFields) {
                result = { ...result, ...elem.additionalFields }
            }
            return result
        })

        res.json(transformItems)
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

module.exports.getCollectionById = async (req, res) => {
    try {
        const collection = await Collection.findOne({ _id: req.params.id })
        const {
            _id,
            name,
            description,
            theme,
            image,
            collectionschema,
            items,
        } = collection
        const collectionFields = {
            id: _id,
            name,
            description,
            theme,
            image,
            collectionschema,
            items,
        }
        res.json(collectionFields)
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

module.exports.updateCollection = async (req, res) => {
    console.log('update collection...')
    console.log('id collection = ', req.params.id)

    // const { name, description, theme } = req.body
    console.log(`req.body = `, req.body)
    console.log(`req.file = `, req.file)
    console.log(`req.filePath = `, req.filePath)

    try {
        // await Collection.update({_id: req.params.id, ...})
        res.json({ message: `Collection ${req.params.id} was updated!` })
    } catch (error) {
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте снова',
        })
    }
}
