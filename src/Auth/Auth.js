const crypto = require('crypto')
const jwt = require('jsonwebtoken');
const UserToken = require("../models/UserToken");
const User = require("../models/User");
const {Op} = require("sequelize");


module.exports = class Auth
{

    #res

    #token_key = process.env.TOKEN_KEY

    logged = false

    constructor(res)
    {
        this.#res = res
    }

    async getById(userid)
    {
        let user = await User.findOne({where: {id: userid}})
        this.user = user.dataValues
    }

    async generateToken(user_id)
    {
        let token_id = crypto.randomBytes(32).toString('hex')
        let token = jwt.sign({token_id: token_id, user_id: user_id}, this.#token_key)

        await UserToken.create({
            tokenid: token_id,
            userid: user_id
        });
        let options = {
            maxAge: 60 * 60 * 24 * 30 * 1000,
            httpOnly: false,
            secure: true,
        };

        this.#res.cookie("SessionCookie", token, options);

        return token

    }

    async checkToken(token)
    {
        let decodedToken = jwt.verify(token, this.#token_key)
        let savedToken = await UserToken.findOne({where: {tokenid: decodedToken.token_id}})

        this.logged = (savedToken !== null && savedToken.expired === 0)

        if (this.logged) {
            await this.getById(savedToken.userid)
        }

        return {isLogged: this.logged, user: this.user}
    }


}