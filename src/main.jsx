import React from "react";
// import { whyDidYouUpdate } from 'why-did-you-update';
import { render } from "react-dom";
import { Provider } from "react-redux";
import { store, sagaMiddleware } from "./store";
import { isSupported } from "./utils/platform";
import UnSupported from "./components/UnSupported";
import App from "./components/App";
import rootSaga from "./sagas";
import "./global.css";

// if (process.env.NODE_ENV === 'development') {
// 	whyDidYouUpdate(React);
// }

let renderedComponent;

if (!isSupported) {
  renderedComponent = <UnSupported />;
} else {
  sagaMiddleware.run(rootSaga);
  renderedComponent = (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const rootElement = document.querySelector(".root");
const renderApp = () => {
  render(renderedComponent, rootElement);
};
renderApp();
