const express = require('express');

const userRoutes = require('./user.route');

const router = express.Router();

/**
 * GET status
 */
router.get('/status', (req, res) => {
	res.json({
		message: 'OK',
		timestamp: new Date().toISOString(),
		IP: req.ip,
		URL: req.originalUrl,
	});
});

// User routes
router.use('/user', userRoutes);

module.exports = router;