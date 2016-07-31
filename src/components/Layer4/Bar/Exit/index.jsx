import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import exit from './exit.svg';
import utilsCss from 'tion2/components/common/utils';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
		this.onCloseClick = this.onCloseClick.bind(this);
	}
	onCloseClick() {
		this.props.dispatch({
			type: 'EXIT_CLICK',
			originId: this.props.origins.selectedOriginId,
			eggId: this.props.eggs.selectedEggId,
			interviewId: this.props.interviews.selectedInterviewId,
		});
	}
	render() {
		const exitClass = classnames(utilsCss.pointable, css.exit, {
			[css.visible]: this.props.origins.selectedOriginId &&
				this.props.exploration.mode === 'interactive',
		});
		return (
			<div
				onClick={this.onCloseClick}
				className={exitClass}
				dangerouslySetInnerHTML={{ __html: exit }}
			></div>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(MyComponent);
