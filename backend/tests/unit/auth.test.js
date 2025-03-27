const test = require('node:test');
const assert = require('node:assert');

const Auth = require("../../lib/auth");
const auth = new Auth();

<<<<<<< HEAD

// Test now
=======
//test test test
>>>>>>> 4e5a998e0fc6055ac5b1f410abf450ab2015b420
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
