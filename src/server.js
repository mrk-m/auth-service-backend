const { port } = require('./config/constants.config');
const app = require('./config/express.config');

require('./database/connect');

app.listen(port, (err) => {
	if (err) {
		return console.log('Server failed to start: ', err);
    }
    
	console.log(`Server running on port ${port}`);
});

module.exports = app;