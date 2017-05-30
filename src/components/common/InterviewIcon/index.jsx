import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import interview from "./interview.svg";
import css from "./css";

export class MyComponent extends Component {
  onClick = () => {
    this.props.dispatch({
      type: "INTERVIEW_CLICK",
      interviewId: this.props.interview._id,
      originId: this.props.interview.originId,
      eggId: this.props.interview.eggId
    });
  };
  onMouseEnter = () => {
    this.props.dispatch({
      type: "INTERVIEW_MOUSE_ENTER",
      interviewId: this.props.interview._id
    });
  };
  onMouseLeave = () => {
    this.props.dispatch({ type: "INTERVIEW_MOUSE_LEAVE" });
  };
  get style() {
    return !this.props.interview.eggId
      ? {}
      : {
          top: `${this.props.interview.top}%`,
          left: `${this.props.interview.left}%`
        };
  }
  render() {
    const visible =
      (this.props.interview.parent === "origin" &&
        this.props.origins.selectedOriginId ===
          this.props.interview.originId) ||
      (this.props.interview.parent === "egg" &&
        this.props.eggs.selectedEggId === this.props.interview.eggId);
    const hovered =
      this.props.interviews.hoveredInterviewId === this.props.interview._id;
    const faded = !hovered && this.props.interviews.hoveredInterviewId !== null;
    const thisClass = classnames(css.interview, {
      [css.egg]: this.props.interview.eggId,
      [css.visible]: visible,
      [css.hovered]: hovered,
      [css.faded]: faded
    });
    return (
      <div
        className={thisClass}
        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        dangerouslySetInnerHTML={{ __html: interview }}
        style={this.style}
      />
    );
  }
}

const mapStateToProps = state => ({
  eggs: state.eggs,
  origins: state.origins,
  interviews: state.interviews
});

export default connect(mapStateToProps)(MyComponent);
