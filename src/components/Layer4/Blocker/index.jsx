import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import utilsCss from 'tion2/components/common/utils';
import css from './css';

export class MyComponent extends Component {
	render() {
		const blockerClass = classnames(utilsCss.pointable, css.blocker, {
			[css.displayed]: this.props.map.animating || this.props.exploration.animating,
		});
		return (
			<div className={blockerClass}></div>
		);
	}
}

const mapStateToProps = state => ({
	map: state.map,
	exploration: state.exploration,
});

export default connect(mapStateToProps)(MyComponent);
