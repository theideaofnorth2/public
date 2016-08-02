import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import utilsCss from 'tion2/components/common/utils';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		const interfaceClass = classnames(utilsCss.pointable, css.interface, {
			[css.displayed]: this.props.map.animating || this.props.exploration.animating,
		});
		return (
			<div className={interfaceClass}></div>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(MyComponent);
