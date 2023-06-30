const { getUserIdFromToken } = require('../utils/functions')
const axios = require('axios');


const createShortUrl = async(req, res) => {

    //console.log(req.body, req.session.token)
    let domain = !req.body.customdomain ? null : req.body.customdomain;
    const userID = getUserIdFromToken(req.session.token);
    const data = { fullUrl: req.body.fullUrl, customdomain: domain, userID: userID };
    const response = await axios({
        url: "http://localhost:3000/scissor/api/v1/url/shortenUrl",
        method: "post",
        headers: { 'token': req.session.token },
        data: data,
    });

    //console.log(response.data.message, response.data.error, response.data.errors, response.data.url);
    if (Object.keys(response.data).includes("errors")) {
        errors = Object.entries(response.data.errors);
        res.render('index', { messages: errors[0][1] });
    } else if (Object.keys(response.data).includes("error")) {
        res.render('index', { messages: response.data.error });
        //console.log(response.data)
    } else if (Object.keys(response.data).includes("message")) {
        res.render('index', { messages: response.data.message, shortUrls: response.data.url });
        //console.log(response.data)
    }
}

const getAllUrls = async(userID) => {

    const allUrls = await urlSchema.find({ userID: userID, });
    return allUrls;
}

const getCustomUrls = async(userID) => {

    const customUrls = await urlSchema.find({ userID: userID, type: "custom" });
    return customUrls
}


module.exports = { createShortUrl, getAllUrls, getCustomUrls }