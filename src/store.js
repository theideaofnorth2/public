import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import rootReducer from './reducers';

const addLoggerToMiddlewares = (middlewares, predicate) => {
	if (process.env.NODE_ENV === 'development') {
		return [
			createLogger({ collapsed: true, predicate }),
			...middlewares,
		];
	}
	return middlewares;
};

export const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
	const middlewares = addLoggerToMiddlewares([sagaMiddleware]);
	const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
	return createStoreWithMiddleware(rootReducer);
};

export const store = configureStore();
