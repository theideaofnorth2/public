import { combineReducers } from 'redux';
import app from './app';
import cities from './cities';
import interviews from './interviews';
import map from './map';
import zoomer from './zoomer';

const rootReducer = combineReducers({
	app,
	cities,
	interviews,
	map,
	zoomer,
});

export default rootReducer;
