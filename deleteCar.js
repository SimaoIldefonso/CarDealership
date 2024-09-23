const mongoose = require('mongoose');
const readline = require('readline');
const Car = require('./models/Car'); // Importar o modelo Car

async function deleteCar() {
  try {
    // Conectar ao MongoDB
    await mongoose.connect('mongodb+srv://simaoildefonso:Do0r5rAJCQIW6EcU@cluster0.08ky7.mongodb.net/');
    console.log('Connected to MongoDB');

    // Buscar todos os carros
    const cars = await Car.find();
    if (cars.length === 0) {
      console.log('No cars available to delete');
      return;
    }

    // Listar os carros disponíveis
    cars.forEach((car, index) => {
      console.log(`${index} - ${car.brand} ${car.model}`);
    });

    // Configurar o readline para ler a entrada do usuário
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    // Perguntar ao usuário qual carro deseja apagar
    rl.question('Digite o índice do carro que deseja apagar: ', async (index) => {
      const carIndex = parseInt(index, 10);
      const carToDelete = cars[carIndex];

      if (!carToDelete) {
        console.log('Car not found');
        rl.close();
        return;
      }

      // Apagar o carro
      await Car.deleteOne({ _id: carToDelete._id });
      console.log(`Car ${carToDelete.brand} ${carToDelete.model} deleted successfully`);

      // Fechar o readline e a conexão com o MongoDB
      rl.close();
      await mongoose.disconnect();
      console.log('Connection closed');
    });
  } catch (err) {
    console.error('Erro ao apagar o carro:', err);
  }
}

// Chamar a função para apagar o carro
deleteCar();
