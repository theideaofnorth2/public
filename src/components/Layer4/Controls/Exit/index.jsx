import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import exit from './exit.svg';
import utilsCss from 'tion2/components/common/utils';
import css from './css';

export class MyComponent extends Component {
	onCloseClick = () => {
		if (this.props.app.view === 'approach' || this.props.app.view === 'about') {
			this.props.dispatch({ type: 'EXIT_CONTENT_CLICK' });
		} else if (this.props.interviews.selectedInterviewId) {
			this.props.dispatch({
				type: 'EXIT_INTERVIEW_CLICK',
				eggId: this.props.eggs.selectedEggId,
				originId: this.props.origins.selectedOriginId,
			});
		} else if (this.props.eggs.selectedEggId) {
			this.props.dispatch({
				type: 'EXIT_EGG_CLICK',
				originId: this.props.origins.selectedOriginId,
			});
		} else if (this.props.origins.selectedOriginId) {
			this.props.dispatch({ type: 'EXIT_ORIGIN_CLICK' });
		}
	}
	render() {
		const exitClass = classnames(utilsCss.pointable, css.exit, {
			[css.visible]: (this.props.origins.selectedOriginId &&
				this.props.exploration.mode === 'interactive') ||
				this.props.app.view === 'about' ||
				this.props.app.view === 'approach',
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
const mapStateToProps = state => ({
	app: state.app,
	eggs: state.eggs,
	interviews: state.interviews,
	exploration: state.exploration,
	origins: state.origins,
});

export default connect(mapStateToProps)(MyComponent);
