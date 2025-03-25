const test = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../../index');
const productsFilePath = path.join(__dirname, './stub-products.json');

function resetProductsFile() {
  const initialData = [
    {
      id: 1,
      name: "Test Product",
      price: 9.99
    }
  ];
  fs.writeFileSync(productsFilePath, JSON.stringify(initialData, null, 2), 'utf-8');
}

test('GET /api/products should return limited and reversed products', async (t) => {
  resetProductsFile();

  const res = await supertest(app)
    .get('/api/products?limit=1&reverse=true')
		.set('identity', 'lsa')
    .expect(200);

  assert.ok(Array.isArray(res.body.products));
  assert.strictEqual(res.body.products.length, 1);
  assert.strictEqual(res.body.products[0].name, 'Test Product');
});

test('POST /api/products should add new product', async (t) => {
  resetProductsFile();

  const newProduct = {
    id: 2,
    name: "New Product",
    price: 19.99
  };

  const res = await supertest(app)
    .post('/api/products')
		.set('identity', 'lsa')
    .send(newProduct)
    .expect(201);

  assert.strictEqual(res.body.message, "Product added successfully");
  assert.deepStrictEqual(res.body.product, newProduct);

  // 再次讀取檔案確認是否真的寫入
  const fileContent = fs.readFileSync(productsFilePath, 'utf-8');
  const products = JSON.parse(fileContent);

  assert.strictEqual(products.length, 2);
  assert.deepStrictEqual(products[1], newProduct);
});
