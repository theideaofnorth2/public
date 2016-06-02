import React, { Component } from 'react';
import { connect } from 'react-redux';
import Distance from './Distance';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		const content = this.props.interviews.data.map(interview => Object.assign(
			<Distance
				key={interview._id}
				gmap={this.props.gmap}
				interview={interview}
			/>
		));
		return !this.props.gmap ? null : (
			<div className={css.distances}>
				{content}
			</div>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	interviews: state.interviews,
});

export default connect(mapStateToProps)(MyComponent);
