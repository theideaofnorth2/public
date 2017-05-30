import React, { Component } from "react";
import appCss from "tion2/components/App/css";
import Cities from "./Cities";

export class MyComponent extends Component {
  render() {
    return (
      <div className={appCss.layer0}>
        <Cities />
      </div>
    );
  }
}

export default MyComponent;
