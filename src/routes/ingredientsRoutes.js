const express = require('express')
const router = express.Router()

const { createIngredients, getIngredients, getIngredientById, getIngredientsAutocomplete, updateIngredients } = require('../controllers/IngredientsController')

router.post('/', createIngredients)
router.get('/', getIngredients)
router.get('/autocomplete', getIngredientsAutocomplete)
router.get('/:id', getIngredientById)
router.put('/:id', updateIngredients);

module.exports = router