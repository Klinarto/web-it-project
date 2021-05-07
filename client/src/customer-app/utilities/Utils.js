export const objectIsEmpty = (object) => {
	if (Object.entries(object).length > 0) {
		return false;
	} else {
		return true;
	}
};
