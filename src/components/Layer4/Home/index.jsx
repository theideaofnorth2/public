import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import layer4Css from '../css';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
		this.onTourClick = this.onTourClick.bind(this);
		this.onInteractiveClick = this.onInteractiveClick.bind(this);
	}
	onTourClick() {
		this.props.dispatch({ type: 'HOME_CHOICE', choice: 'guided' });
	}
	onInteractiveClick() {
		this.props.dispatch({ type: 'HOME_CHOICE', choice: 'interactive' });
	}
	render() {
		const thisClass = classnames(layer4Css.pointable, css.home, {
			[css.visible]: this.props.app.home,
		});
		return (
			<div className={thisClass}>
				<div className={css.content}>
					<div onClick={this.onTourClick}>
						<h2>Guided Tour</h2>
						<p>Take me on a journey</p>
					</div>
					<div onClick={this.onInteractiveClick}>
						<h2>Interactive</h2>
						<p>Explore independently</p>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	app: state.app,
});

export default connect(mapStateToProps)(MyComponent);
