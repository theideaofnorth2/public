import { createSelector } from 'reselect';

const getCities = (state) => [...state.cities.data.values()];
const getInterviews = (state) => [...state.interviews.data.values()];

export const getOrigins = createSelector(
	[getCities, getInterviews],
	(cities, interviews) => {
		const fullCities = cities.map(citie => {
			const originOf = interviews.filter(interview => citie._id === interview.origin);
			const destinationOf = interviews.filter(interview => citie._id === interview.destination);
			if (originOf.length === 0 || destinationOf.length !== 0) return null;
			return Object.assign({
				...citie,
				originOf,
			});
		});
		return fullCities.filter(citie => citie !== null);
	}
);

export const getDestinations = createSelector(
	[getCities, getInterviews],
	(cities, interviews) => {
		const fullCities = cities.map(citie => {
			const originOf = interviews.filter(interview => citie._id === interview.origin);
			const destinationOf = interviews.filter(interview => citie._id === interview.destination);
			if (destinationOf.length === 0 || originOf.length !== 0) return null;
			return Object.assign({
				...citie,
				destinationOf,
			});
		});
		return fullCities.filter(citie => citie !== null);
	}
);
