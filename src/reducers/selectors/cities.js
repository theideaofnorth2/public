import { createSelector } from 'reselect';

const getCities = (state) => state.cities.data;
const getInterviews = (state) => state.interviews.data;

export const getFullCities = createSelector(
	[getCities, getInterviews],
	(cities, interviews) => {
		const flatCities = [...cities.values()];
		const flatInterviews = [...interviews.values()];
		const fullCities = flatCities.map(citie => Object.assign({
			...citie,
			originOf: flatInterviews.filter(interview => citie._id === interview.origin),
			destinationOf: flatInterviews.filter(interview => citie._id === interview.destination),
		}));
		return fullCities;
	}
);
