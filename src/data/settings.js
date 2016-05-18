import canadaCoords from 'tion2/data/canadaCoords';
import worldCoords from 'tion2/data/worldCoords';
import styles from './styles.json';

export const center = {
	lat: 62.536813,
	lng: -97.445291,
};

export const mapOptions = {
	disableDefaultUI: true,
	zoom: 4,
	minZoom: 4,
	maxZoom: 4,
	center,
	styles,
};

export const polygonOptions = {
	strokeWeight: 0,
	fillColor: '#000000',
	fillOpacity: 0.8,
	paths: [worldCoords, canadaCoords],
};
