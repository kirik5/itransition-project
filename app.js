const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 5000

const start = async () => {
    try {
        await mongoose.connect(config.get('mongoUri'), {})
        app.listen(PORT, () => console.log(`App has been started on ${PORT} port...`))
    } catch (error) {
        console.log('Server Error', error.message)
        process.exit(1)
    }
}

start()

