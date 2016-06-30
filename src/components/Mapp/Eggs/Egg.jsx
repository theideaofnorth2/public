import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import AlignedOverlay from 'tion2/components/Mapp/Google/AlignedOverlay';
import rail from './rail.svg';
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
		this.props.dispatch({
			type: 'EGG_CLICK',
			eggId: this.props.egg._id,
			originId: this.props.egg.originId,
		});
	}
	render() {
		const isVisible = this.props.origins.selectedOriginId === this.props.egg.originId &&
			this.props.map.level === 'origin';
		const thisClass = classnames(css.egg, {
			[css.visible]: isVisible,
		});
		return (
			<AlignedOverlay
				gmap={this.props.gmap}
				lat={this.props.egg.lat}
				lng={this.props.egg.lng}
				vertical="bottom"
				horizontal="center"
				onMount={this.onMount}
			>
				<div
					ref="egg"
					className={thisClass}
					onClick={this.onClick}
					dangerouslySetInnerHTML={{ __html: rail }}
				>
				</div>
			</AlignedOverlay>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	origins: state.origins,
	eggs: state.eggs,
	map: state.map,
});

export default connect(mapStateToProps)(MyComponent);
