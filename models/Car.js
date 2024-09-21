const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
  brand: { type: String, required: true }, // Marca do carro
  model: { type: String, required: true }, // Modelo do carro
  year: { type: Number, required: true }, // Ano
  price: { type: Number, required: true }, // Preço
  mileage: { type: Number, required: true }, // Quilometragem
  fuel: { type: String, required: true }, // Combustível
  power: { type: Number, required: true }, // Potência em CV
  engineSize: { type: Number, required: true }, // Cilindrada
  gearbox: { type: String, required: true }, // Tipo de caixa
  doors: { type: Number, required: true }, // Número de portas
  color: { type: String, required: true }, // Cor
  images: { type: [String], required: false }, // URLs das fotos
  createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Car', carSchema);
