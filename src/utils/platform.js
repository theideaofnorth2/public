import bowser from 'bowser';

export const isDesktop = !bowser.mobile && !bowser.tablet;
export const isGoodBrowser = bowser.check({
	chrome: '50',
	firefox: '45',
	safari: '9',
	edge: '12',
});

export const isSupported = isDesktop && isGoodBrowser;

