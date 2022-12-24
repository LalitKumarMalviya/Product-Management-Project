const express = require('express')
const app = express()
const mongoose = require('mongoose')
const route = require('./routes/route')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.set('strictQuery', false)

mongoose.connect('mongodb+srv://Lalit:g1b1eD2zYIwUl67Z@cluster0.xmtgwuj.mongodb.net/Product-Management', {
    useNewUrlParser: true,
})
    .then(() => console.log('MongoDb is Connected'))
    .catch((err) => console.log(err))

app.use('', route)

app.listen(process.env.PORT || 3000, function() {
    console.log('Express App running on PORT', process.env.PORT || 3000)
})


