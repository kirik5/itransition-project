const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')

const app = express()

app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(express.json())

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/collections', require('./routes/collections.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'frontend', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 80

const start = async () => {
    try {
        await mongoose.connect(config.get('mongoUri'), {})
        app.listen(PORT, () =>
            console.log(`App has been started on ${PORT} port...`)
        )
    } catch (error) {
        console.log('Server Error: ', error.message)
        process.exit(1)
    }
}

start()
