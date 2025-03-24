const fs = require("fs").promises;

class Product {
	constructor({ productsFilePath }) {
		this.productsFilePath = productsFilePath;
		this.products = require(productsFilePath);
	}

	get({ reversed, limit }) {
		return { products: reversed == "true" ? this.products.slice(0, limit).reverse() : this.products.slice(0, limit) };
	}

	async post({ new_product }) {
		const data = await fs.readFile(this.productsFilePath, { encoding: 'utf8' });
      const products = JSON.parse(data);

      products.push(new_product);

      await fs.writeFile(this.productsFilePath, JSON.stringify(products, null, 2));

      return {
        message: "Product added successfully",
        product: new_product
 		};
	}
}

module.exports = Product;
