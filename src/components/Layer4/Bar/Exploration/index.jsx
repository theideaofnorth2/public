import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import dropdownCss from 'tion2/components/common/dropdown.css';
import utilsCss from 'tion2/components/common/utils';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
		this.onTourClick = this.onTourClick.bind(this);
		this.onInteractiveClick = this.onInteractiveClick.bind(this);
	}
	onTourClick() {
		this.props.dispatch({ type: 'EXPLORATION_CLICK', mode: 'tour' });
	}
	onInteractiveClick() {
		this.props.dispatch({ type: 'EXPLORATION_CLICK', mode: 'interactive' });
	}
	render() {
		const explorationClass = classnames(dropdownCss.dropdown, utilsCss.pointable, css.exploration, {
			[css.centered]: this.props.exploration.centered,
			[css.open]: this.props.exploration.open,
			[css.split]: this.props.exploration.split,
			[css.descriptive]: this.props.exploration.descriptive,
		});
		const tourClass = classnames(css.tour, {
			[dropdownCss.selected]: this.props.exploration.mode === 'tour',
		});
		const interactiveClass = classnames(css.interactive, {
			[dropdownCss.selected]: this.props.exploration.mode === 'interactive',
		});
		return (
			<div className={explorationClass}>
				<div
					className={tourClass}
					onClick={this.onTourClick}
				>
					Guided Tour
					<div className={css.description}>Take me on a journey</div>
				</div>
				<div
					className={interactiveClass}
					onClick={this.onInteractiveClick}
				>
					Interactive
					<div className={css.description}>Explore independently</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(MyComponent);
