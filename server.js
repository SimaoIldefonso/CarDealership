const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Car = require('./models/Car');

const app = express();
const PORT = 3001;

// Configurações de CORS
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Conectar ao MongoDB apenas uma vez ao iniciar o servidor
mongoose.connect('mongodb+srv://simaoildefonso:Do0r5rAJCQIW6EcU@cluster0.08ky7.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Endpoint para listar os carros
app.get('/api/cars', async (req, res) => {
  try {
    const cars = await Car.find({});

    // Verifica se não há carros
    if (cars.length === 0) {
      return res.status(404).json({ message: 'No cars available' });
    }

    // Retorna os carros
    res.setHeader('Content-Type', 'application/json');
    res.json(cars);
  } catch (error) {
    console.error('Erro ao buscar os carros:', error);
    res.status(500).json({ message: 'Erro ao buscar os carros' });
  }
});

// Endpoint para buscar os detalhes de um carro específico
app.get('/api/cars/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json(car);
  } catch (error) {
    console.error('Erro ao buscar o carro:', error);
    res.status(500).json({ message: 'Erro ao buscar o carro' });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
