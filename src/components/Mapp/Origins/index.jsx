import React, { Component } from "react";
import { connect } from "react-redux";
import Origin from "./Origin";

export class MyComponent extends Component {
  render() {
    const content = this.props.origins.data.map(origin =>
      Object.assign(
        <Origin key={origin.name} gmap={this.props.gmap} origin={origin} />
      )
    );
    return !this.props.gmap ? null : <div>{content}</div>;
  }
}

const mapStateToProps = state => ({ origins: state.origins });

export default connect(mapStateToProps)(MyComponent);
