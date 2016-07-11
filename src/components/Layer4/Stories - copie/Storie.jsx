import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onClick = this.onClick.bind(this);
	}
	onClick() {
		this.props.dispatch({ type: 'STORIE_CLICK', index: this.props.index });
	}
	render() {
		let name;
		switch (this.props.storie.view) {
			case 'main':
				name = 'Canada';
				break;
			case 'origin': {
				const origin = this.props.origins.data.find(o => o._id === this.props.storie.originId);
				name = origin.name;
				break;
			}
			case 'egg': {
				const egg = this.props.eggs.data.find(o => o._id === this.props.storie.eggId);
				name = egg.name;
				break;
			}
			case 'interview': {
				const interview = this.props.interviews.data.find(
					o => o._id === this.props.storie.interviewId
				);
				name = interview.name;
				break;
			}
			default:
				name = 'Storie';
		}
		const thisClass = classnames(css.storie, {
			[css.future]: this.props.storie.future,
		});
		return (
			<div
				ref="storie"
				onClick={this.onClick}
				className={thisClass}
			>
				{name}
			</div>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	origins: state.origins,
	eggs: state.eggs,
	interviews: state.interviews,
});

export default connect(mapStateToProps)(MyComponent);
