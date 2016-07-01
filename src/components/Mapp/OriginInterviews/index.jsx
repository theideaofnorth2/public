import React, { Component } from 'react';
import { connect } from 'react-redux';
import AlignedOverlay from 'tion2/components/Mapp/Google/AlignedOverlay';
import Interview from 'tion2/components/common/Interview';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		const content = this.props.interviews.originData
			.map(interview => {
				const isPlaying = this.props.interviews.selectedInterviewId === interview._id &&
					this.props.map.level === 'origin';
				return (
					<AlignedOverlay
						key={interview._id}
						gmap={this.props.gmap}
						lat={interview.lat}
						lng={interview.lng}
						vertical="bottom"
						horizontal="center"
						zIndex={isPlaying ? 5 : 0}
					>
						<Interview
							interview={interview}
						/>
					</AlignedOverlay>
				);
			});
		return !this.props.gmap ? null : (
			<div>
				{content}
			</div>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	interviews: state.interviews,
	map: state.map,
});

export default connect(mapStateToProps)(MyComponent);
