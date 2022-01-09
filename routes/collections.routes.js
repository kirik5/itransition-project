const { Router } = require('express')
const Collection = require('../models/Collection')
const CollectionTypes = require('../models/CollectionTypes')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/create', auth, async (req, res) => {
    try {
        const { name, description, theme, image, collectionschema } = req.body

        const collection = new Collection({
            name,
            description,
            theme,
            image,
            owner: req.user.userId,
            collectionschema,
        })
        await collection.save()
        res.status(201).json({ message: 'Коллекция создана!' })
    } catch (error) {
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте снова',
        })
    }
})

router.get('/', async (req, res) => {
    try {
        const collections = await Collections.find({})
        res.json(collections)
    } catch (error) {
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте снова',
        })
    }
})

router.get('/my', auth, async (req, res) => {
    try {
        const collections = await Collections.find({ owner: req.user.userId })
        res.json(collections)
    } catch (error) {
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте снова',
        })
    }
})

router.get('/types', async (req, res) => {
    try {
        const collectionTypes = await CollectionTypes.find({})
        res.json(collectionTypes)
    } catch (error) {
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте снова',
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const collections = await Collections.findById(req.params.id)
        res.json(collections)
    } catch (error) {
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте снова',
        })
    }
})

module.exports = router
