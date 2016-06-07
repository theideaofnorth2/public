import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import AlignedOverlay from 'tion2/components/Google/AlignedOverlay';
import DestinationInterview from './DestinationInterview';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
	}
	onMouseEnter() {
		this.props.dispatch({
			type: 'DESTINATION_MOUSE_ENTER',
			destinationId: this.props.destination._id,
		});
	}
	onMouseLeave() {
		this.props.dispatch({ type: 'DESTINATION_MOUSE_LEAVE' });
	}
	onMouseEnterName() {
	}
	render() {
		const interviews = this.props.destination.interviews.map(interview => Object.assign(
			<DestinationInterview key={interview._id} interview={interview} />
		));
		const destinationClass = classnames(
			css.destination,
			css[this.props.destination.vertical],
			css[this.props.destination.horizontal],
			{
				[css.hover]: this.props.destinations.hoveredDestinationId === this.props.destination._id,
			},
		);
		return (
			<AlignedOverlay
				gmap={this.props.gmap}
				lat={this.props.destination.lat}
				lng={this.props.destination.lng}
				vertical={this.props.destination.vertical}
				horizontal={this.props.destination.horizontal}
			>
				<div
					className={destinationClass}
					onMouseEnter={this.onMouseEnter}
					onMouseLeave={this.onMouseLeave}
				>
					<div className={css.content}>
						<div>
							<div className={css.nameContainer}>
								<span className={css.name}>
									{this.props.destination.name}
								</span>
							</div>
							<div className={css.interviews}>
								{interviews}
							</div>
						</div>
					</div>
					<div className={css.circle}></div>
				</div>
			</AlignedOverlay>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(MyComponent);