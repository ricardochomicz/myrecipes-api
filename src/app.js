const express = require('express')
const cors = require('cors')
const connectDB = require('./config/database')
const ingredientsRoutes = require('./routes/ingredientsRoutes')
const recipesRoutes = require('./routes/recipesRoutes')

require('dotenv').config()

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/ingredients', ingredientsRoutes)
app.use('/api/recipes', recipesRoutes)

module.exports = app


