const express = require('express')
const router = express.Router()

const { createRecipes, getRecipes, updateRecipes, getRecipeById, updateRating, searchRecipesByIngredients, getRecipesByIngredients } = require('../controllers/RecipesController')

router.post('/', createRecipes)
router.get('/', getRecipes)
router.get('/:id', getRecipeById)
router.put('/:id', updateRecipes);
router.put('/:id/rating', updateRating)

router.post('/search-by-ingredients', getRecipesByIngredients);

module.exports = router