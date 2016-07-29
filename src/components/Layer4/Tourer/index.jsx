import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import utilsCss from 'tion2/components/common/utils';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
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
		});
		const previousClass = classnames(css.previous, {
			[utilsCss.pointable]: this.props.exploration.mode === 'tour',
		});
		const nextClass = classnames(css.next, {
			[utilsCss.pointable]: this.props.exploration.mode === 'tour',
		});
		return (
			<div className={thisClass}>
				<div
					onClick={this.onPreviousClick}
					className={previousClass}
				>&lt;
				</div>
				<div
					onClick={this.onNextClick}
					className={nextClass}
				>&gt;
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(MyComponent);
