import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import utilsCss from 'tion2/components/common/utils';
import css from './css';

export class MyComponent extends Component {
  render() {
    if (!this.props.player.interview || !this.props.player.photoSlides)
      return null;
    const slidesContent = this.props.player.photoSlides.map((slide, index) => {
      const slideStyle = {
        backgroundImage: `url(${slide.name})`,
      };
      const slideClass = classnames(utilsCss.pointable, css.slide, {
        [css.prevSlide]: slide.previous,
        [css.currentSlide]: slide.current,
      });
      return <div key={index} style={slideStyle} className={slideClass} />;
    });
    return <div>{slidesContent}</div>;
  }
}

const mapStateToProps = state => ({ player: state.player });

export default connect(mapStateToProps)(MyComponent);
