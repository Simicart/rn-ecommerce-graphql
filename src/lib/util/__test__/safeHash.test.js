import React from 'react';
import {Text, View} from 'react-native';
import {safeHash} from '../safeHash.js';

describe('Check safe Hash', () => {
	it('can hash null', function() {
		expect(safeHash(null)).toBeTruthy();
	});
	
	it('can hash undefined ', function() {
		expect(safeHash(undefined)).toBeTruthy();
	});
	
	it('can hash string ', function() {
		expect(safeHash('Hello there')).toBeTruthy();
	});
	
	it('can hash number ', function() {
		expect(safeHash(177)).toBeTruthy();
	});
	
	it('can hash empty object', function() {
		expect(safeHash({})).toBeTruthy();
	});
	
	it('can hash object', function() {
		expect(safeHash({x: [], y: null, t: 1111, k: {p: {l: [1, 2, 3]}, o: -1}})).toBeTruthy();
	});
	
	it('can hash function', function() {
		const x = function() {return 1;};
		expect(safeHash(x)).toBeTruthy();
	});
	
	it('can hash anonymous function', function() {
		expect(safeHash(() => 1)).toBeTruthy();
	});
	
	it('can hash class', function() {
		class a {
		}
		
		expect(safeHash(a)).toBeTruthy();
	});
	
	it('can hash circular object', function() {
		let a = {};
		a = {a: a};
		expect(safeHash(a)).toBeTruthy();
	});
	
	it('can hash circular class', function() {
		class a {
			constructor() {
				this.a = this;
			}
		}
		
		expect(safeHash(a)).toBeTruthy();
	});
	
	it('can hash circular function', function() {
		function a() {
			let x = this;
		}
		
		expect(safeHash(a)).toBeTruthy();
	});
	
	it('can hash circular object not equal', function() {
		let a = {};
		a = {a: a};
		expect(safeHash(a) === safeHash({})).not.toBeTruthy();
	});
	
	it('can hash circular object equal', function() {
		let a = {};
		a = {a: a};
		expect(safeHash(a)).toEqual(safeHash(a));
	});
	
	it('can hash React Native Component', function() {
		let a = Text;
		expect(safeHash(Text)).toBeTruthy();
	});
	
	it('can hash React Native Component not equal', function() {
		let a = Text;
		expect(safeHash(Text) === safeHash(View)).not.toBeTruthy();
	});
	
	it('can hash React Native Component equal', function() {
		let a = Text;
		expect(safeHash(Text) === safeHash(Text)).toBeTruthy();
	});
	
	it('can hash React Native Element', function() {
		let a = <Text>Hello</Text>;
		expect(safeHash(a)).toBeTruthy();
	});
	
	it('can hash React Native Element not equal', function() {
		let a = <Text>Hello</Text>;
		let b = <Text>Hello_there</Text>;
		expect(safeHash(a) === safeHash(b)).not.toBeTruthy();
	});
	
	it('can hash React Native Element not equal with props', function() {
		let a = <Text>Hello</Text>;
		let b = <Text x={1}>Hello</Text>;
		expect(safeHash(a) === safeHash(b)).not.toBeTruthy();
	});
	
	it('can hash React Native Element equal', function() {
		let a = <Text>Hello</Text>;
		let b = <Text>Hello</Text>;
		expect(safeHash(a) === safeHash(b)).toBeTruthy();
	});
});
