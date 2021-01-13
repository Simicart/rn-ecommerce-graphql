export const snake_to_capitalize = (str) => {
	return str
		.replace('_', ' ')
		.split('')
		.reduce((previousValue, currentValue) => {
			if (
				previousValue &&
				[' ', '/'].includes(previousValue[previousValue.length - 1])
			) {
				return previousValue.concat(currentValue.toLocaleUpperCase());
			}
			if (!previousValue) {
				return previousValue.concat(currentValue.toLocaleUpperCase());
			}
			return previousValue.concat(currentValue);
		}, '');
};
