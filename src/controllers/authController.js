const Joi = require('joi');
const User = require('../models/User')
const UserRank = require('../models/UserRank')
const UUID = require('uuid')
const bcrypt = require('bcrypt')
const Auth = require("../Auth/Auth");
const controller = require("./controller");
const Rank = require("../models/Rank");
const Op = require('sequelize').Op

module.exports = class authController extends controller
{
    static #object;

    static init(req, res)
    {
        this.#object = new authController(req, res)
        return this.#object
    }

    async findUser(username, email = null)
    {
        let request = [{username: username}]
        if (email !== null) {
            request.push({email: email})
        }
        try {
            return await User.findOne({
                where: {
                    [Op.or]: request
                },
                include: {
                    model: UserRank,
                    include: {
                        model: Rank
                    }
                }
            });
        } catch (error) {
            return error
        }
    }

    async userCreate()
    {
        const registerSchema = Joi.object({
            username: Joi.string()
                .required()
                .messages({
                    'string.empty': 'Vous devez saisir un nom d\'utilisateur.'
                }),

            email: Joi.string()
                .required()
                .email()
                .messages({
                    'string.email': 'Veuillez saisir une adresse email valide.',
                    'string.empty': 'Vous devez saisir une adresse email.'
                }),

            password: Joi.string()
                .required()
                .messages({
                    'string.empty': 'Vous devez saisir un mot de passe.'
                }),

            passwordConfirm: Joi.any().equal(Joi.ref('password')).required().messages({'any.only': 'Vos mots de passe ne correspondent pas.'})
        })

        const validation = registerSchema.validate(this.req.body)

        if (validation.error === undefined) {
            if(await this.findUser(this.req.body.username, this.req.body.email) === null) {

                try {

                    const id = UUID.v4();

                    const password = await bcrypt.hash(this.req.body.password, 10);

                    const user = await User.create({
                        id: id,
                        username: this.req.body.username,
                        email: this.req.body.email,
                        password: password
                    });

                    const rank = await UserRank.create({
                        user_id: id,
                        rank_id: 1
                    })

                    let auth = new Auth(this.res)
                    let token = await auth.generateToken(id)

                    return this.res.json({"error": false, "message": "OK", "user": user, "token": token})
                } catch (error) {
                    return this.res.json({"error": true, "message": JSON.stringify(error)})
                }

            } else {
                return this.res.json({"error": true, "message": "Ce nom d'utilisateur ou cette adresse email sont déjà utilisés."})
            }
        } else {
            let response = {}
            validation.error.details.forEach(e => {
                response["error"] = true
                response["message"] = e.message
            })
            return this.res.json(response)
        }
    }

    async userLogin()
    {
        const loginSchema = Joi.object({
            username: Joi.string()
                .required()
                .messages({
                    'string.empty': 'Vous devez saisir un nom d\'utilisateur.'
                }),

            password: Joi.string()
                .required()
                .messages({
                    'string.empty': 'Vous devez saisir un mot de passe.'
                }),

        })

        let validation = loginSchema.validate(this.req.body)

        if (validation.error === undefined) {

            let user = await this.findUser(this.req.body.username)

            if (user !== null) {

                const result = await bcrypt.compare(this.req.body.password, user.password);

                if (result) {
                    let auth = new Auth(this.res)
                    let token = await auth.generateToken(user.id)
                    auth.user = user
                    auth.logged = true
                    return this.res.json({"error": false, "message": "OK", "user": user, "token": token})
                } else {
                    return this.res.json({"error": true, "message": "Le mot de passe est incorrect."})
                }

            } else {
                return this.res.json({"error": true, "message": "Ce nom d'utilisateur n'existe pas."})
            }

        } else {
            let response = {}
            validation.error.details.forEach(e => {
                response["error"] = true
                response["message"] = e.message
            })
            return this.res.json(response)
        }
    }

    async checkLogin()
    {
        let auth = new Auth(this.res)
        let response = await auth.checkToken(this.req.body.token)
        return this.res.json(response)
    }

    async logout()
    {
        let auth = new Auth(this.req)
        let response = await auth.destroyToken(this.req.body.token)
        return this.res.json(response)
    }

}