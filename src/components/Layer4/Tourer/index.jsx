import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { lastPastIndex } from 'tion2/reducers/selectors/stories';
import utilsCss from 'tion2/components/common/utils';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.onPreviousClick = this.onPreviousClick.bind(this);
		this.onNextClick = this.onNextClick.bind(this);
	}
	onPreviousClick() {
		this.props.dispatch({ type: 'TOURER_CLICK', direction: 'previous' });
	}
	onNextClick() {
		this.props.dispatch({ type: 'TOURER_CLICK', direction: 'next' });
	}
	render() {
		const thisClass = classnames(css.tourer, {
			[css.displayed]: this.props.exploration.mode === 'tour',
			[utilsCss.pointable]: this.props.exploration.mode === 'tour',
			[css.mouseMoving]: this.props.app.mouseMoving,
		});
		const previousClass = classnames(css.previous, {
			[css.visible]: this.props.lastPastIndex > 0,
		});
		const nextClass = classnames(css.next, {
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

const mapStateToProps = (state) => Object.assign({
	app: state.app,
	stories: state.stories,
	exploration: state.exploration,
	lastPastIndex: lastPastIndex(state),
});


export default connect(mapStateToProps)(MyComponent);
