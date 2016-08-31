import { combineReducers } from 'redux';
import app from './app';
import controls from './controls';
import destinations from './destinations';
import eggs from './eggs';
import exploration from './exploration';
import stories from './stories';
import interviews from './interviews';
import introduction from './introduction';
import map from './map';
import origins from './origins';
import player from './player';
import themes from './themes';
import zoomers from './zoomers';

const rootReducer = combineReducers({
	app,
	controls,
	destinations,
	eggs,
	exploration,
	stories,
	interviews,
	introduction,
	map,
	origins,
	player,
	themes,
	zoomers,
});

export default rootReducer;
