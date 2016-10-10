import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { lastPastIndex } from 'tion2/reducers/selectors/stories';
import utilsCss from 'tion2/components/common/utils';
import css from './css';

export class MyComponent extends Component {
	onPreviousClick = () => {
		this.props.dispatch({ type: 'TOURER_CLICK', direction: 'previous' });
	}
	onNextClick = () => {
		this.props.dispatch({ type: 'TOURER_CLICK', direction: 'next' });
	}
	render() {
		const thisClass = classnames(css.tourer, {
			[css.displayed]: this.props.app.view === 'mapp' &&
				this.props.exploration.mode === 'tour',
		});
		const previousClass = classnames(css.previous, {
			[utilsCss.pointable]: this.props.exploration.mode === 'tour',
			[css.visible]: this.props.lastPastIndex > 0,
		});
		const nextClass = classnames(css.next, {
			[utilsCss.pointable]: this.props.exploration.mode === 'tour',
			[css.visible]: this.props.lastPastIndex < this.props.stories.data.length - 1,
		});
		return (
			<div className={thisClass}>
				<div
					onClick={this.onPreviousClick}
					className={previousClass}
				>
				</div>
				<div
					onClick={this.onNextClick}
					className={nextClass}
				>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	app: state.app,
	stories: state.stories,
	exploration: state.exploration,
	lastPastIndex: lastPastIndex(state),
});


export default connect(mapStateToProps)(MyComponent);
