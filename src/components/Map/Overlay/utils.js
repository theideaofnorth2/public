export function TION2Overlay(bounds, div, map) {
	this.bounds_ = bounds;
	this.div_ = div;
	this.map_ = map;
	this.setMap(map);
}

TION2Overlay.prototype = new google.maps.OverlayView();

TION2Overlay.prototype.onAdd = function onAdd() {
	const panes = this.getPanes();
	panes.overlayMouseTarget.appendChild(this.div_);
};

TION2Overlay.prototype.draw = function draw() {
	const overlayProjection = this.getProjection();
	const sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
	const ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
	const div = this.div_;
	div.style.left = `${sw.x}px`;
	div.style.top = `${ne.y}px`;
	div.style.width = `${ne.x - sw.x}px`;
	div.style.height = `${sw.y - ne.y}px`;
};

TION2Overlay.prototype.onRemove = function onRemove() {
	this.div_.parentNode.removeChild(this.div_);
	this.div_ = null;
};
