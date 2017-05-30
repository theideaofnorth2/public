import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { imagesUri } from "tion2/utils/tools";
import utilsCss from "tion2/components/common/utils";
import css from "./css";

const themesImagesUri = `${imagesUri}/themes`;

export class MyComponent extends Component {
  render() {
    if (!this.props.player.interview || !this.props.player.themeSlides)
      return null;
    if (!this.props.player.interview) return null;
    const themesContent = this.props.player.themeSlides.map((slide, index) => {
      const themeStyle = {
        backgroundImage: `url(${themesImagesUri}/${slide.path})`
      };
      const themeClass = classnames(utilsCss.pointable, css.theme, {
        [css.previousTheme]: slide.previous,
        [css.currentTheme]: slide.current
      });
      return <div key={index} style={themeStyle} className={themeClass} />;
    });
    return (
      <div>
        {themesContent}
      </div>
    );
  }
}

const mapStateToProps = state => ({ player: state.player });

export default connect(mapStateToProps)(MyComponent);
