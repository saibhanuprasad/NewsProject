const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Ensure that email is unique
        trim: true, // Remove whitespace
        lowercase: true // Convert email to lowercase
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Minimum length for password
    }
}, { timestamps: true });

// Pre-save hook to hash the password before saving to the database
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10); // Hash the password with a salt round of 10
    }
    next();
});

// Method to compare password for login
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User ', userSchema);

module.exports = User;