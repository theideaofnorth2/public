import React, { Component } from "react";
import css from "./css";
import { TION2Overlay } from "./utils";

export class MyComponent extends Component {
  componentDidMount() {
    const bounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(this.props.southWestLat, this.props.southWestLng),
      new google.maps.LatLng(this.props.northEastLat, this.props.northEastLng)
    );
    this.overlay = new TION2Overlay(bounds, this.overlayRef, this.props.gmap);
    if (this.props.onMount) this.overlay.on("mount", this.props.onMount);
  }
  render() {
    return (
      <div
        ref={ref => {
          this.overlayRef = ref;
        }}
        className={css.overlay}
        style={{ zIndex: this.props.zIndex || "auto" }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default MyComponent;
