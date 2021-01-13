import React from 'react';
import { Text } from 'react-native';
import { isDeeplyEqual } from '../isObjectDeeplyEqual.js';

test('null false test', () => {
	const a = null;
	const b = 1;
	expect(isDeeplyEqual(a, b)).toBe(false);
});

test('null true test', () => {
	const a = null;
	const b = null;
	expect(isDeeplyEqual(a, b)).toBe(true);
});

test('undefined false test', () => {
	const a = undefined;
	const b = null;
	expect(isDeeplyEqual(a, b)).toBe(false);
});

test('undefined true test', () => {
	const a = undefined;
	const b = undefined;
	expect(isDeeplyEqual(a, b)).toBe(true);
});

test('number true test', () => {
	const a = 1;
	const b = 1;
	expect(isDeeplyEqual(a, b)).toBe(true);
});

test('number false test', () => {
	const a = 1;
	const b = 3;
	expect(isDeeplyEqual(a, b)).toBe(false);
});

test('string empty test', () => {
	const a = '';
	const b = '';
	expect(isDeeplyEqual(a, b)).toBe(true);
});

test('string true test', () => {
	const a = 'abc';
	const b = 'abc';
	expect(isDeeplyEqual(a, b)).toBe(true);
});

test('string false test', () => {
	const a = 'abc';
	const b = 'abc_def';
	expect(isDeeplyEqual(a, b)).toBe(false);
});

test('empty object test', () => {
	const a = {};
	const b = {};
	expect(isDeeplyEqual(a, b)).toBe(true);
});

test('object false test', () => {
	const a = { a: 1 };
	const b = { b: 2 };
	expect(isDeeplyEqual(a, b)).toBe(false);
});

test('object true test', () => {
	const a = { a: 1 };
	const b = { a: 1 };
	expect(isDeeplyEqual(a, b)).toBe(true);
});

test('nested object true test', () => {
	const a = { a: {}, b: [1, 2, 3], c: { d: { e: 0 } } };
	const b = { a: {}, b: [1, 2, 3], c: { d: { e: 0 } } };
	expect(isDeeplyEqual(a, b)).toBe(true);
});

test('nested object false test', () => {
	const a = { a: {}, b: [1, 2, 3], c: { d: { e: 0 } } };
	const b = { a: {}, b: [1, 2, 3], c: { d: { e: 0 }, e: 0 } };
	expect(isDeeplyEqual(a, b)).toBe(false);
});

test('React Component test', () => {
	const a = <Text>Hello</Text>;
	const b = Object.create(a);
	expect(isDeeplyEqual(a, b)).toBe(true);
});

test('React Component in Object asymmetric false test', () => {
	const a = {
		a: <Text>Hello</Text>,
	};
	const b = Object.create(a);
	expect(isDeeplyEqual(a, b)).toBe(false);
});

test('React Component in Object false test', () => {
	const a = {
		a: <Text>Hello</Text>,
	};
	const b = {
		a: 1,
	};
	expect(isDeeplyEqual(a, b)).toBe(false);
});

test('React Component in Object true test', () => {
	const a = {
		a: <Text>Hello</Text>,
	};
	const b = {
		a: <Text>Hello</Text>,
	};
	expect(isDeeplyEqual(a, b)).toBe(true);
});

test('React Component in nested Object false test', () => {
	const a = {
		a: <Text>Hello</Text>,
		params: {
			x: 3,
			y: {
				something: <Text>Yes</Text>,
			},
		},
	};
	const b = {
		a: <Text>Hello</Text>,
		params: {
			x: 3,
			y: {
				something: <Text>Yes</Text>,
			},
			z: {
				even_deeper: <Text>Yes</Text>,
			},
		},
	};
	expect(isDeeplyEqual(a, b)).toBe(false);
});

test('React Component in nested Object true test', () => {
	const a = {
		a: <Text>Hello</Text>,
		params: {
			x: 3,
			y: {
				something: <Text>Yes</Text>,
			},
			z: {
				even_deeper: <Text>Yes</Text>,
			},
			a: [<Text>x</Text>, <Text>y</Text>, <Text>z</Text>],
		},
	};
	const b = {
		a: <Text>Hello</Text>,
		params: {
			x: 3,
			y: {
				something: <Text>Yes</Text>,
			},
			z: {
				even_deeper: <Text>Yes</Text>,
			},
			a: [<Text>x</Text>, <Text>y</Text>, <Text>z</Text>],
		},
	};
	expect(isDeeplyEqual(a, b)).toBe(true);
});
