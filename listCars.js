const mongoose = require('mongoose');
const Car = require('./models/Car'); // Importar o modelo Car

async function listCars() {
  try {
    // Conectar ao MongoDB
    await mongoose.connect('mongodb+srv://simaoildefonso:Do0r5rAJCQIW6EcU@cluster0.08ky7.mongodb.net/');
    console.log('Connected to MongoDB');

    // Listar os carros
    const cars = await Car.find({});
    console.log('Carros na base de dados:');
    console.log(cars);
  } catch (err) {
    console.error('Erro ao buscar os carros:', err);
  } finally {
    // Fechar a conexão
    await mongoose.disconnect();
    console.log('Connection closed');
  }
}

listCars();
