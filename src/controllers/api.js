const { body, validationResult } = require("express-validator");
const User = require('../models/User')

module.exports.userValidate = [
        body("email")
            .isEmail().withMessage("Veuillez inscrire une adresse email valide").trim().escape(),
        body("username")
            .trim().escape(),
        body('passwordConfirm')
            .custom((value, {req}) => value === req.body.password).withMessage("Vos mots de passe ne correspondent pas"),
];

module.exports.userCreate = async function (req, res) {

    let errors = validationResult(req).array()

    if (errors.length === 0) {
        if(!userExists(req.body.username, req.body.email)) {
            try {
                const user = await User.create({username: req.body.username, email: req.body.email, password: req.body.password});
                return res.json({"error": false, "message": "OK"})
            } catch (error) {
                return res.json({"error": true, "message": JSON.stringify(error)})
            }
        } else {
            return res.json({"error": true, "message": "Ce nom d'utilisateur ou cette adresse email sont déjà utilisés"})
        }
    } else {
        let response = {}
        errors.reverse().forEach(element => {
            response["error"] = true,
            response["message"] = element.msg
        });
        return res.json(response)
    }
}

userExists = async function (username, email) {
    try {
        const user = await User.findOne({where: {username: username, email: email}});
        console.log(user)
        if (user !== null) {
            return true
        }
        return false
    } catch (error) {
        return error
    }
}