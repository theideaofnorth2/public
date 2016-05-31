import React from 'react';
// import { whyDidYouUpdate } from 'why-did-you-update';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store, sagaMiddleware } from './store';
import App from './components/App';
import rootSaga from './sagas';
import './global.css';

// if (process.env.NODE_ENV === 'development') {
// 	whyDidYouUpdate(React);
// }

sagaMiddleware.run(rootSaga);

const rootElement = document.querySelector('.root');
const renderApp = () => {
	render(
		<Provider store={store}>
			<App />
		</Provider>,
		rootElement
	);
};

renderApp();
