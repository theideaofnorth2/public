import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import utilsCss from "tion2/components/common/utils";
import contentCss from "../css";

export class MyComponent extends Component {
  componentDidMount() {
    this.initLinks();
  }
  componentDidUpdate(prevProps) {
    if (this.props.app.language !== prevProps.app.language) this.initLinks();
  }
  initLinks = () => {
    const approachLink = this.contentRef.querySelector(
      "[data-tion2-link=approach]"
    );
    const aboutLink = this.contentRef.querySelector("[data-tion2-link=about]");
    const tourLink = this.contentRef.querySelector("[data-tion2-link=tour]");
    const interactiveLink = this.contentRef.querySelector(
      "[data-tion2-link=interactive]"
    );
    if (approachLink)
      approachLink.addEventListener("click", this.approachHandler);
    if (aboutLink) aboutLink.addEventListener("click", this.aboutHandler);
    if (tourLink) tourLink.addEventListener("click", this.tourHandler);
    if (interactiveLink)
      interactiveLink.addEventListener("click", this.interactiveHandler);
  };
  approachHandler = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.dispatch({ type: "MENU_APPROACH_CLICK" });
  };
  aboutHandler = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.dispatch({ type: "MENU_ABOUT_CLICK" });
  };
  tourHandler = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.dispatch({
      type: "EXPLORATION_CLICK",
      mode: "tour",
      confirm: false
    });
    this.props.dispatch({ type: "EXIT_CONTENT_CLICK" });
  };
  interactiveHandler = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.dispatch({
      type: "EXPLORATION_CLICK",
      mode: "interactive",
      confirm: false
    });
    this.props.dispatch({ type: "EXIT_CONTENT_CLICK" });
  };
  render() {
    const thisClass = classnames(utilsCss.pointable, contentCss.contentPage, {
      [contentCss.visible]: this.props.app.view === "page" &&
        this.props.pages.selectedPage === "tourEnd"
    });
    const { language } = this.props.app;
    return (
      <div className={thisClass}>
        <div
          className={contentCss.contentDiv}
          ref={div => {
            this.contentRef = div;
          }}
          dangerouslySetInnerHTML={{
            __html: this.props.pages.data.tourEnd[language]
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  app: state.app,
  pages: state.pages
});

export default connect(mapStateToProps)(MyComponent);
