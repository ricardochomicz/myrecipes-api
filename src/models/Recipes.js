const mongoose = require('mongoose')
const Ingredients = require('./Ingredients')

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    descriptions: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false
    },
    time: {
        type: String,
        required: true
    },
    method: [{
        stepNumber: {
            type: Number,  // O número do passo
            required: true
        },
        stepDescription: {
            type: String,  // A descrição do passo
            required: true
        }
    }],
    rating: {
        type: Number,
        required: false
    },
    ingredients: [{
        ingredient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ingredients',
            required: true
        },
        compatibility: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        unity: {
            type: String,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Recipes', RecipeSchema)