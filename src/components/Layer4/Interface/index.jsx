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
		const interfaceClass = classnames(css.interface, {
			[css.animating]: this.props.map.animating,
		});
		const closeClass = classnames(css.exit, {
			[css.visible]: this.props.origins.selectedOriginId,
		});
		const menuClass = classnames(css.menu);
		return (
			<div className={interfaceClass}>
				<div className={menuClass}>
					<div className={css.about}>About</div>
					<div className={css.approach}>Approach</div>
					<div className={css.home}>Home</div>
				</div>
				<div
					onClick={this.onCloseClick}
					className={closeClass}
					dangerouslySetInnerHTML={{ __html: exit }}
				></div>
			</div>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(MyComponent);
