import React, { Component } from 'react';
import { connect } from 'react-redux';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div
				ref="storie"
			>
				{this.props.name}
			</div>
		);
	}
}

export default connect(state => state)(MyComponent);
