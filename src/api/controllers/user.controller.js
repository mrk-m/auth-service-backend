const User = require('../models/user.model');

// Create a user
exports.createUser = async (req, res, next) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
        next();
    } catch (error) {
        console.log(error);
        res.status(400).send({error: error.message});
    }
};

// Get the info of a user
exports.getUserInfo = async (req, res, next) => {
    res.send({
        "setup": req.user.setup,
        "name": req.user.name,
        "dob": req.user.dob,
        "email": req.user.email
    });
}

// Update a user's information
exports.updateDetails = async (req, res, next) => {
    try {
        req.user.name = req.body.name;
        req.user.dob = req.body.dob;
        req.user.setup = true;

        await req.user.save();
        res.send();
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
};


// Sign in a user and return a token
exports.signIn = async (req, res, next) => {
    try {

        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        res.send({ token });

    } catch (error) {
        console.log(error);
        res.status(400).send({error: error.message});
    }
}

// Sign out a user by invalidating the token
exports.signOut = async (req, res, next) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token;
        });
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
}

// Sign out a user by invalidating all their token
exports.signOutAll = async (req, res, next) => {
    try {
        req.user.tokens.splice(0, req.user.tokens.length);
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
}