const express = require("express")
const URL = require("../models/url")
const router = express.Router();

const {generateNewShortUrl,
    redire,
    handleAnalytics,
} = require("../controllers/url")

router.route("/")
.post(generateNewShortUrl);


router.route("/:urlid")
.get(redire)

router.route("/Analytics/:shortId")
.get(handleAnalytics)
module.exports = router