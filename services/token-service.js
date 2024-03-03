const jwt = require("jsonwebtoken");
const db = require("../database/db.js");

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '1d'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '3d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {newPerson
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        console.log("userId, refreshToken", userId, refreshToken);
        const tokenData = await db.query("SELECT * FROM tokens where user_id = $1", [userId]);
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
        }
        const token = await db.query("INSERT INTO tokens (user_id, refresh_token) values ($1, $2) RETURNING *", [userId, refreshToken]);
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await db.query("DELETE FROM tokens where refresh_token = $1", [refreshToken]);
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await db.query("SELECT * FROM tokens where refresh_token = $1", [refreshToken])
        return tokenData;
    }
}

module.exports = new TokenService();
