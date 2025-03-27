const test = require('node:test');
const assert = require('node:assert');

const Auth = require("../../lib/auth");
const auth = new Auth();

//test by myself
test('Auth can successfully verify the identity.', async (t) => {

  const mock_next = () => {
  };
	const mock_res = {
  	status(code) {
    	return this;
  	},
  	json(payload) {
  	}
	};
	let mock_req = {
		headers: { identity: "lsa" },
	}
  assert.strictEqual(auth.isValid(mock_req, mock_res, mock_next), true);

	mock_req = {
		headers: { identity: "random" },
	}
  assert.strictEqual(auth.isValid(mock_req, mock_res, mock_next), false);
})
