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
			destination: this.props.destination._id,
		});
	}
	onMouseLeave() {
		this.props.dispatch({
			type: 'DESTINATION_MOUSE_LEAVE',
			destination: this.props.destination._id,
		});
	}
	onMouseEnterName() {
	}
	render() {
		const destinationOf = this.props.destination.destinationOf.map(interview => Object.assign(
			<DestinationInterview key={interview._id} interview={interview} />
		));
		const citieClass = classnames(
			css.citie,
			css[this.props.destination.vertical],
			css[this.props.destination.horizontal],
			{
				[css.hover]: this.props.destinations.hoveredDestination === this.props.destination._id,
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
					className={citieClass}
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
								{destinationOf}
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
