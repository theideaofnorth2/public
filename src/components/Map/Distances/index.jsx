import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFullInterviews } from 'tion2/reducers/selectors/interviews';
import Distance from 'tion2/components/Map/Distance';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		const content = this.props.interviews.map(interview => Object.assign(
			<Distance
				key={interview._id}
				gmap={this.props.gmap}
				interview={interview}
			/>
		));
		return (
			<div className={css.distances}>
				{content}
			</div>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	interviews: getFullInterviews(state),
});

export default connect(mapStateToProps)(MyComponent);
