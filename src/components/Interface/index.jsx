import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import exit from 'tion2/components/common/exit.svg';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
		this.onCloseOriginClick = this.onCloseOriginClick.bind(this);
		this.onCloseEggClick = this.onCloseEggClick.bind(this);
	}
	onCloseOriginClick() {
		this.props.dispatch({ type: 'ORIGIN_CLOSE' });
	}
	onCloseEggClick() {
		this.props.dispatch({ type: 'EGG_CLOSE', originId: this.props.origins.selectedOriginId });
	}
	render() {
		const interfaceClass = classnames(css.interface, {
			[css.animating]: this.props.map.animating,
		});
		const closeOriginClass = classnames(css.exit, {
			[css.visible]: this.props.map.level === 'origin' &&
				!this.props.map.zooming &&
				!this.props.eggs.selectedEggId,
		});
		const closeEggClass = classnames(css.exit, {
			[css.visible]: this.props.eggs.selectedEggId,
		});
		const menuClass = classnames(css.menu);
		return (
			<div className={interfaceClass}>
				<div className={menuClass}>
					<div className={css.about}>About</div>
					<div className={css.approach}>Approach</div>
					<div className={css.home}>Home</div>
				</div>
				<div
					onClick={this.onCloseOriginClick}
					className={closeOriginClass}
					dangerouslySetInnerHTML={{ __html: exit }}
				></div>
				<div
					onClick={this.onCloseEggClick}
					className={closeEggClass}
					dangerouslySetInnerHTML={{ __html: exit }}
				></div>
			</div>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(MyComponent);
