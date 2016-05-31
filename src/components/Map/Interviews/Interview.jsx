import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Overlay from 'tion2/components/Google/Overlay';
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
		this.props.dispatch({ type: 'INTERVIEW_CLICK', interview: this.props.interview._id });
	}
	render() {
		const thisClass = classnames(
			css.interview, {
				[css.visible]:
					this.props.map.selectedOrigin === this.props.interview.origin._id &&
					!this.props.map.centering,
				[css.playing]:
					this.props.map.selectedInterview === this.props.interview._id &&
					!this.props.map.centering,
			}
		);
		return (
			<Overlay
				gmap={this.props.gmap}
				southWestLat={this.props.interview.lat}
				southWestLng={this.props.interview.lng}
				northEastLat={this.props.interview.lat}
				northEastLng={this.props.interview.lng}
				onMount={this.onMount}
			>
				<div
					ref="interview"
					className={thisClass}
					onClick={this.onClick}
				>
					{this.props.interview.name}
				</div>
			</Overlay>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	map: state.map,
});

export default connect(mapStateToProps)(MyComponent);
