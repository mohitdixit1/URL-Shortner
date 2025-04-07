const shortId = require("shortid");
const URL = require("../models/url")

async function generateNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) { return res.status(400).json({ error: "url is require" }) }
    const shortIdcrete = shortId(8);
    await URL.create({
        shortId: shortIdcrete,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    })
    return res.render("home", {
        id: shortIdcrete,
    });


}

async function deleteUrl(req, res) {
    const { shortId } = req.body;

    // Validate shortId
    if (!shortId) {
        return res.status(400).json({ error: "ShortId is required" });
    }

    try {
        // Delete the entry from the database
        await URL.deleteOne({ shortId: shortId });
        res.redirect("/"); // Redirect to the main page after deletion
    } catch (error) {
        console.error("Error deleting URL:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function redire(req, res) {
    const urlgo = req.params.urlid;
    const mainUrl = await URL.findOneAndUpdate(
        { shortId: urlgo },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        },
        { new: true }
    )

    if (!mainUrl) {
        return res.status(404).send("URL not found!");
    }

    // Ensure the URL includes the protocol
    const redirectUrl = mainUrl.redirectUrl.startsWith('http://') || mainUrl.redirectUrl.startsWith('https://')
        ? mainUrl.redirectUrl
        : `https://${mainUrl.redirectUrl}`;

    res.redirect(redirectUrl);

}
async function handleAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId: shortId })
    return res.json({
        totalClick: result.visitHistory.length,
        Analytics: result.visitHistory,
    })
}
module.exports = {
    generateNewShortUrl,
    redire,
    handleAnalytics,
    deleteUrl,

}