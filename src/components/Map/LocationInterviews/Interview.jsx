import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import AlignedOverlay from 'tion2/components/Google/AlignedOverlay';
import interview from './interview.svg';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onMount = this.onMount.bind(this);
		this.onClick = this.onClick.bind(this);
	}
	onMount() {
		this.setState({ mounted: true });
	}
	onClick() {
		this.props.dispatch({ type: 'INTERVIEW_CLICK', interviewId: this.props.interview._id });
	}
	render() {
		const isVisible = this.props.origins.selectedOriginId === this.props.interview.originId &&
			this.props.map.level === 'origin';
		const isPlaying = this.props.interviews.playingInterviewId === this.props.interview._id &&
			this.props.map.level === 'origin';
		const thisClass = classnames(
			css.interview, {
				[css.visible]: isVisible,
				[css.playing]: isPlaying,
			}
		);
		return (
			<AlignedOverlay
				gmap={this.props.gmap}
				lat={this.props.interview.lat}
				lng={this.props.interview.lng}
				vertical="bottom"
				horizontal="center"
				zIndex={isPlaying ? 5 : 0}
				onMount={this.onMount}
			>
				<div
					ref="interview"
					className={thisClass}
					onClick={this.onClick}
					dangerouslySetInnerHTML={{ __html: interview }}
				>
				</div>
			</AlignedOverlay>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	origins: state.origins,
	interviews: state.interviews,
	map: state.map,
});

export default connect(mapStateToProps)(MyComponent);
