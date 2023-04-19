
/*
 *    Define a leaflet map and with markers
 *    Using maps from mapbox.com with my official API token
 */
var mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHJhaW5ib3kzODAxIiwiYSI6ImNsZnM2dTk4dzAwangzam5xa3A0Zjc0bnUifQ.0GuHgB739lKWMJEQt-pt0g';
var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
             '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
             'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

var satellite_layer = L.tileLayer(mbUrl, {id: 'mapbox/satellite-v9', attribution: mbAttr, maxZoom: 18});
var map_layer       = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', attribution: mbAttr, maxZoom: 18});
var base_layers = {
  "Satellite": satellite_layer,
  "Map":       map_layer,
};


var map;
var default_view = {};

function onMapClick(e) {  // Function to show latitude and longitude where user clicks (I used this to find the coordinates needed)
	var popup = L.popup();
	popup.setLatLng(e.latlng)
  popup.setContent("You clicked at " + e.latlng.toString())
  popup.openOn(map);
}

/*
 *  Create the map and place it onto HTML page
 */
function init_map(div_id, lat, long, zoom) {

	// Save the view info as the default
	default_view['lat'] = lat;
	default_view['long'] = long;
	default_view['zoom'] = zoom;

  map = L.map(div_id, {
		center: [lat, long],
    zoom: zoom,
	  layers: [satellite_layer], //Default layer
	});

	L.control.layers(base_layers, {}).addTo(map);  // Add Layer selector

	// Debug
	map.on('click', onMapClick);  // For finding lat/long
}

/*
 *  add_map_pin(location)
 *
 *  Add a PIN icon on the map for a given location.
 *  location must have a NAME, URL, LAT and LONG properties
 */
function add_map_pin(location) {
	var m = L.marker([location.lat, location.long]);
	m.addTo(map);

	// Create popup
	html = "<b>" + location.name + "</b><br/>";
	html += '<a href="' + location.url + '">Show</a><br/>';
	location['popup'] = m.bindPopup(html);
}


/*
 *  add_sidebar_link(location_id, div_id)
 *
 *  Add a link to the side bar for the given location (from the global list of locations)
 */
function add_sidebar_link(location_id, div_id) {

  var a = document.createElement("a");
	a.id = location_id;
	a.setAttribute("class", "sidebar-link");
	a.setAttribute("onclick", "show_location('" + location_id + "')");
	a.innerHTML = locations[location_id].name;

	parent = document.getElementById(div_id);
	parent.appendChild(a);
}


/*
 *  show_location(location_id)
 *
 *  Lookup the given location_id in the global list of locations, and
 *  Zoom the map onto it (if it exists)
 */
function show_location(location_id) {
	  loc = locations[location_id];
	  if (loc) {
	    map.setView(L.latLng( loc.lat, loc.long), 16);
	    loc.popup.openPopup();
	  }
	  return false;
}

/*
 *  reset_map_view()
 *
 *  Reset the map view back to the default (the values stored when map was created)
 */
function reset_map_view() {
	  map.setView([default_view.lat, default_view.long], default_view.zoom);
}

