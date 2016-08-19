import React, { Component } from 'react';
import { getGmContainer } from 'tion2/components/Mapp/utils';
import OriginInterviewCovers from './OriginInterviewCovers';
import classnames from 'classnames';
import appCss from 'tion2/components/App/css';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	componentDidMount() {
		const gmContainer = getGmContainer();
		gmContainer.appendChild(this.refs.layer2);
	}
	render() {
		const thisClass = classnames(appCss.layer2, css.layer2);
		return (
			<div
				ref="layer2"
				className={thisClass}
			>
				<OriginInterviewCovers />
			</div>
		);
	}
}

export default MyComponent;
