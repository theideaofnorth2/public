import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import utilsCss from 'tion2/components/common/utils';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
		this.onHomeClick = this.onHomeClick.bind(this);
		this.onApproachClick = this.onApproachClick.bind(this);
		this.onAboutClick = this.onAboutClick.bind(this);
	}
	onHomeClick() {
		this.props.dispatch({ type: 'MENU_HOME_CLICK' });
	}
	onApproachClick() {
		this.props.dispatch({ type: 'MENU_APPROACH_CLICK' });
	}
	onAboutClick() {
		this.props.dispatch({ type: 'MENU_ABOUT_CLICK' });
	}
	render() {
		const menuClass = classnames(utilsCss.pointable, css.menu, {
			[css.displayed]: this.props.app.view !== 'intro' &&
				this.props.app.view !== 'waiting' &&
				this.props.app.view !== 'home',
		});
		const approachClass = classnames(css.approach, {
			[css.selected]: this.props.app.view === 'approach',
		});
		const aboutClass = classnames(css.about, {
			[css.selected]: this.props.app.view === 'about',
		});
		const { language } = this.props.app;
		const i18nJsx = {
			home: { en: 'Home', fr: 'Accueil' },
			approach: { en: 'Approach', fr: 'Approche' },
			about: { en: 'About', fr: 'À propos' },
		};
		return (
			<div className={menuClass}>
				<div
					className={css.home}
					onClick={this.onHomeClick}
				>
					{i18nJsx.home[language]}
				</div>
				<div
					className={approachClass}
					onClick={this.onApproachClick}
				>
					{i18nJsx.approach[language]}
				</div>
				<div
					className={aboutClass}
					onClick={this.onAboutClick}
				>
					{i18nJsx.about[language]}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => Object.assign({
	app: state.app,
});

export default connect(mapStateToProps)(MyComponent);
