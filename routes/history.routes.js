const Router = require('express').Router();
const axios = require('axios')
const { isAuthorized } = require('../utils/functions')

Router.get('/', isAuthorized, async(req, res) => {
    const response = await axios({
        url: `http://localhost:3000/scissor/api/v1/history/`,
        method: "get",
        headers: { 'token': req.session.token }
    });
    if (response.data) {
        res.status(200).render('history', { shortUrls: response.data.shortUrls })
    } else {
        res.render('404');
    }

    //

})

Router.get('/:domain', isAuthorized, async(req, res) => {
    const domain = req.params.domain;
    const response = await axios({
        url: `http://localhost:3000/scissor/api/v1/history/${domain}`,
        method: "get",
        headers: { 'token': req.session.token }
    });
    if (response.data) {
        res.status(200).render('history2', { shortUrls: response.data.shortUrls })
    } else {
        res.render('404');
    }

})


module.exports = Router;