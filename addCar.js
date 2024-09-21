const mongoose = require('mongoose');
const Car = require('./models/Car'); // Importar o modelo Car

async function addCar() {
  try {
    // Conectar ao MongoDB
    await mongoose.connect('mongodb+srv://simaoildefonso:Do0r5rAJCQIW6EcU@cluster0.08ky7.mongodb.net/');
    console.log('Connected to MongoDB');

    // Novo carro a ser adicionado
    const newCar = new Car({
      brand: 'Audi',
      model: 'RS6 Avant',
      year: 2022,
      price: 120000,
      mileage: 10000,
      fuel: 'Gasoline',
      power: 600,
      engineSize: 4000,
      gearbox: 'Automatic',
      doors: 5,
      color: 'Black',
      images: ['https://media.discordapp.net/attachments/1286773192219689052/1286773359710834769/AudiRS6.png?ex=66ef2094&is=66edcf14&hm=0b7020eeeaf758f355eab0ccfb158aaa422336296ea16abb7b9584e60f1a68bf&=&format=webp&quality=lossless&width=525&height=350']
    });

    // Salvar o carro no MongoDB
    await newCar.save();
    console.log('Carro adicionado com sucesso');
  } catch (err) {
    console.error('Erro ao adicionar o carro:', err);
  } finally {
    // Fechar a conexão
    await mongoose.disconnect();
    console.log('Connection closed');
  }
}

// Chamar a função para adicionar o carro
addCar();
