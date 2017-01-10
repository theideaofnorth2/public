import { combineReducers } from 'redux';
import app from './app';
import background from './background';
import controls from './controls';
import destinations from './destinations';
import eggs from './eggs';
import exploration from './exploration';
import stories from './stories';
import interviews from './interviews';
import introduction from './introduction';
import map from './map';
import origins from './origins';
import pages from './pages';
import player from './player';
import themes from './themes';
import zoomers from './zoomers';

const rootReducer = combineReducers({
	app,
	background,
	controls,
	destinations,
	eggs,
	exploration,
	stories,
	interviews,
	introduction,
	map,
	origins,
	pages,
	player,
	themes,
	zoomers,
});

export default rootReducer;
