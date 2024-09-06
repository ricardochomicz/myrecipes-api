const app = require('./src/app')

const PORT = process.env.port || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})