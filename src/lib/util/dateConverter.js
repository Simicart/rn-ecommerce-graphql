//paddy(123,5) -> '00123', paddy(123,5,'#') -> '##123'
const paddy = (num: number, padLength: number, padChar?: string): string => {
	const pad_char = typeof padChar !== 'undefined' ? padChar[0] : '0';
	const pad = new Array(1 + padLength).join(pad_char);
	return (pad + num).slice(-pad.length);
};

//format: MM/dd/YYYY -> date
const stringToDate = (dateString: string): Date => {
	try {
		return new Date(dateString);
	} catch (e) {
		console.warn(
			'Something\'s wrong with transform string->date, returning default.\n' +
			`Error: ${e.toString()}`,
		);
		return new Date();
	}
};

//format date -> MM-dd-YYYY
const dateToString = (date) => {
	return (
		paddy(date.getMonth() + 1, 2) +
		'/' +
		paddy(date.getDate(), 2) +
		'/' +
		date.getFullYear()
	);
};

//format: 09:01 / 20/10 -> Date data type. Default date is 2020/12/24
// if is24HourMode -> 09:01AM to Date data type
const stringToTime = (str: string, is24HourMode = true): Date => {
	if (is24HourMode) {
		const [hour, rest] = str.split(':');
		const isAM = rest.slice(-2).toLocaleUpperCase() === 'AM';
		const minute = parseInt(rest.slice(0, 2));
		if (isAM) {
			return new Date(2020, 12, 24, parseInt(hour), minute);
		}
		else {
			new Date(2020, 12, 24, parseInt(hour) + 12, minute);
		}
	}
	else {
		const [hour, minute] = str.split(':').map(x => parseInt(x));
		if (!(hour >= 0 && hour <= 24 && minute >= 0 && minute <= 60)) {
			console.warn('Invalid date conversion in stringToDate: ' + str);
		}
		return new Date(2020, 12, 24, hour, minute);
	}
};

const timeToString = (time, is24HourMode = true) => {
	const hour = time.getHours();
	const minute = time.getMinutes();
	if (is24HourMode) {
		if (hour <= 12) {
			return (paddy(hour, 2) + ':' + paddy(minute, 2) + 'AM');
		}
		else {
			return (paddy(hour - 12, 2) + ':' + paddy(minute, 2) + 'PM');
		}
	}
	else {
		return (
			paddy(hour, 2)
			+ ':'
			+ paddy(minute, 2)
		);
	}
};

// Date Type => 24/12/1999 21:06
//<p>If is24Hours, Date type => 24/12/1999 09:16PM</p>
const dateTimeToString = (date, is24Hours = true) => {
	const dayDate = dateToString(date);
	const timeDate = timeToString(date, is24Hours);
	return `${dayDate} ${timeDate}`;
};

const stringToDateTime = (str, is24Hours = true) => {
	const [dayString, timeString] = str.split(' ');
	const [month, day, year] = dayString.split('/').map(x => parseInt(x));
	const [hour, rest] = timeString.split(':');
	const minute = parseInt(rest.slice(0, 2));
	const isAM = rest.slice(-2).toLocaleUpperCase() === 'AM';
	return new Date(year, month, day,
		(is24Hours ? (parseInt(hour) + (isAM ? 0 : 12)) : parseInt(hour)),
		minute,
	);
};

// return [ x_to_string, string_to_x ]
const resolveDateConverter = (mode: string, is24Hours = true): Array<()=>any> => {
	switch (mode) {
		case 'date':
			return [dateToString, stringToDate];
		case 'time':
			return [
				(x) => timeToString(x, is24Hours),
				(x) => stringToTime(x, is24Hours),
			];
		case 'datetime':
			return [
				(x) => dateTimeToString(x, is24Hours),
				(x) => stringToDateTime(x, is24Hours),
			];
		default:
			console.warn('Invalid datetime mode converted: ' + mode);
			return [(x) => x, (x) => x];
	}
};

export {
	stringToDate,
	dateToString,
	stringToTime,
	timeToString,
	dateTimeToString,
	stringToDateTime,
	resolveDateConverter,
};
