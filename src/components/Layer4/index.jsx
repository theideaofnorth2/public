import React, { Component } from "react";
import { connect } from "react-redux";
import appCss from "tion2/components/App/css";
import { imagesUri } from "tion2/utils/tools";
import Audio from "./Audio";
import Controls from "./Controls";
import EggInterviewIcons from "./Eggs/EggInterviewIcons";
import EggInterviewCovers from "./Eggs/EggInterviewCovers";
import Content from "./Content";
import Zoomers from "./Zoomers";
import Blocker from "./Blocker";
import Introduction from "./Introduction";
import Slideshow from "./Slideshow";
import Video from "./Video";

const introductionImageUri = `${imagesUri}/introduction.jpg`;

export class MyComponent extends Component {
  render() {
    if (!this.props.app.configed) {
      return (
        <div className={appCss.layer4}>
          <Introduction />
          <link rel="preload" href={introductionImageUri} />
        </div>
      );
    } else if (!this.props.app.zoomersLoaded) {
      return (
        <div className={appCss.layer4}>
          <Introduction />
          <Zoomers />
        </div>
      );
    }
    return (
      <div className={appCss.layer4}>
        <Introduction />
        <Zoomers />
        <Audio />
        <Video />
        <EggInterviewCovers />
        <EggInterviewIcons />
        <Slideshow />
        <Content />
        <Controls />
        <Blocker />
      </div>
    );
  }
}

const mapStateToProps = state => ({ app: state.app });

export default connect(mapStateToProps)(MyComponent);
