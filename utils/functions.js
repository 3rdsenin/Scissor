const jwt = require('jsonwebtoken');
require('dotenv').config();

const isAuthorized = (req, res, next) => {
    const token = req.session.token
    if (token) {
        const decode = jwt.verify(token, process.env.jwt_secret);

        if (decode) {
            next();

        } else {
            res.render('login', {})
        }

    } else {
        res.render('login', {})
    }

}

const getUserIdFromToken = (token) => {
    const decodedToken = jwt.decode(token);
    const userId = decodedToken.userid;
    return userId;
}



module.exports = { isAuthorized, getUserIdFromToken };