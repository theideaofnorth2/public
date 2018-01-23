import React, { Component } from 'react';
import { connect } from 'react-redux';
import Zoomer from 'zoomer';
import classnames from 'classnames';
import css from './css';

export class MyComponent extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.lastLevel = this.props.origin.zoom;
    this.images = [4, 6, 8, 10, 12, this.lastLevel].map(level => ({
      level,
      src: this.props.origin[`zoomer_${level}`],
    }));
  }
  componentDidMount() {
    this.mountZoomer();
  }
  componentDidUpdate() {
    if (
      this.props.zoomers.zooming &&
      this.props.origin._id === this.props.zoomers.originId
    ) {
      this.animateZoomer();
    }
  }
  mountZoomer = () => {
    this.zoomer = new Zoomer({
      selector: `#zoomer_${this.props.origin._id}`,
      width: 1920,
      height: 1080,
      stepsPerLevel: 6,
      step: 24,
      images: this.images,
    });
    this.zoomer.on('ready', () => {
      this.setState({ mounted: true });
      this.props.onMount(this.props.origin._id);
    });
  };
  isScreenTooWideToAnimate = () =>
    window.innerWidth * window.devicePixelRatio > 1920;
  animateZoomer = () => {
    const spl = 6;
    const fromStep =
      this.props.zoomers.direction === 'in' ? spl * 4 : spl * this.lastLevel;
    const toStep =
      this.props.zoomers.direction === 'in' ? spl * this.lastLevel : spl * 4;
    if (this.isScreenTooWideToAnimate()) {
      this.zoomer.setZoom({ step: toStep });
      return setTimeout(
        () => this.props.dispatch({ type: 'MAP_ZOOM_FINISHED' }),
        500,
      );
    }
    return this.zoomer
      .animateZoom({
        stepsPerLevel: spl,
        fromStep,
        toStep,
      })
      .then(() => {
        this.props.dispatch({ type: 'MAP_ZOOM_FINISHED' });
      });
  };
  render() {
    const zooming =
      this.props.zoomers.zooming &&
      this.props.origin._id === this.props.zoomers.originId;
    const thisClass = classnames(css.zoomerContainer, {
      [css.displayed]: !this.state.mounted || zooming,
      [css.visible]: zooming,
    });
    return (
      <div className={thisClass}>
        <div className={css.zoomer} id={`zoomer_${this.props.origin._id}`} />
      </div>
    );
  }
}

const mapStateToProps = state => ({ zoomers: state.zoomers });

export default connect(mapStateToProps)(MyComponent);
