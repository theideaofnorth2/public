import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onClick = this.onClick.bind(this);
	}
	onClick() {
		this.props.dispatch({ type: 'STORIE_CLICK', index: this.props.index });
	}
	render() {
		const thisClass = classnames(css.storie, {
			[css.future]: this.props.storie.future,
		});
		return (
			<div
				ref="storie"
				onClick={this.onClick}
				className={thisClass}
			>
				{this.props.name}
			</div>
		);
	}
}

export default connect(state => state)(MyComponent);
