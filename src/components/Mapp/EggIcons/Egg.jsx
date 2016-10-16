import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import AlignedOverlay from 'tion2/components/Mapp/Google/AlignedOverlay';
import { imagesUri } from 'tion2/utils/tools';
import css from './css';

const eggsImagesUri = `${imagesUri}/eggs`;

export class MyComponent extends Component {
	state = {}
	onMount = () => {
		this.setState({ mounted: true });
	}
	onClick = () => {
		this.props.dispatch({
			type: 'EGG_CLICK',
			eggId: this.props.egg._id,
			originId: this.props.egg.originId,
		});
	}
	render() {
		const visible = this.props.origins.selectedOriginId === this.props.egg.originId &&
			this.props.map.level === 'origin';
		const faded = this.props.interviews.hoveredInterviewId !== null;
		const thisClass = classnames(css.egg, {
			[css.visible]: visible,
			[css.faded]: faded,
		});
		const thisStyle = {
			backgroundImage: `url(${eggsImagesUri}/${this.props.egg.image})`,
		};
		return (
			<AlignedOverlay
				gmap={this.props.gmap}
				lat={this.props.egg.lat}
				lng={this.props.egg.lng}
				vertical="top"
				horizontal="center"
				onMount={this.onMount}
			>
				<div
					className={thisClass}
					onClick={this.onClick}
					style={thisStyle}
				/>
			</AlignedOverlay>
		);
	}
}

const mapStateToProps = state => ({
	origins: state.origins,
	interviews: state.interviews,
	map: state.map,
});

export default connect(mapStateToProps)(MyComponent);
