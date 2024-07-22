const jwt = require("jsonwebtoken");

exports.isUserAuthenticated = async (req, res, next) => {
    let { accessToken } = req.cookies
    if (!accessToken) return res.sendStatus(401)
    jwt.verify(accessToken, process.env.SECRET_KEY, (error, payload) => {
        if (error) {
            return res.sendStatus(401)
        }
        req.userInfo = payload;
        next()
    })
}