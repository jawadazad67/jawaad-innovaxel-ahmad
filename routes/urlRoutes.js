const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController'); // ✅ Correct path

// POST /shorten
router.post('/', urlController.createShortUrl);

module.exports = router;
