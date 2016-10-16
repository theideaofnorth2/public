import React from 'react';
import { isDesktop, browserName } from 'tion2/utils/platform';
import css from './css';

const language = window.navigator.language === 'fr' ? 'fr' : 'en';
const platform = isDesktop ? 'desktop' : 'mobile';

const i18nJsx = {
	headline: {
		en: 'We\'re sorry!',
		fr: 'Nous sommes désolés!',
	},
	reason: {
		desktop: {
			en: (
				<div className={css.reason}>
					<i>The Idea Of North 2.0</i> isn{'\''}t supported on your version of {browserName}.
					<br /><br />
					<a className={css.link} href="http://outdatedbrowser.com/en">Upgrade your browser here</a>.
				</div>
			),
			fr: (
				<div className={css.reason}>
					<i>The Idea Of North 2.0</i> n{'\''}est pas supporté par votre version de {browserName}.
					<br /><br />
					<a className={css.link} href="http://outdatedbrowser.com/en">Mettez votre navigateur à jour ici</a>.
				</div>
			),
		},
		mobile: {
			en: (
				<div className={css.reason}>
					<i>The Idea Of North 2.0</i> was designed for desktop computers.
					<br /><br />
					Come back later to see us!
				</div>
			),
			fr: (
				<div className={css.reason}>
					<i>The Idea Of North 2.0</i> a été conçue pour les ordinateurs fixes.
					<br /><br />
					Revenez nous voir plus tard!
				</div>
			),
		},
	},
};

const MyComponent = () => (
	<div className={css.unsupported}>
		<div className={css.headline}>
			{i18nJsx.headline[language]}
		</div>
		{i18nJsx.reason[platform][language]}
	</div>
);

export default MyComponent;
