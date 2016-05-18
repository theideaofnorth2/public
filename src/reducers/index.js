import { combineReducers } from 'redux';
import app from './app';
import cities from './cities';
import interviews from './interviews';
import map from './map';
import ui from './ui';

const rootReducer = combineReducers({
	app,
	cities,
	interviews,
	map,
	ui,
});

export default rootReducer;
