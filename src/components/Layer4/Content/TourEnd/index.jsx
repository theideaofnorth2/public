import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import utilsCss from 'tion2/components/common/utils';
import contentCss from '../css';
import css from './css';

export class MyComponent extends Component {
	render() {
		const thisClass = classnames(utilsCss.pointable, contentCss.contentPage, {
			[contentCss.visible]: this.props.app.view === 'tourEnd',
		});
		const { language } = this.props.app;
		const i18nJsx = {
			en: (
				<div className={css.tourEnd}>
					<h1>Tour End</h1>
					<p>Content for the tour end</p>
				</div>
			),
			fr: (
				<div className={css.tourEnd}>
					<h1>Fin du tour</h1>
					<p>Contenu pour la fin du tour</p>
				</div>
			),
		};
		return (
			<div className={thisClass}>
				{i18nJsx[language]}
			</div>
		);
	}
}

const mapStateToProps = state => ({ app: state.app });

export default connect(mapStateToProps)(MyComponent);
