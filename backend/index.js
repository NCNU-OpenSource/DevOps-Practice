const express = require("express");
const app = express();
const server = require("http").Server(app);
const path = require("path");
const productsFilePath = process.env.NODE_ENV === 'test'
  ? path.join(__dirname, 'test/mock-products.json')
  : path.join(__dirname, 'products.json');
const products = require(productsFilePath);
const fs = require("fs");
const PORT = 6000;

const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

app.get("/api/products", function (req, res) {
		const limit = req.query.limit;
		const reverse = req.query.reverse;
		const limited_products = reverse == "true" ? products.slice(0, limit).reverse() : products.slice(0, limit);
		res.json({ "products" : limited_products });
		});

app.post("/api/products", (req, res) => {
		const newProduct = req.body;

		// read existed products
		fs.readFile(productsFilePath, "utf-8", (err, data) => {
				if (err) {
				console.error("Failed to read file:", err);
				return res.status(500).json({ error: "Failed to read products file" });
				}

				let products = [];
				try {
				products = JSON.parse(data);
				} catch (parseErr) {
				console.error("JSON parse error:", parseErr);
				return res.status(500).json({ error: "Invalid JSON format in products file" });
				}

				products.push(newProduct);

				// write back to json
				fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), (writeErr) => {
						if (writeErr) {
						console.error("Failed to write file:", writeErr);
						return res.status(500).json({ error: "Failed to write products file" });
						}

						res.status(201).json({ message: "Product added successfully", product: newProduct });
						});
		});
});

if (process.env.NODE_ENV !== 'test') {
	app.listen(PORT, "0.0.0.0", function (err) {
		if (err) console.log(err);
		console.log(`Server listening on PORT ${PORT}`);
	});
}

module.exports = app;
