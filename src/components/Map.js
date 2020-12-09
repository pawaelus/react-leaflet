import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw-src'
import 'leaflet-draw/dist/leaflet.draw-src.css'
import * as turf from '@turf/turf'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import 'beautifymarker/leaflet-beautify-marker-icon'
import 'beautifymarker/leaflet-beautify-marker-icon.css'
//
import 'leaflet.idw/src/leaflet-idw'
import 'leaflet.idw/src/leaflet-idw-directdraw'


import 'font-awesome/css/font-awesome.css'

const style = {
    height: "100vh",
    width: "100vw"
};


let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;


class Map extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            point: null,
            gios: [],
            dataString: {},
            lol: {},
            values: {}
        }
        this.baseState = this.state

    }

    getReportColor = (type) => {
        switch (type) {
            case 'Bardzo dobry':
                return "#07a001"
            case 'Dobry':
                return "#6aff00"
            case 'Umiarkowany':
                return "#ffd400"
            case 'Dostateczny':
                return "#ff9a00"
            case 'Zły':
                return "#ff0000"
            case 'Bardzo zły':
                return "#840707"
            case 'Brak indeksu':
                return "#6d6d6d"

        }
    }

    getClassValue = (type) => {
        switch (type) {
            case 'Bardzo dobry':
                return 6
            case 'Dobry':
                return 5
            case 'Umiarkowany':
                return 4
            case 'Dostateczny':
                return 3
            case 'Zły':
                return 2
            case 'Bardzo zły':
                return 1
            case 'Brak indeksu':
                return 0

        }
    }

    addLayer = () => {
        this.poj.addTo(this.map)
        // alert('lol')

    }

    removeLayer = () => {
        this.poj.removeFrom(this.map)


    }


    onMapClick = (e) => {

        this.setState({point: e.latlng})
        // this.points.push(turf.point([e.latlng.lat, e.latlng.lng ], {a:1}));
        // _points.push(turf.point(l._layers[feat].feature.geometry.coordinates));
        this.targetPoint = turf.point([e.latlng.lat, e.latlng.lng], {"marker-color": "#0F0"});

        var nearest = turf.nearestPoint(this.targetPoint, this.points);
        console.log('nearest')
        console.log(nearest.properties.id)
        // console.log(nearest.properties)

        // this.dataString = "jo"
        this.setState(this.baseState)
        fetch('http://api.gios.gov.pl/pjp-api/rest/station/sensors/' + nearest.properties.id, {
            method: 'GET',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://193.201.34.28:443',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
            }
        })
            .then((response) => {
                response.json().then((data) => {
                    // console.log(data)
                    // data.forEach((element, index) => {
                    // console.log(element)
                    // http://api.gios.gov.pl/pjp-api/rest/data/getData/92
                    // http://api.gios.gov.pl/pjp-api/rest/aqindex/getIndex/52

                    // fetch('http://api.gios.gov.pl/pjp-api/rest/aqindex/getIndex/'+element.stationId)
                    fetch('http://api.gios.gov.pl/pjp-api/rest/aqindex/getIndex/' + nearest.properties.id, {
                        method: 'GET',
                        redirect: 'follow',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': 'http://193.201.34.28:443',
                            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
                        }
                    })
                        .then((response) => {
                            response.json().then((data_station) => {
                                console.log(JSON.stringify(data_station))
                                // alert(JSON.stringify(data_station))
                                // this.currentPositionMarker.setLatLng(e.latlng)
                                // .bindPopup(JSON.stringify(data_station))
                                // .openPopup()


                                this.setState({
                                    // values: { ...this.state.values, [data_station.id]: data_station }

                                    // values: { ...this.state.values, [index+'_'+data_station.id]: data_station.stIndexLevel }
                                    values: {...this.state.values, [data_station.id]: data_station.stIndexLevel}
                                })

                                console.log(this.getReportColor(data_station.stIndexLevel.indexLevelName))
                                console.log(data_station.stIndexLevel.indexLevelName)
                                // console.log(data_station.stIndexLevel.stIndexLevelName)


                                this.currentPositionMarker.setLatLng(e.latlng)
                                    .setIcon(
                                        L.BeautifyIcon.icon({
                                            icon: "trash-o",
                                            iconShape: "marker",
                                            textColor: this.getReportColor(data_station.stIndexLevel.indexLevelName),
                                            size: [33, 44],
                                            borderWidth: "3",
                                            // borderStyle: "dotted",
                                            borderColor: this.getReportColor(data_station.stIndexLevel.indexLevelName),
                                            // textColor: "rgba(2,48,61,0.61,0.5)",
                                            backgroundColor: this.getReportColor(data_station.stIndexLevel.indexLevelName),
                                        })
                                    )
                                    .bindPopup(data_station.stIndexLevel.indexLevelName)
                                // .openPopup()

                            }).catch((err) => {
                                console.log(err);
                            })
                        });


                    // })

                }).catch((err) => {
                    console.log(err);
                })
            });


        // console.log(JSON.stringify(nearest.geometry.coordinates))
        // console.log([e.latlng.lat, e.latlng.lng])
        console.log(nearest.properties.distanceToPoint)
        // new L.circle([e.latlng.lat, e.latlng.lng],
        //     radius: nearest.properties.distanceToPoint)
        //     .addTo(this.map)
        // L.circle([e.latlng.lat, e.latlng.lng], {radius: nearest.properties.distanceToPoint*1000}).addTo(this.map);
        this.nearestStationMarker.setLatLng(nearest.geometry.coordinates)

        // http://api.gios.gov.pl/pjp-api/rest/station/sensors/14

        this.distanceLine.setLatLngs([
            [e.latlng.lat, e.latlng.lng],
            [parseFloat(nearest.geometry.coordinates[0]), parseFloat(nearest.geometry.coordinates[1])]
        ])
        this.distanceLine.bindTooltip(JSON.stringify(nearest.properties.distanceToPoint))
            .openTooltip()


        console.log(this.state.dataString)

        this.currentPositionMarker.setLatLng(e.latlng)
            .bindPopup(JSON.stringify(this.state.values))
            .setIcon(
                L.BeautifyIcon.icon({
                    icon: "trash-o",
                    iconShape: "marker",
                    textColor: "transparent",
                    size: [33, 44],
                    borderWidth: "3",
                    // borderStyle: "dotted",
                    borderColor: "transparent",
                    // textColor: "rgba(2,48,61,0.61,0.5)",
                    backgroundColor: "transparent",
                })
            )
        // .openPopup()

        // console.log([[e.latlng.lat, e.latlng.lng], [nearest.geometry.coordinates[0], nearest.geometry.coordinates[1]]])
        // console.log('points')
        // // console.log([e.latlng])
        // console.log(this.points)

    }


    componentDidMount() {
        // create map
        this.poj = L.tileLayer.wms('http://193.201.34.28/hackathon/wms', {
            layers: 'pojemniki',
            maxZoom: 21,
            format: 'image/png',
            transparent: true,
            attribution: "ep"
        });


        var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            osm = L.tileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib})


        this.map = L.map('map', {
            center: [51.8419, 21.0315],
            zoom: 5,
            layers: [
                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                })

            ]
        });


        var meteoPoints = [];


        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://193.201.34.28:443',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
            }
        };

        fetch('http://api.gios.gov.pl/pjp-api/rest/station/findAll', requestOptions)
            .then((response) => {
                response.json().then((data) => {
                    console.log(data)
                    console.log('meteo')
                    console.log(data)
                    data.forEach((element) => {
                        //
                        console.log(element.id)

                        fetch('http://api.gios.gov.pl/pjp-api/rest/aqindex/getIndex/' + element.id, requestOptions)
                            .then((response) => {
                                response.json().then((data_station) => {
                                    if (data_station.stIndexLevel.indexLevelName !== 'Brak indeksu') {
                                        meteoPoints.push([element.gegrLat, element.gegrLon, this.getClassValue(data_station.stIndexLevel.indexLevelName)])
                                    }
                                    // if (data_station.stIndexLevel.indexLevelName == null){
                                    //     console.log(data_station.stIndexLevel)
                                    // }
                                    // console.log(data_station.stIndexLevel.indexLevelName)
                                    // }
                                    // meteoPoints.push([element.gegrLat, element.gegrLon, this.getClassValue(data_station.stIndexLevel.indexLevelName)])
                                    // console.log(JSON.stringify(data_station.stIndexLevel.indexLevelName))
                                })
                            })

                        // meteoPoints.push([element.gegrLat, element.gegrLon, Math.random() * 10])
                        console.log(meteoPoints)


                        // console.log(element)
                        L.circleMarker([element.gegrLat, element.gegrLon], {radius: 2}).addTo(this.map);
                        this._points.push(turf.point(
                            [element.gegrLat, element.gegrLon],
                            {
                                id: element.id,
                                name: element.stationName,
                                // prop: element.commune
                            }));
                    })
                    // zgloszenia_wfs.addData(data)
                    console.log(meteoPoints)
                }).catch((err) => {
                    console.log(err);
                })
            });


        this.map.on('click', this.onMapClick);

        this.currentPositionMarker = new L.marker([-90, -90])
            .addTo(this.map);
        this.nearestStationMarker = new L.marker([0, 0])
            .setIcon(
                L.BeautifyIcon.icon({
                    icon: "",
                    iconShape: "circle",
                    textColor: "#3c5c57",
                    size: [10, 10],
                    borderWidth: "3",
                    // borderStyle: "dotted",
                    borderColor: "#3c5c57",
                    // textColor: "rgba(2,48,61,0.61,0.5)",
                    backgroundColor: "transparent",
                })
            ).addTo(this.map);

        this.distanceLine = new L.polyline([[0, 0], [0, 0]]).addTo(this.map)
        // this.marker = new L.circleMarker(this.props.markerPosition).addTo(this.map);


        this._points = Array();

        // this.targetPoint = turf.point([28.965797, 41.010086], {"marker-color": "#0F0"});
        // this.points = turf.featureCollection([
        //     turf.point([28.973865, 41.011122]),
        //     turf.point([28.948459, 41.024204]),
        //     turf.point([28.938674, 41.013324])
        // ]);

        this.points = turf.featureCollection(this._points);

        // this._points.push(turf.point([1,1], {a:1}));


        // var nearest = turf.nearestPoint(targetPoint, points);


        console.log('turf test')
        // console.warn(nearest)

        L.control.layers({
            'osm': osm.addTo(this.map),
            "google": L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
                attribution: 'google'
            })
        }, {
            // 'drawlayer': drawnItems
            'wioś': L.idwLayer(meteoPoints, {
                opacity: 0.6,
                maxZoom: 18,
                cellSize: 10,
                exp: 1,
                max: 6,
                gradient: {
                    0: '#ffffff',
                    0.2: '#840707',
                    0.4: '#ff5f05',
                    0.6: '#ffd500',
                    0.8: '#048b2d',
                    1: '#066303'
                }
            }),
        }, {position: 'topleft', collapsed: false}).addTo(this.map);


        // 6:'#07a001',
        //     5:'#6aff00',
        //     4:'#ffd400',
        //     3:'#ff9a00',
        //     2:'#ff0000',
        //     1:'#840707',
        //     0:'#6d6d6d',


    }

    componentDidUpdate({markerPosition}) {
        // check if position has changed
        if (this.props.markerPosition !== markerPosition) {
            this.marker.setLatLng(this.props.markerPosition);
        }
    }

    render() {
        return <div>
            <div id="map" zoom={this.zoom} style={style}></div>
            {/*<button onClick={this.addLayer}>addLayer</button>*/}
            {/*<button onClick={this.removeLayer}>addLayer</button>*/}
        </div>
    }
}

export default Map;