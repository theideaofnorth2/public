import { combineReducers } from 'redux';
import app from './app';
import destinations from './destinations';
import eggs from './eggs';
import exploration from './exploration';
import stories from './stories';
import interviews from './interviews';
import map from './map';
import origins from './origins';
import zoomers from './zoomers';

const rootReducer = combineReducers({
	app,
	destinations,
	eggs,
	exploration,
	stories,
	interviews,
	map,
	origins,
	zoomers,
});

export default rootReducer;
