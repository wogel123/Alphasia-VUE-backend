const controller = require("./controller");
const Article = require("../models/Article");

module.exports = class articleController extends controller
{

	static #object;

	static init(req, res)
	{
		this.#object = new articleController(req, res)
		return this.#object
	}

	async getArticles() {
		let articles = await Article.findAll(
			{
				limit: this.req.params.nb === undefined ? null : parseInt(this.req.params.nb),
				order: [['posted_at', 'DESC']]
			})
		return this.res.json(articles)
	}

}