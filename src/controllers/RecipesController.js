const mongoose = require('mongoose')
const Recipes = require('../models/Recipes')

const createRecipes = async (req, res) => {
    try {
        const ingredient = new Recipes(req.body)
        await ingredient.save();
        res.status(201).json(ingredient)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getRecipes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const recipes = await Recipes.find().populate('ingredients.ingredient').skip(skip).limit(limit);
        const totalRecipes = await Recipes.countDocuments();

        res.status(200).json({
            data: recipes,
            totalPages: Math.ceil(totalRecipes / limit),
            currentPage: page
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateRecipes = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const updatedRecipes = await Recipes.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedRecipes) {
            return res.status(404).json({ message: 'Receita não encontrada' });
        }

        res.status(200).json(updatedRecipes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateRating = async (req, res) => {
    try {
        const recipeId = req.params.id;
        const newRating = req.body.rating;

        const updatedRecipe = await Recipes.findByIdAndUpdate(
            recipeId,
            { rating: newRating },
            { new: true }
        );

        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar o rating', error });
    }
}


const getRecipeById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'ID não fornecido.' });
        }
        const recipes = await Recipes.findById(id).populate('ingredients.ingredient')
        if (!recipes) {
            return res.status(404).json({ message: 'Receita não encontrada.' });
        }
        res.status(200).json(recipes)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const searchRecipesByIngredients = async (req, res) => {
    try {
        const { ingredients } = req.body; // Recebe os IDs dos ingredientes
        const recipes = await Recipes.find({
            'ingredients.ingredient': { $all: ingredients },
        });

        console.log('INgredients:', req.body)
        console.log('Recipes:', recipes)

        // Filtra receitas que tenham 100% de compatibilidade
        const compatibleRecipes = recipes.filter((recipe) => {
            return recipe.ingredients.every((ing) =>
                ingredients.includes(ing.ingredient.toString())
            );
        });

        res.status(200).json(compatibleRecipes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const getRecipesByIngredients = async (req, res) => {
    try {
        const { ingredients } = req.body;  // Lista de ObjectId de ingredientes fornecida pelo usuário

        // Verifica se os ingredientes foram enviados corretamente
        if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
            return res.status(400).json({ message: 'Ingredientes inválidos ou não fornecidos.' });
        }

        // Converte IDs dos ingredientes para strings
        const userIngredients = ingredients.map(ing => ing.toString());

        console.log('Ingredientes após filtragem:', userIngredients);

        // Busca as receitas que contenham pelo menos um dos ingredientes fornecidos
        const recipes = await Recipes.find({
            'ingredients.ingredient': { $in: userIngredients }
        }).populate('ingredients.ingredient');

        console.log('Receitas encontradas:', recipes);

        // Mapea as receitas para calcular a compatibilidade
        const matchedRecipes = recipes.map(recipe => {
            const requiredIngredients = recipe.ingredients.map(ing => ing.ingredient._id.toString());
            const missingIngredients = requiredIngredients.filter(ing => !userIngredients.includes(ing));
            const compatibility = ((requiredIngredients.length - missingIngredients.length) / requiredIngredients.length) * 100;

            return {
                ...recipe._doc,
                compatibility,
                missingIngredients
            };
        }).filter(recipe => recipe.compatibility === 100);  // Filtra apenas receitas 100% compatíveis

        // Retorna as receitas encontradas com sucesso
        res.status(200).json(matchedRecipes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};







module.exports = { createRecipes, getRecipes, updateRecipes, getRecipeById, updateRating, searchRecipesByIngredients, getRecipesByIngredients }