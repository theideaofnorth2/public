import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import layer4Css from '../css';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		const thisClass = classnames(layer4Css.pointable, css.home, {
			[css.visible]: this.props.app.home,
		});
		return (
			<div className={thisClass}></div>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	app: state.app,
});

export default connect(mapStateToProps)(MyComponent);
