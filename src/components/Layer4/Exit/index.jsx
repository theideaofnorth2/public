import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import exit from 'tion2/components/common/exit.svg';
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
		const exitClass = classnames(css.exit, {
			[css.visible]: this.props.origins.selectedOriginId,
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
