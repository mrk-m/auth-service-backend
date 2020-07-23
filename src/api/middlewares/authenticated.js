const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Authenticate user token
const authenticated = async(req, res, next) => {
    try {
        // token
        const token = req.header('Authorization').replace('Bearer ', '');
        // data
        const data = jwt.verify(token, process.env.JWT_KEY);

        // Find the user by looking for the token in each user's tokens
        const user = await User.findOne({ _id: data._id, 'tokens.token': token });
        
        // No user with token found
        if (!user) {
            throw new Error();
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        // Authentication failure
        res.status(401).send({ error: 'Not authorized to access this resource' });
    }

}

module.exports = authenticated;