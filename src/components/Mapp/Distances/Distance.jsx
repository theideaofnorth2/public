import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import Overlay from "tion2/components/Mapp/Google/Overlay";
import css from "./css";

export class MyComponent extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.coords = this.getCoords();
  }
  onMount = () => {
    this.divRect = this.distanceRef.getBoundingClientRect();
    this.pathLength = this.getPathLength();
    this.pathDirection = this.getPathDirection();
    this.pathD = this.getPathD();
    this.setState({ mounted: true });
  };
  getCoords = () => {
    const origin = this.props.interview.origin;
    const destination = this.props.interview.destination;
    return {
      swLat: Math.min(origin.lat, destination.lat),
      swLng: Math.min(origin.lng, destination.lng),
      neLat: Math.max(origin.lat, destination.lat),
      neLng: Math.max(origin.lng, destination.lng)
    };
  };
  getPathLength = () =>
    Math.sqrt(
      Math.pow(this.divRect.width, 2) + Math.pow(this.divRect.height, 2)
    );
  getPathDirection = () => {
    const origin = this.props.interview.origin;
    const destination = this.props.interview.destination;
    return {
      horizontal: origin.lng > destination.lng ? "toLeft" : "toRight",
      vertical: origin.lat > destination.lat ? "toBottom" : "toTop"
    };
  };
  getPathD = () => {
    const x0 = this.pathDirection.horizontal === "toRight"
      ? 0
      : this.divRect.width;
    const x1 = this.pathDirection.horizontal === "toRight"
      ? this.divRect.width
      : 0;
    const y0 = this.pathDirection.vertical === "toBottom"
      ? 0
      : this.divRect.height;
    const y1 = this.pathDirection.vertical === "toBottom"
      ? this.divRect.height
      : 0;
    return `M ${x0},${y0} L ${x1},${y1}`;
  };
  render() {
    const thisClass = classnames(css.distance, {
      [css.visible]: this.props.map.level === "main" &&
        !this.props.map.animating,
      [css.hover]: this.props.interviews.hoveredDestinationInterviewId ===
        this.props.interview._id
    });
    const pathClass = classnames(css.path, {
      [css.hover]: this.props.interviews.hoveredDestinationInterviewId ===
        this.props.interview._id,
      [css.delayedHover]: this.props.origins.hoveredOriginId ===
        this.props.interview.origin._id
    });
    const pathStyle = {
      strokeDashoffset: this.pathLength,
      strokeDasharray: this.pathLength
    };
    const svgContent =
      !!this.state.mounted &&
      <svg className={css.svg}>
        <path
          id="line-1"
          className={pathClass}
          style={pathStyle}
          d={this.pathD}
        />
      </svg>;
    return (
      <Overlay
        gmap={this.props.gmap}
        southWestLat={this.coords.swLat}
        southWestLng={this.coords.swLng}
        northEastLat={this.coords.neLat}
        northEastLng={this.coords.neLng}
        onMount={this.onMount}
      >
        <div
          ref={ref => {
            this.distanceRef = ref;
          }}
          className={thisClass}
        >
          {svgContent}
        </div>
      </Overlay>
    );
  }
}

const mapStateToProps = state => ({
  map: state.map,
  interviews: state.interviews,
  origins: state.origins
});

export default connect(mapStateToProps)(MyComponent);
