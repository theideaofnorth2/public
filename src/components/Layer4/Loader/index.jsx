import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		return (
			<div className={css.loader}>
				<div className={css.csLoader}>
					<div className={css.csLoaderInner}>
						<label>	●</label>
						<label>	●</label>
						<label>	●</label>
						<label>	●</label>
						<label>	●</label>
						<label>	●</label>
					</div>
				</div>
				<div className={css.loading}>
					The Idea of North 2.0
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(MyComponent);
