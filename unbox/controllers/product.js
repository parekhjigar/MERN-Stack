// Importing packages
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { errorHandler } = require("../helpers/dbErrorHandler");
const Product = require("../models/product");

exports.productById = (req, res, next, id) => {
	Product.findById(id).exec((err, product) => {
		if(err || !product) {
			return res.status(400).json({
				error: "Product not found!"
			});
		}
		req.product = product
		next();
	});
};

exports.read = (req, res) => {
	req.product.photo = undefined
	return res.json(req.product);
}

exports.create = (req, res) => {
	let form = new formidable.IncomingForm()
	// To keep the extensions of the photo
	form.keepExtensions = true
	form.parse(req, (err, fields, files) => {
		if(err) {
			return res.status(400).json({
				error: "Image cannot be uploaded"
			});
		}

		// Check for all input fields
		const { name, description, price, category, quantity, shipping } = fields

		if(!name || !description || !price || !category || !quantity || !shipping) {
			return res.status(400).json({
				error: "All input fields are required!"
			});
		}

		let product = new Product(fields)

		// Name of the photo file
		if(files.photo) {
			if(files.photo.size > 1000000) {
				return res.status(400).json({
				error: "Image size should be less than 1mb"
				});
			}
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


exports.remove = (req, res) => {
	let product = req.product
	product.remove((err, deletedProduct) => {
		if (err) {
				return res.status(400).json({
					error: errorHandler(error)
				});
			}
			res.json({
				"message": "Product deleted successfully!"
			})
	});
}


exports.update = (req, res) => {
	let form = new formidable.IncomingForm()
	// To keep the extensions of the photo
	form.keepExtensions = true
	form.parse(req, (err, fields, files) => {
		if(err) {
			return res.status(400).json({
				error: "Image cannot be uploaded"
			});
		}

		// Check for all input fields
		const { name, description, price, category, quantity, shipping } = fields

		if(!name || !description || !price || !category || !quantity || !shipping) {
			return res.status(400).json({
				error: "All input fields are required!"
			});
		}

		let product = req.product;
		product = _.extend(product, fields);

		// Name of the photo file
		if(files.photo) {
			if(files.photo.size > 1000000) {
				return res.status(400).json({
				error: "Image size should be less than 1mb"
				});
			}
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


// Sort Product by sold = /products?sortBy=sold&order=desc&limit=4
// Sort Product by arrival = /products?sortBy=created&order=desc&limit=4

exports.list = (req, res) => {
	let order = req.query.order ? req.query.order: "asc";
	let sortBy = req.query.sortBy ? req.query.sortBy: "_id";
	let limit = req.query.limit ? parseInt(req.query.limit): 6;

	// Querying products from the database
	Product.find()
		.select("-photo")
		.populate("category")
		.sort([[sortBy, order]])
		.limit(limit)
		.exec((err, products) => {
			if (err) {
				return res.status(400).json({
					error: "Products not found"
				});
			}
			res.json(products);
		});
};



// To find related products based on request product category
// Products with same categories except itself will be returned
exports.listRelated = (req, res) => {
	let limit = req.query.limit ? parseInt(req.ruery.limit): 6;

	Product.find({
		_id: { $ne : req.product },
		category: req.product.category
	})
	.limit(limit)
	.populate("category", "_id name")
	.exec((err, products) => {
		if (err) {
			return res.status(400).json({
				error: "Products not found"
			});
		}
		res.json(products);
	});
};


exports.listCategories = (req, res) => {
	Product.distinct("category", {}, (err, categories) => {
		if (err) {
			return res.status(400).json({
				error: "Categories not found"
			});
		}
		res.json(categories)
	})
}
