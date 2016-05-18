import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMap from 'tion2/components/Map';
import Background from 'tion2/components/Background';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	componentDidMount() {
	}
	render() {
		return (
			<div className={css.app}>
				<Background />
				<GoogleMap />
			</div>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(MyComponent);
