const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController'); // ✅ Correct path

// POST /shorten
router.post('/', urlController.createShortUrl);
// GET /shorten/:code
router.get('/:code', urlController.getOriginalUrl);

// PUT /shorten/:code
router.put('/:code', urlController.updateUrl);

// DELETE /shorten/:code
router.delete('/:code', urlController.deleteUrl);

// GET /shorten/:code/stats
router.get('/:code/stats', urlController.getUrlStats);
module.exports = router;
