const Url = require('../models/Url');
const shortid = require('shortid');

// 1. Create Short URL
exports.createShortUrl = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) return res.status(400).json({ error: 'URL is required' });

        const shortCode = shortid.generate();

        const newUrl = await Url.create({
            url,
            shortCode,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        res.status(201).json(newUrl);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// 2. Get Original URL and Redirect
exports.getOriginalUrl = async (req, res) => {
    try {
        const { code } = req.params;
        const urlData = await Url.findOneAndUpdate(
            { shortCode: code },
            { $inc: { accessCount: 1 } },
            { new: true }
        );

        if (!urlData) return res.status(404).json({ error: 'Short URL not found' });

        res.redirect(urlData.url);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// 3. Update URL
exports.updateUrl = async (req, res) => {
    try {
        const { code } = req.params;
        const { url } = req.body;

        const updated = await Url.findOneAndUpdate(
            { shortCode: code },
            { url, updatedAt: new Date() },
            { new: true }
        );

        if (!updated) return res.status(404).json({ error: 'Short URL not found' });

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// 4. Delete URL
exports.deleteUrl = async (req, res) => {
    try {
        const { code } = req.params;
        const deleted = await Url.findOneAndDelete({ shortCode: code });

        if (!deleted) return res.status(404).json({ error: 'Short URL not found' });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// 5. Get Stats
exports.getUrlStats = async (req, res) => {
    try {
        const { code } = req.params;
        const data = await Url.findOne({ shortCode: code });

        if (!data) return res.status(404).json({ error: 'Short URL not found' });

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
