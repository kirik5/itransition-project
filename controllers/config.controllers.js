const Config = require('../models/Config')

module.exports.getUserConfig = async (req, res) => {
    try {
        const config = await Config.findOne({ owner: req.user.userId })
        res.json(config)
    } catch (error) {
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте снова',
        })
    }
}

module.exports.updateUserConfig = async (req, res) => {
    try {
        await Config.updateOne({ owner: req.user.userId }, { ...req.body })
        res.json({ message: 'ok' })
    } catch (error) {
        res.status(500).json({
            message: 'Что-то пошло не так, попробуйте снова',
        })
    }
}
