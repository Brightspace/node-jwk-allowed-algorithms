'use strict';

var expect = require('chai').expect,
	mocha = require('mocha');

var describe = mocha.describe,
	it = mocha.it;

var allowedAlgorithms = require('../');

describe('ecdsa', function() {
	describe('P-256', function() {
		it('should only include "ES256"', function() {
			var algs = allowedAlgorithms({ kty: 'EC', crv: 'P-256' });

			expect(algs).to.deep.equal(['ES256']);
		});

		it('should allow "ES256"', function() {
			function fn() {
				return allowedAlgorithms({ kty: 'EC', crv: 'P-256', alg: 'ES256' });
			}

			expect(fn).not.to.throw;
			expect(fn()).to.deep.equal(['ES256']);
		});

		it('should throw for "ES384"', function() {
			function fn() {
				return allowedAlgorithms({ kty: 'EC', crv: 'P-256', alg: 'ES384' });
			}

			expect(fn).to.throw(/"jwk.alg"/);
		});

		it('should throw for "ES512"', function() {
			function fn() {
				return allowedAlgorithms({ kty: 'EC', crv: 'P-256', alg: 'ES512' });
			}

			expect(fn).to.throw(/"jwk.alg"/);
		});
	});

	describe('P-384', function() {
		it('should only include "ES384"', function() {
			var algs = allowedAlgorithms({ kty: 'EC', crv: 'P-384' });

			expect(algs).to.deep.equal(['ES384']);
		});

		it('should throw for "ES256"', function() {
			function fn() {
				return allowedAlgorithms({ kty: 'EC', crv: 'P-384', alg: 'ES256' });
			}

			expect(fn).to.throw(/"jwk.alg"/);
		});

		it('should allow "ES384"', function() {
			function fn() {
				return allowedAlgorithms({ kty: 'EC', crv: 'P-384', alg: 'ES384' });
			}

			expect(fn).not.to.throw;
			expect(fn()).to.deep.equal(['ES384']);
		});

		it('should throw for "ES512"', function() {
			function fn() {
				return allowedAlgorithms({ kty: 'EC', crv: 'P-384', alg: 'ES512' });
			}

			expect(fn).to.throw(/"jwk.alg"/);
		});
	});

	describe('P-521', function() {
		it('should only include "ES512"', function() {
			var algs = allowedAlgorithms({ kty: 'EC', crv: 'P-521' });

			expect(algs).to.deep.equal(['ES512']);
		});

		it('should throw for "ES256"', function() {
			function fn() {
				return allowedAlgorithms({ kty: 'EC', crv: 'P-521', alg: 'ES256' });
			}

			expect(fn).to.throw(/"jwk.alg"/);
		});

		it('should throw for "ES384"', function() {
			function fn() {
				return allowedAlgorithms({ kty: 'EC', crv: 'P-521', alg: 'ES384' });
			}

			expect(fn).to.throw(/"jwk.alg"/);
		});

		it('should allow "ES512"', function() {
			function fn() {
				return allowedAlgorithms({ kty: 'EC', crv: 'P-521', alg: 'ES512' });
			}

			expect(fn).not.to.throw;
			expect(fn()).to.deep.equal(['ES512']);
		});
	});

	describe('should throw for', function() {
		it('non-string curve', function() {
			function fn() {
				return allowedAlgorithms({ kty: 'EC', crv: {} });
			}

			expect(fn).to.throw(TypeError);
		});

		it('unknown curve', function() {
			function fn() {
				return allowedAlgorithms({ kty: 'EC', crv: 'foozleberries' });
			}

			expect(fn).to.throw(/"foozleberries"/);
		});
	});
});
