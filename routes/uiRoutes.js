const express = require('express');
const router = express.Router();
const uiController = require('../controllers/uiController');

// UI homepage
router.get('/', uiController.renderHome);

router.post('/shorten-ui', uiController.handleShortenUi);
router.post('/update-ui', uiController.handleUpdateUi);
router.post('/delete-ui', uiController.handleDeleteUi);
router.post('/stats-ui', uiController.handleStatsUi);
router.post('/retrieve-ui', uiController.handleRetrieveUi);

module.exports = router;
