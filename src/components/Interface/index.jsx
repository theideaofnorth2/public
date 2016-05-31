import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
		this.onCloseClick = this.onCloseClick.bind(this);
	}
	onCloseClick() {
		this.props.dispatch({ type: 'ORIGIN_CLOSE' });
	}
	render() {
		const closeClass = classnames(css.close, {
			[css.visible]: this.props.map.selectedOrigin !== null,
		});
		const menuClass = classnames(css.menu);
		return (
			<div className={css.interface}>
				<div className={menuClass}>
					<div className={css.home}>Home</div>
					<div className={css.about}>About</div>
					<div className={css.contact}>Contact</div>
				</div>
				<div
					onClick={this.onCloseClick}
					className={closeClass}
				>X</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(MyComponent);
