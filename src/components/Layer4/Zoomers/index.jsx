import React, { Component } from 'react';
import { connect } from 'react-redux';
import Zoomer from './Zoomer';
import classnames from 'classnames';
import layer4Css from '../css';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		const content = this.props.origins.data.map(origin => Object.assign(
			<Zoomer
				key={origin.name}
				origin={origin}
			/>
		));
		const thisClass = classnames(css.zoomers, layer4Css.pointable);
		return (
			<div className={thisClass}>
				{content}
			</div>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	origins: state.origins,
});

export default connect(mapStateToProps)(MyComponent);
