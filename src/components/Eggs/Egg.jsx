import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const isVisible = this.props.eggs.selectedEggId === this.props.egg._id &&
			this.props.map.level === 'origin';
		const thisClass = classnames(css.egg, {
			[css.visible]: isVisible,
		});
		return (
			<div
				ref="egg"
				className={thisClass}
			>
				{this.props.egg.name}
			</div>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	eggs: state.eggs,
	map: state.map,
});

export default connect(mapStateToProps)(MyComponent);
