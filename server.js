const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importa o CORS
const Car = require('./models/Car');

const app = express();
const PORT = 3001;

// Usa o middleware CORS para permitir requisições da porta 3000
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Endpoint para listar os carros
app.get('/api/cars', async (req, res) => {
  try {
    // Estabelecer conexão com o MongoDB
    await mongoose.connect('mongodb+srv://simaoildefonso:Do0r5rAJCQIW6EcU@cluster0.08ky7.mongodb.net/');
    console.log('Connected to MongoDB to list cars');

    // Buscar os carros na base de dados
    const cars = await Car.find({});

    // Verifica se não há carros
    if (cars.length === 0) {
      return res.status(404).json({ message: 'No cars available' });
    }

    // Define o Content-Type como application/json e envia os carros
    res.setHeader('Content-Type', 'application/json');
    res.json(cars);
  } catch (error) {
    console.error('Erro ao buscar os carros:', error);
    res.status(500).json({ message: 'Erro ao buscar os carros' });
  } finally {
    // Fechar a conexão com o MongoDB
    await mongoose.disconnect();
    console.log('Connection closed after listing cars');
  }
});
  

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
