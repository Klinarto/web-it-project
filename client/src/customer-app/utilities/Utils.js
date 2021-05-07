export const objectIsEmpty = (object) => {
	if (Object.entries(object).length > 0) {
		return false;
	} else {
		return true;
	}
};

export const parseDate = (date) => {
	return `${date.getHours()}:${date.getMinutes()} on ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};
