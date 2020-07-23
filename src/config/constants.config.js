require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    mongodb_uri: process.env.MONGODB_URI,
    jwt_key: process.env.JWT_KEY
};