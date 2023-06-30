const router = require('express').Router();
const urlControllers = require('../controllers/url.controllers')
const { isAuthorized } = require('../utils/functions')

router.post('/shortenUrl', isAuthorized, urlControllers.createShortUrl)





module.exports = router;