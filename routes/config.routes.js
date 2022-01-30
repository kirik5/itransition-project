const { Router } = require('express')
const {
    getUserConfig,
    updateUserConfig,
} = require('../controllers/config.controllers')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.get('/', auth, getUserConfig)

router.patch('/', auth, updateUserConfig)

module.exports = router
