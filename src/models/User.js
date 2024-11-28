const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Subschema for valuation history
const ValuationHistorySchema = new mongoose.Schema({
    date: { type: Date, required: true },
    value: { type: Number, required: true },
});

// Subschema for assets
const AssetSchema = new mongoose.Schema({
    type: { type: String, required: true },
    market_worth: { type: Number, required: true },
    valuation_history: [ValuationHistorySchema], // Array of valuation history
});

// Subschema for metadata
const MetadataSchema = new mongoose.Schema({
    preferences: {
        theme: { type: String, default: 'light' },
        languages: { type: [String], default: [] }, // Array of strings
    },
    last_login: { type: Date },
});

// Main User schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    metadata: MetadataSchema, // Optional metadata
    feedback: { type: String, default: '' }, // Optional feedback
    tags: { type: [String], default: [] }, // Optional tags
    assets: [AssetSchema], // Array of assets
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', UserSchema);
