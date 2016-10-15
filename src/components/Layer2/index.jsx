import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGmContainer } from 'tion2/components/Mapp/utils';
import OriginInterviewCovers from './OriginInterviewCovers';
import classnames from 'classnames';
import appCss from 'tion2/components/App/css';
import css from './css';

export class MyComponent extends Component {
	componentDidUpdate(prevProps) {
		if (this.props.app.ready && !prevProps.app.ready) {
			const gmContainer = getGmContainer();
			gmContainer.appendChild(this.refs.layer2);
		}
	}
	render() {
		if (!this.props.app.ready) return null;
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

const mapStateToProps = state => ({ app: state.app });

export default connect(mapStateToProps)(MyComponent);
