import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import AlignedOverlay from 'tion2/components/Google/AlignedOverlay';
import home from './home.svg';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
		this.onClick = this.onClick.bind(this);
		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
	}
	onClick() {
		this.props.dispatch({ type: 'ORIGIN_CLICK', citie: this.props.origin._id });
	}
	onMouseEnter() {
		this.props.dispatch({ type: 'CITIE_MOUSE_ENTER', citie: this.props.origin._id });
	}
	onMouseLeave() {
		this.props.dispatch({ type: 'CITIE_MOUSE_LEAVE', citie: this.props.origin._id });
	}
	render() {
		const originClass = classnames(css.origin, {
			[css.visible]: this.props.map.selectedOrigin === null || this.props.map.centering,
		});
		return (
			<AlignedOverlay
				gmap={this.props.gmap}
				lat={this.props.origin.lat}
				lng={this.props.origin.lng}
				vertical={this.props.origin.vertical}
				horizontal={this.props.origin.horizontal}
			>
				<div
					onClick={this.onClick}
					onMouseEnter={this.onMouseEnter}
					onMouseLeave={this.onMouseLeave}
					className={originClass}
					dangerouslySetInnerHTML={{ __html: home }}
				></div>
			</AlignedOverlay>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(MyComponent);
