const jwt = require("jsonwebtoken");

const authMiddleware = (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ');

        if (token[0] === 'Bearer' && jwt.verify(token[1], 'superSecretThing')) {
            next()
        } else {
            return response.status(403).json({ error: 'Nenhum token fornecido!' })
        }
    } catch (err) {
        if (err.name === 'jsonWebTokenError') {
            return response.status(403).json({ error: 'Token inválido!' })
        } else {
            return response.status(403).json({ error: 'Token inválido!' })
        }
    }
}

module.exports = authMiddleware;