import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Storie from './Storie';
import css from './css';
import layer4Css from '../css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
		this.toggleStories = this.toggleStories.bind(this);
	}
	toggleStories() {
		this.props.dispatch({ type: 'STORIES_TOGGLE' });
	}
	componentDidUpdate(prevProps) {
		const sLDiff = this.props.stories.data.length - prevProps.stories.data.length;
		if (sLDiff !== 0) {
			this.refs.stories.style.transition = 'none';
			this.refs.stories.style.transform = `translateY(${-30 * sLDiff}px)`;
			setTimeout(() => {
				this.refs.stories.style.transition = 'transform 250ms linear';
				this.refs.stories.style.transform = 'translateY(0)';
			}, 0);
		}
	}
	render() {
		const content = this.props.stories.data.map((storie, index) => Object.assign(
			<Storie
				key={index}
				index={index}
				storie={storie}
			/>
		));
		const thisClass = classnames(css.container, layer4Css.pointable, {
			[css.open]: this.props.stories.open,
		});
		const storiesClass = classnames(css.stories);
		return (
			<div className={thisClass}>
				<div
					ref="stories"
					className={storiesClass}
				>
					{content}
				</div>
				<div
					className={css.toggle}
					onClick={this.toggleStories}
				></div>
			</div>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	stories: state.stories,
});

export default connect(mapStateToProps)(MyComponent);
