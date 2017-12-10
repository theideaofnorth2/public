import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slides from './Slides';
import css from './css';

export class MyComponent extends Component {
  render() {
    return (
      <div className={css.slideshow} hidden={this.props.map.zooming}>
        <Slides />
      </div>
    );
  }
}

const mapStateToProps = state => ({ map: state.map });

export default connect(mapStateToProps)(MyComponent);
