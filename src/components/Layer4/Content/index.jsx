import React, { Component } from 'react';
import { connect } from 'react-redux';
import Approach from './Approach';
import About from './About';
import css from './css';

export class MyComponent extends Component {
	render() {
		return (
			<div
				className={css.content}
				hidden={this.props.map.zooming}
			>
				<Approach />
				<About />
			</div>
		);
	}
}

const mapStateToProps = state => ({ map: state.map });

export default connect(mapStateToProps)(MyComponent);
