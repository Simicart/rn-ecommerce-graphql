const md5 = require('md5');

const hash = (value) => {
	if (['string', 'undefined'].includes(typeof value) || value === null) {
		return md5(value);
	}
	else {
		return md5(JSON.stringify(value));
	}
};

const recursionMarker = md5('__This_is_a_recursion_mark__');

const de_circularize = (dirty_data) => {
	const valueCache = [];
	
	const recursive_cleaning = (chunk) => {
		if (['boolean', 'number', 'string']
			.indexOf(typeof (chunk)) >= 0
		) { return hash(JSON.stringify(chunk)); }
		
		if (typeof chunk === 'function') {
			return hash(chunk);
		}
		if (chunk === null) {
			return 'null';
		}
		if (chunk === undefined) {
			return 'undefined';
		}
		
		//Now chunk can only be object and not null
		valueCache.push(chunk);
		const newObj = {};
		Object.entries(chunk).forEach(([key, value]) => {
			if (valueCache.includes(value)) {
				newObj[key] = valueCache.indexOf(value).toString() + recursionMarker;
			}
			else {
				newObj[key] = recursive_cleaning(value);
			}
		});
		return newObj;
	};
	
	return recursive_cleaning(dirty_data);
};

// A safe hash function in case of circular object.
// <pre>currently react native component has Equal hash ( hash(View) == hash(Text)</pre>
const safeHash = (data) => {
	return hash(JSON.stringify(de_circularize(data)));
};

export {safeHash, hash};
