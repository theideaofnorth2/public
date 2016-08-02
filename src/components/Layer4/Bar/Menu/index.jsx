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
			[css.hidden]: this.props.app.view === 'home',
		});
		return (
			<div className={menuClass}>
				<div
					className={css.home}
					onClick={this.onHomeClick}
				>
					Home
				</div>
				<div
					className={css.approach}
					onClick={this.onApproachClick}
				>
					Approach
				</div>
				<div
					className={css.about}
					onClick={this.onAboutClick}
				>
					About
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(MyComponent);
