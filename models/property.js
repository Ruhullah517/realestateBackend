const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true, min: 0 }, // Ensures non-negative price
    description: { type: String },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer' }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
