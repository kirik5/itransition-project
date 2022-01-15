const { validationResult } = require('express-validator')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

module.exports.login = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные для входа!',
            })
        }

        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res
                .status(400)
                .json({ message: 'Некорректные данные для входа!' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res
                .status(400)
                .json({ message: 'Некорректные данные для входа!' })
        }

        const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
            expiresIn: '1h',
        })

        res.json({ token, userId: user.id })
    } catch (error) {
        res.status(500).json({ message: 'Что-то пошло не так!' })
    }
}

module.exports.register = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные регистрационные данные!',
            })
        }

        const { email, password } = req.body

        const candidate = await User.findOne({ email })
        if (candidate) {
            return res.status(400).json({
                message: 'Такой пользователь уже зарегистрирован!',
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({ email, password: hashedPassword })
        await user.save()
        res.status(201).json({ message: 'Пользователь зарегистрирован!' })
    } catch (error) {
        res.status(500).json({ message: 'Что-то пошло не так!' })
    }
}
