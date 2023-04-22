const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = process.env.SECRET;
const expiration = process.env.EXPIRATION;


module.exports = {
    // function for our authenticated routes
    authMiddleware: function ({ req }) {
        // allows token to be sent via  req.query or headers
        let token = req.body.token || req.query.token || req.headers.authorization;

        // ["Bearer", "<tokenvalue>"]
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return req;
        }

        // verify token and get user data out of it
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }

        // return the request object so it can be passed to the resolver as `context`
        return req;
    },
    signToken: function ({ email, _id }) {
        const payload = { email, _id };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};
