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
		const thisClass = classnames(utilsCss.pointable, css.topBar, {
			[css.home]: this.props.app.home,
		});
		return (
			<div className={thisClass}></div>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(MyComponent);
