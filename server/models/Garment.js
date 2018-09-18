const mongoose = require('mongoose');

const garmentSchema = new mongoose.Schema({

});

const Garment = mongoose.model('Garment', garmentSchema);

module.exports = Garment;