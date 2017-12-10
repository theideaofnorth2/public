import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import css from './css';

export class MyComponent extends Component {
  componentDidUpdate() {
    if (
      !this.isColorImagePreoladed &&
      this.props.interviews.hoveredInterviewId === this.props.interview._id
    )
      this.preloadColorImage();
  }
  preloadColorImage = () => {
    if (this.props.interview.slideshow[0]) {
      const colorImage = new window.Image();
      colorImage.src = this.props.interview.slideshow[0].name;
      this.isColorImagePreoladed = true;
    }
  };
  render() {
    const thisStyle = !this.props.interview.image
      ? {}
      : {
          backgroundImage: `url(${this.props.interview.image})`,
        };
    const thisClass = classnames(css.interview, {
      [css.visible]:
        this.props.interviews.hoveredInterviewId === this.props.interview._id,
    });
    return <div className={thisClass} style={thisStyle} />;
  }
}

const mapStateToProps = state => ({ interviews: state.interviews });

export default connect(mapStateToProps)(MyComponent);
