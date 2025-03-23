const express = require("express");
const app = express();
const server = require("http").Server(app);
const path = require("path");
const fs = require("fs");
const PORT = 6000;

const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

const Auth = require("./lib/auth");
const auth = new Auth();

const Product = require("./lib/products");
const productsFilePath = process.env.NODE_ENV === 'test'
  ? path.join(__dirname, 'test/mock-products.json')
  : path.join(__dirname, 'products.json');
const product = new Product({ productsFilePath });

app.get("/api/products", auth.isValid, function (req, res) {
	try {
		res.json(product.get({ limit: req.query.limit, reversed: req.query.reverse }));
	}
	catch (e) {
		console.error(e);
		res.status(500).json({ error: e.message });
	}
});

app.post("/api/products", auth.isValid, async (req, res) => {
	try {
		const result = await product.post({ new_product: req.body });
		res.status(201).json(result);
	}
	catch (e) {
		console.error(e);
		res.status(500).json({ error: e.message });
	}
});

if (process.env.NODE_ENV !== 'test') {
	app.listen(PORT, "0.0.0.0", function (err) {
		if (err) console.log(err);
		console.log(`Server listening on PORT ${PORT}`);
	});
}

module.exports = app;
