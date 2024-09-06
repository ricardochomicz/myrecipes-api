const mongoose = require('mongoose')

const IngredientsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    image: {
        type: String,
        required: false
    }

})

module.exports = mongoose.model('Ingredients', IngredientsSchema)