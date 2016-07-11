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
		this.state = { diff: 1 };
		this.onStoriesLengthChange = this.onStoriesLengthChange.bind(this);
		this.prevClick = this.prevClick.bind(this);
		this.nextClick = this.nextClick.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		if (
			this.props.stories.data.length - this.props.stories.timelineIndex !==
			nextProps.stories.data.length - nextProps.stories.timelineIndex
		) {
			this.setState({ diff: nextProps.stories.data.length - nextProps.stories.timelineIndex });
		}
		console.log(nextProps.stories.data.length, nextProps.stories.timelineIndex);
	}
	componentDidUpdate(prevProps) {
		const sLDiff = this.props.stories.data.length - prevProps.stories.data.length;
		if (sLDiff !== 0) this.onStoriesLengthChange(sLDiff);
	}
	onStoriesLengthChange() {
		Object.assign(this.refs.stories.style, {
			transition: 'none',
			transform: `translateX(${(this.state.diff) * 100}px)`,
		});
		setTimeout(() => {
			Object.assign(this.refs.stories.style, {
				transition: 'transform 300ms cubic-bezier(0,0,0.32,1)',
				transform: `translateX(${(this.state.diff - 1) * 100}px)`,
			});
		}, 0);
	}
	prevClick() {
		this.setState({ diff: this.state.diff + 4 });
		console.log(this.state.diff);
	}
	nextClick() {
		this.setState({ diff: this.state.diff - 4 });
		console.log(this.state.diff);
	}
	render() {
		const storiesContent = this.props.stories.data.map((storie, index) => Object.assign(
			<Storie
				key={index}
				index={index}
				storie={storie}
			/>
		));
		const timelineClass = classnames(css.timeline, layer4Css.pointable);
		const storiesClass = classnames(css.stories);
		const thisDiff = this.state.diff - 1;
		const storiesStyle = {
			transform: `translateX(${thisDiff * 100}px)`,
		};
		return (
			<div
				className={timelineClass}
			>
				<div
					className={css.timelineContent}
				>
					<div
						ref="stories"
						className={storiesClass}
						style={storiesStyle}
					>
						{storiesContent}
					</div>
				</div>
				<div
					className={css.prevButton}
					onClick={this.prevClick}
				>&lt;</div>
				<div
					className={css.nextButton}
					onClick={this.nextClick}
				>&gt;</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	stories: state.stories,
});

export default connect(mapStateToProps)(MyComponent);
