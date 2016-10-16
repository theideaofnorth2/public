import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { getGmContainer } from 'tion2/components/Mapp/utils';
import appCss from 'tion2/components/App/css';
import OriginInterviewCovers from './OriginInterviewCovers';
import css from './css';

export class MyComponent extends Component {
	componentDidUpdate(prevProps) {
		if (this.props.app.ready && !prevProps.app.ready) {
			const gmContainer = getGmContainer();
			gmContainer.appendChild(this.layer2Ref);
		}
	}
	render() {
		if (!this.props.app.ready) return null;
		const thisClass = classnames(appCss.layer2, css.layer2);
		return (
			<div
				ref={ref => { this.layer2Ref = ref; }}
				className={thisClass}
			>
				<OriginInterviewCovers />
			</div>
		);
	}
}

const mapStateToProps = state => ({ app: state.app });

export default connect(mapStateToProps)(MyComponent);
