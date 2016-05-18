import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';

const addLoggerToMiddlewares = (middlewares, predicate) => {
	if (process.env.NODE_ENV === 'development') {
		const logger = createLogger({ collapsed: true, predicate });
		middlewares.push(logger);
	}
};

export const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
	const middlewares = [sagaMiddleware];
	addLoggerToMiddlewares(middlewares);
	const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
	const store = createStoreWithMiddleware(rootReducer);

	return store;
};

export const store = configureStore();
