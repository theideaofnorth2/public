import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import css from './css';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		const content = this.props.destinations.data
			.map(destination => {
				const thisStyle = {
					backgroundImage: `url(/assets/images/destinations/${destination.image})`,
				};
				const thisClass = classnames(css.destination, {
					[css.visible]: this.props.destinations.coverDestinationId === destination._id,
				});
				return (
					<div
						key={destination._id}
						className={thisClass}
						style={thisStyle}
					/>
				);
			});
		return (
			<div>
				{content}
			</div>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	destinations: state.destinations,
});

export default connect(mapStateToProps)(MyComponent);
