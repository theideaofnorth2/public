import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import utilsCss from 'tion2/components/common/utils';
import { imagesUri } from 'tion2/utils/tools';
import css from './css';

const backgroundImageUri = `${imagesUri}/background.jpg`;

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		const thisClass = classnames(css.background, {
			[css.home]: this.props.app.view === 'home',
		});
		const barClass = classnames(utilsCss.pointable, css.bar);
		const imgClass = classnames({
			[css.visible]: this.props.introduction.backgroundVisible,
			[css.translating]: this.props.introduction.backgroundTranslating,
			[css.rotating]: this.props.introduction.backgroundRotating,
		});
		return (
			<div className={thisClass}>
				<div className={barClass} />
				<img
					role="presentation"
					className={imgClass}
					src={backgroundImageUri}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => Object.assign({
	app: state.app,
	exploration: state.exploration,
});

export default connect(mapStateToProps)(MyComponent);
