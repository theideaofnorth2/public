import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import utilsCss from "tion2/components/common/utils";
import css from "./css";

export class MyComponent extends Component {
  render() {
    const thisClass = classnames(utilsCss.pointable, css.background, {
      [css.visible]: this.props.app.view !== "intro" &&
        this.props.app.view !== "waiting",
      [css.all]: this.props.app.view === "home",
      [css.some]: this.props.app.view !== "intro" &&
        this.props.app.view !== "waiting" &&
        this.props.app.view !== "home"
    });
    return <div className={thisClass} />;
  }
}

const mapStateToProps = state => ({
  app: state.app,
  introduction: state.introduction
});

export default connect(mapStateToProps)(MyComponent);
