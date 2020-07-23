const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User schema
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid email address'});
            }
        }
    },
    setup: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    name: {
        type: String,
        trim: true,
    },
    dob: {
        type: Date,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }]
},
{ timestamps: true });

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this;
    // Sign token
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
    const description = "test desc";
    // concat?
    user.tokens = user.tokens.concat({token, description});
    // Save
    await user.save();
    // Return token
    return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email} );
    if (!user) {
        throw new Error('Incorrect email or password');
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error('Incorrect email or password');
    }
    return user;
};

// 
const User = mongoose.model('User', userSchema);

module.exports = User;