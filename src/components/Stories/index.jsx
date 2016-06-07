import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Storie from './Storie';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
		this.toggleStories = this.toggleStories.bind(this);
	}
	toggleStories() {
		this.props.dispatch({ type: 'STORIES_TOGGLE' });
	}
	render() {
		const content = this.props.stories.data.map((storie, index) => {
			if (storie.viewType === 'main') {
				return (
					<Storie
						key={index}
						storie={storie}
						name="Canada"
					/>
				);
			}
			if (storie.viewType === 'origin') {
				const origin = this.props.origins.data.find(o => o._id === storie.originId);
				return (
					<Storie
						key={index}
						storie={storie}
						name={origin.name}
					/>
				);
			}
			const interview = this.props.interviews.data.find(o => o._id === storie.interviewId);
			return (
				<Storie
					key={index}
					storie={storie}
					name={interview.name}
				/>
			);
		});
		const thisClass = classnames(css.stories, {
			[css.open]: this.props.stories.open,
		});
		return (
			<div className={thisClass}>
				{content}
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
	origins: state.origins,
	interviews: state.interviews,
});

export default connect(mapStateToProps)(MyComponent);
