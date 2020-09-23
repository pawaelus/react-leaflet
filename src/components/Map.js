import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw-src'
import 'leaflet-draw/dist/leaflet.draw-src.css'

const style = {
    height: "80vh",
    width:"100vw"
};

class Map extends React.Component {

    onMapClick = () => {
     //   alert("test")
    }

    zoom = () => {
        this.map.setZoom(1)
    }


    componentDidMount() {
        // create map
        var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib })


        this.map = L.map('map', {
            center: [51.8419, 21.0315],
            zoom: 16,
            layers: [
                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                })

            ]
        });



        // add marker
        this.marker = L.circleMarker(this.props.markerPosition).addTo(this.map);

        this.map.on('click', this.onMapClick);

        var drawnItems = L.featureGroup().addTo(this.map);

        L.control.layers({
            'osm': osm.addTo(this.map),
            "google": L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
                attribution: 'google'
            })
        },  { 'drawlayer': drawnItems }, { position: 'topleft', collapsed: false }).addTo(this.map);

        this.map.addControl(new L.Control.Draw({
            edit: {
                featureGroup: drawnItems,
                poly: {
                    allowIntersection: false
                }
            },
            draw: {
                polygon: {
                    allowIntersection: false,
                    showArea: true
                }
            }
        }));


        this.map.on(L.Draw.Event.CREATED, function (event) {
            var layer = event.layer;

            drawnItems.addLayer(layer);

            var drawnItemsGeoJSON = drawnItems.toGeoJSON()
            console.log(drawnItemsGeoJSON.features.length)
            console.log(drawnItemsGeoJSON.features)
        });


    }

    componentDidUpdate({ markerPosition }) {
        // check if position has changed
        if (this.props.markerPosition !== markerPosition) {
            this.marker.setLatLng(this.props.markerPosition);
        }
    }

    render() {
        return <div><div id="map" zoom={this.zoom} style={style} ></div><button onClick={this.zoom}>setZoom</button></div>
    }
}

export default Map;