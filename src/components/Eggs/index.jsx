import React, { Component } from 'react';
import { connect } from 'react-redux';
import Egg from './Egg';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		const content = this.props.eggs.data.map(egg => Object.assign(
			<Egg
				key={egg._id}
				egg={egg}
			/>
		));
		return (
			<div>
				{content}
			</div>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	eggs: state.eggs,
});

export default connect(mapStateToProps)(MyComponent);
