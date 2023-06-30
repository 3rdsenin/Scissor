 const router = require('express').Router();
 const urls = require('../controllers/url.controllers')
 const { getUserIdFromToken, isAuthorized } = require('../utils/functions')
 const axios = require('axios');


 router.get('/404', async(req, res) => {
     res.render('404')
 })

 router.get('/:shortId', async(req, res) => {
     const shortUrl = req.params.shortId;
     //console.log(req.params.shortId)
     const response = await axios({
         url: `http://localhost:3000/scissor/api/v1/${shortUrl}`,
         method: "get",
     });
     if (response.data.fullUrl) {
         res.redirect(response.data.fullUrl)
     } else {
         res.render('404');
     }

 })

 //     const shortUrl = await ShortUrl.findOne({ domain: req.params.shortId })

 //     if (shortUrl == null) { return res.render('404'); } else {

 //         let historyObj = { ip: req.clientIp, time: date_time.dateNow() }
 //             //console.log(historyObj);
 //         shortUrl.history.push(historyObj)
 //             //console.log(shortUrl.history)
 //         shortUrl.clicks++;
 //         shortUrl.save();


 //         res.redirect(shortUrl.full);
 //     }
 // })



 router.get('/', isAuthorized, async(req, res) => {
     //  const userID = getUserIdFromToken(req.session.token);

     //  console.log(`User ${userID}`)
     const response = await axios({
         url: "http://localhost:3000/scissor/api/v1/",
         method: "get",
         headers: { 'token': req.session.token }
     });

     //console.log(response.data)
     if (response.data) {
         res.render('index', { shortUrls: response.data.shortUrls })
     }

 })


 module.exports = router;