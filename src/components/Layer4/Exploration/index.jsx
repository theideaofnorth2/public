import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import dropdownCss from 'tion2/components/common/dropdown.css';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
		this.onTourClick = this.onTourClick.bind(this);
		this.onInteractiveClick = this.onInteractiveClick.bind(this);
	}
	onTourClick() {
		this.props.dispatch({ type: 'EXPLORATION_SELECTION', exploration: 'tour' });
	}
	onInteractiveClick() {
		this.props.dispatch({ type: 'EXPLORATION_SELECTION', exploration: 'interactive' });
	}
	render() {
		const explorationClass = classnames(dropdownCss.dropdown, css.exploration, {
			[css.home]: this.props.app.home,
		});
		const tourClass = classnames(css.tour, {
			[dropdownCss.selected]: this.props.app.exploration === 'tour',
		});
		const interactiveClass = classnames(css.interactive, {
			[dropdownCss.selected]: this.props.app.exploration === 'interactive',
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
