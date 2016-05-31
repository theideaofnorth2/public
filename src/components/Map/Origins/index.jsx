import React, { Component } from 'react';
import { connect } from 'react-redux';
import Origin from './Origin';
import { getOrigins } from 'tion2/reducers/selectors/cities';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		const content = this.props.origins.map(origin => Object.assign(
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
	origins: getOrigins(state),
});

export default connect(mapStateToProps)(MyComponent);
