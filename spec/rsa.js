'use strict';

var expect = require('chai').expect,
	mocha = require('mocha');

var describe = mocha.describe,
	it = mocha.it;

var allowedAlgorithms = require('../');

describe('rsa', function () {
	it('should include "{RS,PS}{256,384,512}"', function () {
		var algs = allowedAlgorithms({ kty: 'RSA' });

		expect(algs).to.deep.equal(['RS256', 'RS384', 'RS512', 'PS256', 'PS384', 'PS512']);
	});

	['RS256', 'RS384', 'RS512', 'PS256', 'PS384', 'PS512'].forEach(function (alg) {
		it('should allow "' + alg + '"', function () {
			function fn () {
				return allowedAlgorithms({ kty: 'RSA', alg: alg });
			}

			expect(fn).not.to.throw;
			expect(fn()).to.deep.equal([alg]);
		});
	});
});
