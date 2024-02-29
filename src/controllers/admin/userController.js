const controller = require("../controller");
const authController = require("../authController");
const User = require("../../models/User");
const UserRank = require("../../models/UserRank");
const Rank = require("../../models/Rank");
const UUID = require("uuid");
const bcrypt = require("bcrypt");
const Auth = require("../../Auth/Auth");

module.exports = class userController extends controller
{
	static #object;

	static init(req, res)
	{
		this.#object = new userController(req, res)
		return this.#object
	}

	async getUsers()
	{
		let users = await User.findAll({
			include: {
				model: UserRank,
				include: {
					model: Rank
				}
			}
		})
		return this.res.json({ data: users })

	}
	async getUser()
	{
		let user = await User.findOne({
			where: {
				id: this.req.params.id
			},
			include: {
				model: UserRank,
				include: {
					model: Rank
				}
			}
		})
		return this.res.json(user)

	}

	async getRanks()
	{
		let ranks = await Rank.findAll()

		return this.res.json(ranks)
	}

	async addUser()
	{
			if(await authController.init(this.req, this.res).findUser(this.req.body.data.username, this.req.body.data.email) === null) {

				const id = UUID.v4();

				const password = await bcrypt.hash(this.req.body.data.password, 10);

				const user = await User.create({
					id: id,
					username: this.req.body.data.username,
					email: this.req.body.data.email,
					password: password
				});

				if (this.req.body.ranks.length === 0) {
					await UserRank.create({
						user_id: id,
						rank_id: 1
					})
				} else {
					for (const rank of this.req.body.ranks) {
						if (rank.state === true) {
							await UserRank.create({
								user_id: id,
								rank_id: rank.id
							})
						}
					}
				}

				return this.res.json({ "error": false, "message": "L'utilisateur a bien été crée", "user": user })

			} else {
				return this.res.json({"error": true, "message": "Ce nom d'utilisateur ou cette adresse email sont déjà utilisés."})
			}
	}

}