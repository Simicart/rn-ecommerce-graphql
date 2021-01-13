import { isValidElement } from 'react';

export const isDeeplyEqual = (a, b) => {
	if (isValidElement(a) && isValidElement(b)) {
		return true;
	} else if (isValidElement(a) || isValidElement(b)) {
		return false;
	}

	if (a instanceof Object && b instanceof Object) {
		for (const name in a) {
			if (!b.hasOwnProperty(name)) {
				return false;
			}
			if (!isDeeplyEqual(a[name], b[name])) {
				return false;
			}
		}
		for (const name in b) {
			if (!a.hasOwnProperty(name)) {
				return false;
			}
		}
	} else if (a instanceof Object || b instanceof Object) {
		return false;
	} else {
		return a === b;
	}
	return true;
};
