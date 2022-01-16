const { Router } = require('express')
const Collection = require('../models/Collection')
const CollectionTypes = require('../models/CollectionTypes')
const auth = require('../middleware/auth.middleware')
const upload = require('../middleware/upload.middleware')
const {
    create,
    getAllCollections,
    getMyCollections,
    deleteCollection,
} = require('../controllers/collections.controllers')
const deleteImg = require('../middleware/deleteImg.middleware')

const router = Router()

router.post('/create', auth, upload.single('image'), create)

router.get('/', getAllCollections)

router.get('/my', auth, getMyCollections)

router.delete('/:id', auth, deleteImg, deleteCollection)

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
        const collections = await Collection.findById(req.params.id)
        res.json(collections)
    } catch (error) {
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте снова',
        })
    }
})

module.exports = router
