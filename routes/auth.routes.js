const { Router } = require('express')
const { check } = require('express-validator')
const { login, register } = require('../controllers/auth.controllers')
const router = Router()

router.post(
    '/register',
    [
        check('email', 'Некорректная электронная почта!').isEmail(),
        check('password', 'Минимальная длинна пароля - 6 символов!').isLength({
            min: 6,
        }),
    ],
    register
)

router.post('/login', [
    check('email', 'Input correct email!').normalizeEmail().isEmail(),
    check('password', 'Input password').exists(),
    login,
])

module.exports = router
