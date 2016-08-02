import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import utilsCss from 'tion2/components/common/utils';
import contentCss from '../css';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		const thisClass = classnames(utilsCss.pointable, contentCss.content, {
			[contentCss.visible]: this.props.app.view === 'approach',
		});
		return (
			<div className={thisClass}>
				<div className={css.approach}>
					<h1>Approach</h1>
					<p>Content for the approach page</p>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(MyComponent);
