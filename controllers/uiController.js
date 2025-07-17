const Url = require("../models/Url");
const shortid = require("shortid");

// Render the homepage with all placeholders
exports.renderHome = (req, res) => {
  res.render("index", {
    shortUrl: null,
    error: null,
    stats: null,
    originalUrl: null,
  });
};

//Create Short URL
exports.handleShortenUi = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.render("index", {
      shortUrl: null,
      error: "URL is required",
      stats: null,
      originalUrl: null,
    });
  }

  try {
    const shortCode = shortid.generate();
    await Url.create({
      url,
      shortCode,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const shortUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;
    res.render("index", {
      shortUrl,
      error: null,
      stats: null,
      originalUrl: null,
    });
  } catch (err) {
    res.render("index", {
      shortUrl: null,
      error: "Something went wrong",
      stats: null,
      originalUrl: null,
    });
  }
};

// Update Existing URL
exports.handleUpdateUi = async (req, res) => {
  const { code, url } = req.body;

  try {
    const updated = await Url.findOneAndUpdate(
      { shortCode: code },
      { url, updatedAt: new Date() },
      { new: true }
    );

    if (!updated) {
      return res.render("index", {
        shortUrl: null,
        error: "Short URL not found",
        stats: null,
        originalUrl: null,
      });
    }

    const shortUrl = `${req.protocol}://${req.get("host")}/${code}`;
    res.render("index", {
      shortUrl: `Updated: ${shortUrl}`,
      error: null,
      stats: null,
      originalUrl: null,
    });
  } catch (err) {
    res.render("index", {
      shortUrl: null,
      error: "Update failed",
      stats: null,
      originalUrl: null,
    });
  }
};

//Delete Short URL
exports.handleDeleteUi = async (req, res) => {
  const { code } = req.body;

  try {
    const deleted = await Url.findOneAndDelete({ shortCode: code });

    if (!deleted) {
      return res.render("index", {
        shortUrl: null,
        error: "Short URL not found",
        stats: null,
        originalUrl: null,
      });
    }

    res.render("index", {
      shortUrl: `Deleted short URL: ${code}`,
      error: null,
      stats: null,
      originalUrl: null,
    });
  } catch (err) {
    res.render("index", {
      shortUrl: null,
      error: "Delete failed",
      stats: null,
      originalUrl: null,
    });
  }
};

//Get Stats
exports.handleStatsUi = async (req, res) => {
  const { code } = req.body;

  try {
    const data = await Url.findOne({ shortCode: code });

    if (!data) {
      return res.render("index", {
        shortUrl: null,
        error: "Short URL not found",
        stats: null,
        originalUrl: null,
      });
    }

    res.render("index", {
      shortUrl: null,
      error: null,
      stats: data,
      originalUrl: null,
    });
  } catch (err) {
    res.render("index", {
      shortUrl: null,
      error: "Failed to fetch stats",
      stats: null,
      originalUrl: null,
    });
  }
};

// Retrieve Original URL
exports.handleRetrieveUi = async (req, res) => {
  const { code } = req.body;

  try {
    const data = await Url.findOne({ shortCode: code });

    if (!data) {
      return res.render("index", {
        shortUrl: null,
        error: "Short URL not found",
        stats: null,
        originalUrl: null,
      });
    }

    res.render("index", {
      shortUrl: null,
      error: null,
      stats: null,
      originalUrl: data.url,
    });
  } catch (err) {
    res.render("index", {
      shortUrl: null,
      error: "Failed to retrieve original URL",
      stats: null,
      originalUrl: null,
    });
  }
};
