import React, { Component } from 'react';
import { connect } from 'react-redux';
import Citie from 'tion2/components/Map/Citie';
import css from './css';
import { getFullCities } from 'tion2/reducers/selectors/cities';

export class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.initialized = true;
	}
	render() {
		const content = this.props.cities.map(citie => Object.assign(
			<Citie
				key={citie.name}
				gmap={this.props.gmap}
				citie={citie}
			/>
		));
		return (
			<div className={css.cities}>
				{content}
			</div>
		);
	}
}

const mapStateToProps = (state) => Object.assign({
	cities: getFullCities(state),
});

export default connect(mapStateToProps)(MyComponent);
