import { createSelector } from 'reselect';

const getInterviews = (state) => state.interviews.data;
const getCities = (state) => state.cities.data;

export const getFullInterviews = createSelector(
	[getInterviews, getCities],
	(interviews, cities) => {
		const flatInterviews = [...interviews.values()];
		const flatCities = cities;
		const fullInterviews = flatInterviews.map(interview => Object.assign({
			...interview,
			origin: flatCities.get(interview.origin),
			destination: flatCities.get(interview.destination),
		}));
		return fullInterviews;
	}
);
