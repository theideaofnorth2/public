import { createSelector } from 'reselect';

const storiesData = state => state.stories.data;

export const lastPastIndex = createSelector(
	storiesData,
	stories => stories.filter(s => !s.future).length - 1
);
