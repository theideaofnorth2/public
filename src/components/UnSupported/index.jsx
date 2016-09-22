import React from 'react';
import { isDesktop, browserName } from 'tion2/utils/platform';
import css from './css';

const l = navigator.language === 'fr' ? 'fr' : 'en';

const text = {
	headline: {
		en: 'We\'re sorry!',
		fr: 'Nous sommes désolés!',
	},
};

const MyComponent = () => {
	const reason = isDesktop
	? (
		<div className={css.reason}>
			<i>The Idea Of North 2.0</i> isn't supported on your version of {browserName}.
			<br /><br />
			<a className={css.link} href="http://outdatedbrowser.com/en">Upgrade your browser here</a>.
		</div>
	) : (
		<div className={css.reason}>
			<i>The Idea Of North 2.0</i> was designed for desktop computers.
			<br /><br />
			Come back later to see us!
		</div>
	);
	return (
		<div className={css.unsupported}>
			<div className={css.headline}>
				{text.headline[l]}
			</div>
			{reason}
		</div>
	);
};

export default MyComponent;
