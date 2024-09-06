const mongoose = require('mongoose')
const Ingredients = require('../models/Ingredients')

const createIngredients = async (req, res) => {
    try {
        const ingredient = new Ingredients(req.body)
        await ingredient.save();
        res.status(201).json(ingredient)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getIngredients = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Verifica se page e limit são valores válidos
        if (page < 1 || limit < 1) {
            return res.status(400).json({ error: "Page and limit must be positive integers" });
        }

        const ingredients = await Ingredients.find()
            .sort({ name: 1 })  // Ordena por nome 
            .skip(skip)
            .limit(limit);

        const totalIngredients = await Ingredients.countDocuments();

        res.status(200).json({
            data: ingredients,
            totalPages: Math.ceil(totalIngredients / limit),
            currentPage: page,
            totalItems: totalIngredients
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const getIngredientById = async (req, res) => {
    try {
        const { id } = req.params;
        const ingredients = await Ingredients.findById(id)
        if (!ingredients) {
            return res.status(404).json({ message: 'Ingrediente não encontrado.' });
        }
        res.status(200).json(ingredients)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getIngredientsAutocomplete = async (req, res) => {
    try {

        const ingredients = await Ingredients.find();
        res.status(200).json(ingredients);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateIngredients = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const updatedIngredient = await Ingredients.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedIngredient) {
            return res.status(404).json({ message: 'Ingrediente não encontrado' });
        }

        res.status(200).json(updatedIngredient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createIngredients, getIngredients, getIngredientById, getIngredientsAutocomplete, updateIngredients }