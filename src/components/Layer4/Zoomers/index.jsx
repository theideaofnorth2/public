import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SuperPromise } from 'tion2/utils/tools';
import Zoomer from './Zoomer';
import classnames from 'classnames';
import layer4Css from '../css';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
		this.zoomerMount = this.zoomerMount.bind(this);
		this.initZoomerPromises.call(this);
	}
	initZoomerPromises() {
		this.zommerPromises = this.props.origins.data.map(origin => Object.assign({
			key: origin.key,
			...new SuperPromise(),
		}));
		Promise.all(this.zommerPromises.map(zP => zP.promise)).then(this.zoomersMount.bind(this));
	}
	zoomerMount(arg) {
		this.zommerPromises.find(zP => zP.key === arg).resolve(arg);
	}
	zoomersMount() {
		this.props.dispatch({ type: 'ZOOMERS_MOUNTED' });
	}
	render() {
		const content = this.props.origins.data.map(origin => Object.assign(
			<Zoomer
				key={origin.name}
				origin={origin}
				onMount={this.zoomerMount}
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
