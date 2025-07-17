const express = require('express');
const router = express.Router();
const uiController = require('../controllers/uiController');

// UI homepage
router.get('/', uiController.renderHome);

// Handle form submission
router.post('/shorten-ui', uiController.handleShortenUi);

module.exports = router;
