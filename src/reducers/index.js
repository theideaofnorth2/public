import { combineReducers } from 'redux';
import app from './app';
import destinations from './destinations';
import interviews from './interviews';
import map from './map';
import origins from './origins';
import zoomers from './zoomers';

const rootReducer = combineReducers({
	app,
	destinations,
	interviews,
	map,
	origins,
	zoomers,
});

export default rootReducer;
