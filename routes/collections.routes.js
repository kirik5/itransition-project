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
    deleteItem,
    updateCollection2,
} = require('../controllers/collections.controllers')
const deleteImg = require('../middleware/deleteImg.middleware')

const router = Router()

router.patch('/update/:id', auth, upload.single('image'), updateCollection2)

router.post('/create', auth, upload.single('image'), createCollection)

router.post('/items/create', auth, createItem)

router.delete('/items/delete/:id', auth, deleteItem)

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
