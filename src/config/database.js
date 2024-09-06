const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });
        console.log('Banco de dados conectado!')
    } catch (error) {
        console.log('Erro ao conectar no banco', error)
        process.exit(1)
    }
}

module.exports = connectDB;