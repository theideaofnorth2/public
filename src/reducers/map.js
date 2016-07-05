const defaultState = {
	initialized: false,
	ready: false,
	dragging: false,
	animating: false,
	centering: false,
	zoom: 4,
	zooming: false,
	level: 'main',
	center: { lat: 62.536813, lng: -97.445291 },
};

export default function reducer(state = defaultState, action = null) {
	switch (action.type) {
		case 'MAP_INITIALIZED':
			return {
				...state,
				initialized: true,
			};
		case 'MAP_READY':
			return {
				...state,
				ready: true,
			};
		case 'MAP_DRAG_START':
			return {
				...state,
				dragging: true,
			};
		case 'MAP_DRAG_END':
			return {
				...state,
				dragging: false,
			};
		case 'MAP_CENTER':
			return {
				...state,
				center: action.center,
				animating: true,
				centering: true,
			};
		case 'MAP_CENTER_FINISHED':
			return {
				...state,
				centering: false,
			};
		case 'MAP_ZOOM':
			return {
				...state,
				zooming: true,
				zoom: action.direction === 'in' ? parseInt(action.zoom, 10) : 4,
				level: action.direction === 'in' ? 'origin' : 'main',
			};
		case 'MAP_ZOOM_FINISHED':
			return {
				...state,
				animating: false,
				zooming: false,
			};
		default:
			return state;
	}
}
