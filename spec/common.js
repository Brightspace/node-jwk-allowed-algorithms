'use strict';

const { describe, it } = require('node:test');

const expect = require('chai').expect;

var allowedAlgorithms = require('..');

describe('should throw for', function() {
	it('non object', function() {
		function fn() {
			return allowedAlgorithms('hi');
		}

		expect(fn).to.throw(TypeError);
	});

	it('null', function() {
		function fn() {
			return allowedAlgorithms(null);
		}

		expect(fn).to.throw(TypeError);
	});

	it('non string key type', function() {
		function fn() {
			return allowedAlgorithms({ kty: {} });
		}

		expect(fn).to.throw(TypeError);
	});

	it('unknown key type', function() {
		function fn() {
			return allowedAlgorithms({ kty: 'foozleberries' });
		}

		expect(fn).to.throw(/"foozleberries"/);
	});
});
