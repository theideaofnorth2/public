import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import utilsCss from 'tion2/components/common/utils';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		const thisClass = classnames(utilsCss.pointable, css.loader);
		return (
			<div className={thisClass}>
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
