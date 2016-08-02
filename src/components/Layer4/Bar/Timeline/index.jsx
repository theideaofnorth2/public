import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Storie from './Storie';
import next from './next.svg';
import css from './css';
import utilsCss from 'tion2/components/common/utils';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.onStoriesLengthChange = this.onStoriesLengthChange.bind(this);
		this.prevClick = this.prevClick.bind(this);
		this.nextClick = this.nextClick.bind(this);
	}
	componentDidUpdate(prevProps) {
		const slDiff = this.props.stories.data.length - prevProps.stories.data.length;
		if (slDiff !== 0) this.onStoriesLengthChange(slDiff);
	}
	onStoriesLengthChange() {
		Object.assign(this.refs.stories.style, {
			transition: 'none',
			transform: `translateX(${
				(this.props.stories.positionIndex + 1) * 100
			}px)`,
		});
		setTimeout(() => {
			Object.assign(this.refs.stories.style, {
				transition: 'transform 300ms cubic-bezier(0,0,0.32,1)',
				transform: `translateX(${
					(this.props.stories.positionIndex) * 100
				}px)`,
			});
		}, 0);
	}
	prevClick() {
		this.props.dispatch({ type: 'STORIES_PREVIOUS_CLICK' });
	}
	nextClick() {
		this.props.dispatch({ type: 'STORIES_NEXT_CLICK' });
	}
	render() {
		const storiesContent = this.props.stories.data.map((storie, index) => Object.assign(
			<Storie
				key={index}
				index={index}
				storie={storie}
			/>
		));
		const timelineClass = classnames(css.timeline, {
			[css.home]: this.props.app.view === 'home',
			[utilsCss.pointable]: this.props.exploration.mode === 'interactive',
			[css.interactive]: this.props.exploration.mode === 'interactive',
		});
		const storiesStyle = {
			transform: `translateX(${this.props.stories.positionIndex * 100}px)`,
		};
		const lineStyle = {
			transform: `translateX(${this.props.stories.timelineIndex * -100}px)`,
		};
		return (
			<div className={timelineClass}>
				<div className={css.timelineContent}>
					<div
						ref="stories"
						className={css.stories}
						style={storiesStyle}
					>
						<div
							className={css.line}
							style={lineStyle}
						></div>
						{storiesContent}
					</div>
				</div>
				<div
					className={css.prevButton}
					onClick={this.prevClick}
					dangerouslySetInnerHTML={{ __html: next }}
				></div>
				<div
					className={css.nextButton}
					onClick={this.nextClick}
					dangerouslySetInnerHTML={{ __html: next }}
				></div>
			</div>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	app: state.app,
	exploration: state.exploration,
	stories: state.stories,
});

export default connect(mapStateToProps)(MyComponent);
