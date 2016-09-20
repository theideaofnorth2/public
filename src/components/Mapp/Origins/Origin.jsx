import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import AlignedOverlay from 'tion2/components/Mapp/Google/AlignedOverlay';
import origin from 'tion2/components/common/origin.svg';
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
		if (!this.props.map.dragging) {
			this.props.dispatch({ type: 'ORIGIN_CLICK', originId: this.props.origin._id });
		}
	}
	onMouseEnter() {
		this.props.dispatch({ type: 'ORIGIN_MOUSE_ENTER', originId: this.props.origin._id });
	}
	onMouseLeave() {
		this.props.dispatch({ type: 'ORIGIN_MOUSE_LEAVE', originId: this.props.origin._id });
	}
	render() {
		const originClass = classnames(css.origin, {
			[css.visible]: this.props.map.level === 'main',
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
					dangerouslySetInnerHTML={{ __html: origin }}
				></div>
			</AlignedOverlay>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	map: state.map,
});

export default connect(mapStateToProps)(MyComponent);
