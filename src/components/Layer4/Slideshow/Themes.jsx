import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import css from './css';

export class MyComponent extends Component {
	render() {
		if (!this.props.player.interview) return null;
		const themesContent = this.props.player.themesImages.map((themeImage, index) => {
			const themeStyle = { backgroundImage: `url(${themeImage})` };
			const themeClass = classnames(css.theme, {
				[css.currentTheme]: this.props.player.themeIndex === index,
			});
			return (
				<div
					key={index}
					style={themeStyle}
					className={themeClass}
				></div>
			);
		});
		return (
			<div>
				{themesContent}
			</div>
		);
	}
}

const mapStateToProps = state => Object.assign({
	player: state.player,
});

export default connect(mapStateToProps)(MyComponent);
