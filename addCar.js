const mongoose = require('mongoose');
const Car = require('./models/Car'); // Importar o modelo Car

async function addCars() {
  try {
    // Conectar ao MongoDB
    await mongoose.connect('mongodb+srv://simaoildefonso:Do0r5rAJCQIW6EcU@cluster0.08ky7.mongodb.net/');
    console.log('Connected to MongoDB');

    // Lista de novos carros a serem adicionados
    const cars = [
      {
        brand: 'Mercedes-Benz',
        model: 'S-Class 500',
        year: 2024,
        price: 130000,
        mileage: 1300,
        fuel: 'Gasoline',
        power: 429,
        engineSize: 2999,
        gearbox: 'Automatic',
        doors: 5,
        color: 'Black',
        images: [
          'https://vehicle-images.dealerinspire.com/d401-110009017/W1K6G6DB0RA285543/774b880bba7742938a2a13e5e2b41e74.jpg',
          'https://vehicle-images.dealerinspire.com/b524-110009017/W1K6G6DB0RA285543/9616012d53a639baa8806af555cf96b0.jpg',
          'https://vehicle-images.dealerinspire.com/c3e3-110009017/W1K6G6DB0RA285543/de2173ad54265a12086869368cd7b68a.jpg',
          'https://vehicle-images.dealerinspire.com/a16d-110009017/W1K6G6DB0RA285543/6b2128adaafcb5579b441410ca4cb226.jpg',
          'https://vehicle-images.dealerinspire.com/4351-110009017/W1K6G6DB0RA285543/6d278fad95a12dc7095f35d7c281b9d2.jpg'
        ]
      },
      {
        brand: 'Bentley',
        model: 'Continental GT',
        year: 2023,
        price: 340000,
        mileage: 5000,
        fuel: 'Gasoline',
        power: 550,
        engineSize: 3996,
        gearbox: 'Automatic',
        doors: 3,
        color: 'Black',
        images: [
          'https://ireland.apollo.olxcdn.com/v1/files/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmbiI6InQ1a3NyeXAwZG0zazItU1REVlRMUFQiLCJ3IjpbeyJmbiI6IjZtZ2p3bHA3a2dkYjItU1REVlRMUFQiLCJzIjoiMTYiLCJhIjoiMCIsInAiOiIxMCwtMTAifV19.GXx-7BmMPVcEb3m7DPQEdXlu4ry1l1tCdKqQE-9_uqo/image;s=1440x0;q=80',
          'https://ireland.apollo.olxcdn.com/v1/files/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmbiI6ImZnZWJuYWZsdjBuYzMtU1REVlRMUFQiLCJ3IjpbeyJmbiI6IjZtZ2p3bHA3a2dkYjItU1REVlRMUFQiLCJzIjoiMTYiLCJhIjoiMCIsInAiOiIxMCwtMTAifV19.6U-9be6idZaOMLB5McqW4u7OJZbmO3xQHDhzxrkyfn8/image;s=1440x0;q=100',
          'https://ireland.apollo.olxcdn.com/v1/files/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmbiI6InY5dmEybWVnNDlubTItU1REVlRMUFQiLCJ3IjpbeyJmbiI6IjZtZ2p3bHA3a2dkYjItU1REVlRMUFQiLCJzIjoiMTYiLCJhIjoiMCIsInAiOiIxMCwtMTAifV19.ryXcGRUnYG4Sy-JekqtpoVa__7AhdLX_QHoMgr-oQ8k/image;s=1440x0;q=100',
          'https://ireland.apollo.olxcdn.com/v1/files/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmbiI6Imh2cjltcDdheDlwczEtU1REVlRMUFQiLCJ3IjpbeyJmbiI6IjZtZ2p3bHA3a2dkYjItU1REVlRMUFQiLCJzIjoiMTYiLCJhIjoiMCIsInAiOiIxMCwtMTAifV19.jkti-Dvb9-cB94lTIzvo-T5p4zK3i7R6FvU9IOyn4co/image;s=1440x0;q=100',
          'https://ireland.apollo.olxcdn.com/v1/files/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmbiI6Ino4emQ0ODc0YXR5bjItU1REVlRMUFQiLCJ3IjpbeyJmbiI6IjZtZ2p3bHA3a2dkYjItU1REVlRMUFQiLCJzIjoiMTYiLCJhIjoiMCIsInAiOiIxMCwtMTAifV19.XfAV657psDCB9fVD_2cvhJ1RMckdGXK0i3EdHbbjncY/image;s=1440x0;q=100'
        ]
      }
    ];

    // Salvar os carros no MongoDB
    await Car.insertMany(cars);
    console.log('Carros adicionados com sucesso');
  } catch (err) {
    console.error('Erro ao adicionar os carros:', err);
  } finally {
    // Fechar a conexão
    await mongoose.disconnect();
    console.log('Connection closed');
  }
}

addCars();
