import React, { Component } from 'react';
import { connect } from 'react-redux';
import Origin from './Origin';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		const content = this.props.origins.data.map(origin => Object.assign(
			<Origin
				key={origin.name}
				gmap={this.props.gmap}
				origin={origin}
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
	origins: state.origins,
});

export default connect(mapStateToProps)(MyComponent);
