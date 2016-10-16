import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { imagesUri } from 'tion2/utils/tools';
import css from './css';

const destinationsImagesUri = `${imagesUri}/destinations`;

export class MyComponent extends Component {
	render() {
		const content = this.props.destinations.data
			.map(destination => {
				const thisClass = classnames(css.destination, {
					[css.visible]: this.props.destinations.coverDestinationId === destination._id,
				});
				const thisStyle = !destination.image ? {} : {
					backgroundImage: `url(${destinationsImagesUri}/${destination.image})`,
				};
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

const mapStateToProps = state => ({ destinations: state.destinations });

export default connect(mapStateToProps)(MyComponent);
