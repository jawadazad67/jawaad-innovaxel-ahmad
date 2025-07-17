const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    url: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
    accessCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Url', UrlSchema);
