const { Router } = require('express')
const CollectionTypes = require('../models/CollectionType')
const auth = require('../middleware/auth.middleware')
const upload = require('../middleware/upload.middleware')
const {
    createCollection,
    getAllCollections,
    getMyCollections,
    deleteCollection,
    getCollectionById,
    createItem,
    getCollectionItems,
} = require('../controllers/collections.controllers')
const deleteImg = require('../middleware/deleteImg.middleware')

const router = Router()

// router.post('/update', async (req, res) => {
//     console.log('update collection...')
//     console.log(`req.body = `, req.body)
// })

router.post('/create', auth, upload.single('image'), createCollection)

router.post('/items/create', auth, createItem)

router.get('/items/:id', getCollectionItems)

router.get('/', getAllCollections)

router.get('/my', auth, getMyCollections)

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

router.get('/:id', getCollectionById)

router.delete('/:id', auth, deleteImg, deleteCollection)

// router.get('/:id', async (req, res) => {
//     try {
//         const collections = await Collection.findById(req.params.id)
//         res.json(collections)
//     } catch (error) {
//         res.status(500).json({
//             message: 'Что-то пошло не так, попробуйте снова',
//         })
//     }
// })

module.exports = router
