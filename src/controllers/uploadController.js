const controller = require("./controller");
const fs = require("fs");

module.exports = class uploadController extends controller
{

	static #object;

	static init(req, res)
	{
		this.#object = new uploadController(req, res)
		return this.#object
	}

	decodeBase64Image(dataString) {
		let matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
			response = {};

		if (matches.length !== 3) {
			return new Error('Invalid input string');
		}

		response.type = matches[1];
		response.data = new Buffer(matches[2], 'base64');

		return response;
	}


	async uploadFile() {

		let decodedImg = this.decodeBase64Image(this.req.body.file);
		let imageBuffer = decodedImg.data;
		let fileName =  this.req.body.fileName;
		try{
			fs.writeFileSync("./uploads/" + fileName, imageBuffer, 'utf8');
		}
		catch(err){
			console.error(err)
		}




		console.log(this.req.body)
		return this.res.json(this.req.body)
	}

}