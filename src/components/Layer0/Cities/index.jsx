import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { imagesUri } from "tion2/utils/tools";
import css from "./css";

const preloadImage = src => {
  const srcImage = new window.Image();
  srcImage.src = `${imagesUri}/cities/${src}`;
};

export class MyComponent extends Component {
  componentDidMount() {
    const images = [...this.props.origins.data, ...this.props.destinations.data]
      .map(citie => citie.image)
      .filter(image => image);
    images.forEach(preloadImage);
  }
  shouldComponentUpdate(nextProps) {
    if (
      this.props.background.currentCitieId ===
        nextProps.background.currentCitieId &&
      this.props.background.currentCitieType ===
        nextProps.background.currentCitieType
    )
      return false;
    return true;
  }
  componentDidUpdate() {
    this.prevRef.classList.remove(css.fadeOut);
    this.currentRef.classList.remove(css.fadeIn);
    window.requestAnimationFrame(() => {
      this.prevRef.classList.add(css.fadeOut);
      this.currentRef.classList.add(css.fadeIn);
    });
  }
  render() {
    if (!this.props.background.currentCitieId) return null;
    const prevCitie = !this.props.background.prevCitieType
      ? {}
      : this.props[this.props.background.prevCitieType].data.find(
          c => c._id === this.props.background.prevCitieId
        );
    const currentCitie = this.props[
      this.props.background.currentCitieType
    ].data.find(c => c._id === this.props.background.currentCitieId);
    const prevClass = classnames(css.citie, css.prevCitie);
    const currentClass = classnames(css.citie, css.prevCitie);
    const prevStyle = !prevCitie.image
      ? {}
      : { backgroundImage: `url(${imagesUri}/cities/${prevCitie.image})` };
    const currentStyle = !currentCitie.image
      ? {}
      : { backgroundImage: `url(${imagesUri}/cities/${currentCitie.image})` };
    return (
      <div>
        <div
          ref={ref => {
            this.prevRef = ref;
          }}
          className={prevClass}
          style={prevStyle}
        />
        <div
          ref={ref => {
            this.currentRef = ref;
          }}
          className={currentClass}
          style={currentStyle}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  background: state.background,
  origins: state.origins,
  destinations: state.destinations
});

export default connect(mapStateToProps)(MyComponent);
