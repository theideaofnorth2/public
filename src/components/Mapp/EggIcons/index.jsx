import React, { Component } from 'react';
import { connect } from 'react-redux';
import Egg from './Egg';

export class MyComponent extends Component {
	render() {
		const content = this.props.eggs.data.map(egg => Object.assign(
			<Egg
				key={egg._id}
				gmap={this.props.gmap}
				egg={egg}
			/>
		));
		return !this.props.gmap ? null : (
			<div>
				{content}
			</div>
		);
	}
}

const mapStateToProps = state => ({ eggs: state.eggs });

export default connect(mapStateToProps)(MyComponent);
