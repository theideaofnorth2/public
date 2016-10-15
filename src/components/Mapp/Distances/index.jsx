import React, { Component } from 'react';
import { connect } from 'react-redux';
import Distance from './Distance';
import css from './css';

export class MyComponent extends Component {
	render() {
		const content = this.props.interviews.map(interview => Object.assign(
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

const mapStateToProps = state => ({ interviews: state.interviews.data });

export default connect(mapStateToProps)(MyComponent);
