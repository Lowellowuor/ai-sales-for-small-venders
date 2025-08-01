const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For password hashing

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // Ensures email addresses are unique
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'] // Basic email format validation
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'] // Minimum password length
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically sets the creation timestamp
  }
});

// Pre-save hook to hash password before saving
UserSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }
  // Generate a salt (random string) to add to the password for hashing
  const salt = await bcrypt.genSalt(10); // 10 is a good default for computational cost
  // Hash the password using the generated salt
  this.password = await bcrypt.hash(this.password, salt);
  next(); // Proceed to save the user
});

// Method to compare password for login
UserSchema.methods.comparePassword = async function(candidatePassword) {
  // Compare the provided plain text password with the hashed password stored in the database
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
