import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import utilsCss from 'tion2/components/common/utils';
import contentCss from '../css';

export class MyComponent extends Component {
	render() {
		const thisClass = classnames(utilsCss.pointable, contentCss.contentPage, {
			[contentCss.visible]: this.props.app.view === 'page' && this.props.pages.selectedPage === 'tourEnd',
		});
		const { language } = this.props.app;
		return (
			<div className={thisClass}>
				<div dangerouslySetInnerHTML={{ __html: this.props.pages.data.tourEnd[language] }} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	app: state.app,
	pages: state.pages,
});

export default connect(mapStateToProps)(MyComponent);
