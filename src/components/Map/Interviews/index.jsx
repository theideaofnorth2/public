import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFullInterviews } from 'tion2/reducers/selectors/interviews';
import Interview from './Interview';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	// componentWillReceiveProps(nextProps) {
	// }
	render() {
		const content = this.props.interviews.map(interview => Object.assign(
			<Interview
				key={interview._id}
				gmap={this.props.gmap}
				interview={interview}
			/>
		));
		return (
			<div>
				{content}
			</div>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	map: state.map,
	interviews: getFullInterviews(state),
});

export default connect(mapStateToProps)(MyComponent);
