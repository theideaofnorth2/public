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
		this.onEnglishClick = this.onEnglishClick.bind(this);
		this.onFrenchClick = this.onFrenchClick.bind(this);
	}
	onEnglishClick() {
		this.props.dispatch({ type: 'LANGUAGE_SELECTION', language: 'english' });
	}
	onFrenchClick() {
		this.props.dispatch({ type: 'LANGUAGE_SELECTION', language: 'french' });
	}
	render() {
		const languageClass = classnames(dropdownCss.dropdown, utilsCss.pointable, css.language);
		const englishClass = classnames({
			[dropdownCss.selected]: this.props.app.language === 'english',
		});
		const frenchClass = classnames({
			[dropdownCss.selected]: this.props.app.language === 'french',
		});
		return (
			<div className={languageClass}>
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
					Francais
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(MyComponent);
