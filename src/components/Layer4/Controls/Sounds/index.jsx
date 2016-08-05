import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Sound from './Sound';
import utilsCss from 'tion2/components/common/utils';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		const thisClass = classnames(utilsCss.pointable, css.sounds, {
			[css.visible]: this.props.app.view === 'mapp',
		});
		const content = this.props.interviews.data.map(interview => Object.assign(
			<Sound
				key={interview._id}
				interview={interview}
				play={interview._id === this.props.interviews.selectedInterviewId}
			/>
		));
		return (
			<div className={thisClass}>
				{content}
			</div>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	app: state.app,
	map: state.map,
	interviews: state.interviews,
});

export default connect(mapStateToProps)(MyComponent);
