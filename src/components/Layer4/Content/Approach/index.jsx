import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import utilsCss from 'tion2/components/common/utils';
import contentCss from '../css';
import css from './css';

export class MyComponent extends Component {
	render() {
		const thisClass = classnames(utilsCss.pointable, contentCss.contentPage, {
			[contentCss.visible]: this.props.app.view === 'approach',
		});
		const { language } = this.props.app;
		const i18nJsx = {
			en: (
				<div className={css.approach}>
					<h1>Approach</h1>
					<p>Content for the approach page</p>
				</div>
			),
			fr: (
				<div className={css.approach}>
					<h1>Approche</h1>
					<p>Contenu de la page approche</p>
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
