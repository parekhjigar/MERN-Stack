// Importing packages
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { errorHandler } = require("../helpers/dbErrorHandler");
const Product = require("../models/product");

exports.create = (req, res) => {
	let form = new formidable.IncomingForm()
	// To keep the extensions of the photo
	form.keepExtensions = true
	form.parse(req, (err, fields, files) => {
		if(err) {
			return res.status(400).json({
				error: "Image cannot be uploaded"
			})
		}
		let product = new Product(fields)

		// Name of the photo file
		if(files.photo) {
			product.photo.data = fs.readFileSync(files.photo.path)
			product.photo.contentType = files.photo.type
		}

		product.save((err, result) => {
			if (err) {
				return res.status(400).json({
					error: errorHandler(error)
				});
			}
			res.json(result);
		});
	});

};