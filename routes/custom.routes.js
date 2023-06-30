 const router = require('express').Router();
 const { isAuthorized } = require('../utils/functions')
 const ShortUrl = require('../controllers/url.controllers')
 const axios = require('axios');

 router.post('/', isAuthorized, ShortUrl.createShortUrl)

 router.get('/', isAuthorized, async(req, res) => {
     const response = await axios({
         url: "http://localhost:3000/scissor/api/v1/custom/",
         method: "get",
         headers: { 'token': req.session.token }

     });
     const shortUrls = response.data.shortUrls;
     if (shortUrls) {
         res.render('custom', { shortUrls: shortUrls });
     } else {
         res.render('404')
     }

 })

 module.exports = router;