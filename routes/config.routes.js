const { Router } = require('express')
const { getUserConfig } = require('../controllers/config.controllers')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.get('/', auth, getUserConfig)

module.exports = router
