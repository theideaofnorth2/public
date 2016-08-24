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
	onMouseEnter = () => {
		if (this.props.app.view !== 'home') {
			this.props.dispatch({ type: 'EXPLORATION_MOUSE_OVER' });
		}
	}
	onMouseLeave = () => {
		if (this.props.app.view !== 'home') {
			this.props.dispatch({ type: 'EXPLORATION_MOUSE_LEAVE' });
		}
	}
	onTourClick() {
		this.props.dispatch({ type: 'EXPLORATION_CLICK', mode: 'tour' });
	}
	onInteractiveClick() {
		this.props.dispatch({ type: 'EXPLORATION_CLICK', mode: 'interactive' });
	}
	render() {
		const explorationClass = classnames(dropdownCss.dropdown, utilsCss.pointable, css.exploration, {
			[dropdownCss.hovered]: this.props.exploration.hovered,
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
		const en = this.props.app.language === 'en';
		const text = {
			tour: en ? 'Guided tour' : 'Tour guidé',
			tourDescription: en ? 'Take me on a journey' : 'Emmène-moi en voyage',
			interactive: en ? 'Interactive' : 'Interactif',
			interactiveDescription: en ? 'Explore independently' : 'Explorer indépendamment',
		};
		return (
			<div
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
				className={explorationClass}
			>
				<div
					className={tourClass}
					onClick={this.onTourClick}
				>
					{text.tour}
					<div className={css.description}>
						{text.tourDescription}
					</div>
				</div>
				<div
					className={interactiveClass}
					onClick={this.onInteractiveClick}
				>
					{text.interactive}
					<div className={css.description}>
						{text.interactiveDescription}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => Object.assign({
	app: state.app,
	exploration: state.exploration,
});

export default connect(mapStateToProps)(MyComponent);
