import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import AlignedOverlay from 'tion2/components/Mapp/Google/AlignedOverlay';
import origin from 'tion2/components/common/origin.svg';
import css from './css';

export class MyComponent extends Component {
	onClick = () => {
		if (!this.props.map.dragging) {
			this.props.dispatch({ type: 'ORIGIN_CLICK', originId: this.props.origin._id });
		}
	}
	onMouseEnter = () => {
		this.props.dispatch({ type: 'ORIGIN_MOUSE_ENTER', originId: this.props.origin._id });
	}
	onMouseLeave = () => {
		this.props.dispatch({ type: 'ORIGIN_MOUSE_LEAVE', originId: this.props.origin._id });
	}
	render() {
		const originClass = classnames(css.origin, {
			[css.visible]: this.props.map.level === 'main',
		});
		const nameClass = classnames(css.name, {
			[css.hover]: this.props.origins.hoveredOriginId === this.props.origin._id,
		});
		return (
			<AlignedOverlay
				gmap={this.props.gmap}
				lat={this.props.origin.lat}
				lng={this.props.origin.lng}
				vertical={this.props.origin.vertical}
				horizontal={this.props.origin.horizontal}
			>
				<div className={nameClass}>
					{this.props.origin.name}
					{!!this.props.origin.nativeName && (
						<div className={css.nativeName}>{this.props.origin.nativeName}</div>
					)}
				</div>
				<div
					onClick={this.onClick}
					onMouseEnter={this.onMouseEnter}
					onMouseLeave={this.onMouseLeave}
					className={originClass}
					dangerouslySetInnerHTML={{ __html: origin }}
				/>
			</AlignedOverlay>
		);
	}
}

const mapStateToProps = state => ({
	map: state.map,
	origins: state.origins,
});

export default connect(mapStateToProps)(MyComponent);
