import React, { Component } from 'react';
import classnames from 'classnames';
import css from './css';

export default class MyComponent extends Component {
	componentDidMount() {
		this.infoWindow = new google.maps.InfoWindow({
			content: this.refs.content,
			position: new google.maps.LatLng(this.props.lat, this.props.lng),
			zIndex: -1,
			disableAutoPan: true,
		});
		this.infoWindow.open(this.props.gmap);
		google.maps.event.addListenerOnce(this.infoWindow, 'domready', () => {
			const iwc = this.refs.content.parentNode.parentNode.parentNode;
			iwc.classList.add(
				css.iwc,
				css[`iwc_${this.props.vertical}`],
				css[`iwc_${this.props.horizontal}`],
			);
		});
	}
	render() {
		const iwClass = classnames(
			css.iw,
			css[`iw_${this.props.vertical}`],
			css[`iw_${this.props.horizontal}`],
		);
		return (
			<div ref="content" className={iwClass}>
				{this.props.children}
			</div>
		);
	}
}
