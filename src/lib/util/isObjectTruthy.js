import { isValidElement } from 'react';

export const isObjectTruthy = (o = {}) => {
	if (typeof o === 'number') {
		return true;
	}
	if (isValidElement(o)) {
		return true;
	}
	return o ? Object.keys(o).length !== 0 : false;
};
