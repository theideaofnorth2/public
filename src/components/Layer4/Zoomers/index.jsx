import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { SuperPromise } from "tion2/utils/tools";
import Zoomer from "./Zoomer";
import css from "./css";

export class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.initZoomerPromises();
  }
  initZoomerPromises = () => {
    this.zommerPromises = this.props.origins.data.map(origin =>
      Object.assign({
        key: origin.key,
        ...new SuperPromise()
      })
    );
    Promise.all(this.zommerPromises.map(zP => zP.promise)).then(
      this.zoomersMount
    );
  };
  zoomerMount = arg => {
    this.zommerPromises.find(zP => zP.key === arg).resolve(arg);
  };
  zoomersMount = () => {
    this.props.dispatch({ type: "ZOOMERS_MOUNTED" });
  };
  render() {
    const content = this.props.origins.data.map(origin =>
      Object.assign(
        <Zoomer key={origin.name} origin={origin} onMount={this.zoomerMount} />
      )
    );
    const thisClass = classnames(css.zoomers);
    return (
      <div className={thisClass}>
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => ({ origins: state.origins });

export default connect(mapStateToProps)(MyComponent);
