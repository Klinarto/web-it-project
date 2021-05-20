import haversine from "haversine-distance";

// returns true if object is empty
export const objectIsEmpty = (object) => {
	return Object.keys(object).length === 0;
};

// parseISO date to HH:MM d/m/yyyy format
export const parseDate = (date) => {
	return `${date.getHours()}:${date.getMinutes()} on ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};
// calculate distance (in meters) between two latlng points
export const calculateDistance = (to, from) => {
	if (!objectIsEmpty(to) && !objectIsEmpty(from)) {
		return haversine(to, from);
	}
};
