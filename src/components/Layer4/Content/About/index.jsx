import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import utilsCss from 'tion2/components/common/utils';
import Scroller from '../Scroller';
import contentCss from '../css';

export class MyComponent extends Component {
	render() {
		const thisClass = classnames(utilsCss.pointable, contentCss.contentPage, {
			[contentCss.visible]: this.props.app.view === 'page' && this.props.pages.selectedPage === 'about',
		});
		const { language } = this.props.app;
		return (
			<div className={thisClass}>
				<div>
					<Scroller>
						<div
							className={contentCss.contentDiv}
							dangerouslySetInnerHTML={{ __html: this.props.pages.data.about[language] }}
						/>
					</Scroller>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	app: state.app,
	pages: state.pages,
});

export default connect(mapStateToProps)(MyComponent);
