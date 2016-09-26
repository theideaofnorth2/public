import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import utilsCss from 'tion2/components/common/utils';
import contentCss from '../css';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		const thisClass = classnames(utilsCss.pointable, contentCss.content, {
			[contentCss.visible]: this.props.app.view === 'about',
		});
		const en = this.props.app.language === 'en';
		const text = en ? (
			<div className={css.about}>
				<h1>About</h1>
				<p>Content for the about page</p>
			</div>
		) : (
			<div className={css.about}>
				<h1>À propos</h1>
				<p>Contenu de la page à propos</p>
			</div>
		);
		return (
			<div className={thisClass}>
				{text}
			</div>
		);
	}
}

const mapStateToProps = state => Object.assign({
	app: state.app,
});

export default connect(mapStateToProps)(MyComponent);