import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import dropdownCss from 'tion2/components/common/dropdown.css';
import utilsCss from 'tion2/components/common/utils';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	onMouseEnter = () => {
		this.props.dispatch({ type: 'LANGUAGE_MOUSE_OVER' });
	}
	onMouseLeave = () => {
		this.props.dispatch({ type: 'LANGUAGE_MOUSE_LEAVE' });
	}
	onEnglishClick = () => {
		this.props.dispatch({ type: 'LANGUAGE_SELECTION', language: 'en' });
	}
	onFrenchClick = () => {
		this.props.dispatch({ type: 'LANGUAGE_SELECTION', language: 'fr' });
	}
	render() {
		const languageClass = classnames(dropdownCss.dropdown, utilsCss.pointable, css.language, {
			[dropdownCss.hovered]: this.props.app.languageHovered,
		});
		const englishClass = classnames({
			[dropdownCss.selected]: this.props.app.language === 'en',
		});
		const frenchClass = classnames({
			[dropdownCss.selected]: this.props.app.language === 'fr',
		});
		return (
			<div
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
				className={languageClass}
			>
				<div
					className={englishClass}
					onClick={this.onEnglishClick}
				>
					English
				</div>
				<div
					className={frenchClass}
					onClick={this.onFrenchClick}
				>
					Français
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({ app: state.app });

export default connect(mapStateToProps)(MyComponent);
