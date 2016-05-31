import { combineReducers } from 'redux';
import app from './app';
import destinations from './destinations';
import interviews from './interviews';
import map from './map';
import origins from './origins';
import zoomer from './zoomer';

const rootReducer = combineReducers({
	app,
	destinations,
	interviews,
	map,
	origins,
	zoomer,
});

export default rootReducer;
