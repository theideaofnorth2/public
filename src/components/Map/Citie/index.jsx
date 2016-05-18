import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import AlignedOverlay from 'tion2/components/Map/AlignedOverlay';
import Interview from 'tion2/components/Map/Interview';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
	}
	onMouseEnter() {
		this.props.dispatch({ type: 'CITIE_MOUSE_ENTER', citie: this.props.citie._id });
	}
	onMouseLeave() {
		this.props.dispatch({ type: 'CITIE_MOUSE_LEAVE', citie: this.props.citie._id });
	}
	render() {
		const originOf = this.props.citie.originOf.map(interview => Object.assign(
			<Interview key={interview._id} interview={interview} />
		));
		const destinationOf = this.props.citie.destinationOf.map(interview => Object.assign(
			<Interview key={interview._id} interview={interview} />
		));
		const citieClass = classnames(
			css.citie,
			css[this.props.citie.vertical],
			css[this.props.citie.horizontal],
			{
				[css.hover]: this.props.ui.citie_hover === this.props.citie._id,
			},
		);
		return (
			<AlignedOverlay
				gmap={this.props.gmap}
				lat={this.props.citie.lat}
				lng={this.props.citie.lng}
				vertical={this.props.citie.vertical}
				horizontal={this.props.citie.horizontal}
			>
				<div
					className={citieClass}
					onMouseEnter={this.onMouseEnter}
					onMouseLeave={this.onMouseLeave}
				>
					<div className={css.content}>
						<div className={css.name}>
							{this.props.citie.name}
						</div>
						<div className={css.interviews}>
							{originOf}
							{destinationOf}
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
