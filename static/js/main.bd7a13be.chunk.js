(this["webpackJsonpreact-leaflet"]=this["webpackJsonpreact-leaflet"]||[]).push([[0],{13:function(e,t,o){e.exports=o(28)},18:function(e,t,o){},19:function(e,t,o){},28:function(e,t,o){"use strict";o.r(t);var n=o(1),a=o.n(n),r=o(10),i=o.n(r),s=(o(18),o(3)),l=o(4),c=o(7),p=o(6),d=(o(19),o(5)),g=o(8),h=o(0),u=o.n(h),m=(o(20),o(21),o(22),o(2)),f=o(11),v=o.n(f),y=o(12),k=o.n(y),L=(o(23),o(24),o(25),o(26),o(27),{height:"100vh",width:"100vw"}),b=u.a.icon({iconUrl:v.a,shadowUrl:k.a,iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[41,41]});u.a.Marker.prototype.options.icon=b;var w=function(e){Object(c.a)(o,e);var t=Object(p.a)(o);function o(e){var n;return Object(s.a)(this,o),(n=t.call(this,e)).getReportColor=function(e){switch(e){case"Bardzo dobry":return"#07a001";case"Dobry":return"#6aff00";case"Umiarkowany":return"#ffd400";case"Dostateczny":return"#ff9a00";case"Z\u0142y":return"#ff0000";case"Bardzo z\u0142y":return"#840707";case"Brak indeksu":return"#6d6d6d"}},n.getClassValue=function(e){switch(e){case"Bardzo dobry":return 6;case"Dobry":return 5;case"Umiarkowany":return 4;case"Dostateczny":return 3;case"Z\u0142y":return 2;case"Bardzo z\u0142y":return 1;case"Brak indeksu":return 0}},n.addLayer=function(){n.poj.addTo(n.map)},n.removeLayer=function(){n.poj.removeFrom(n.map)},n.onMapClick=function(e){n.setState({point:e.latlng}),n.targetPoint=m.point([e.latlng.lat,e.latlng.lng],{"marker-color":"#0F0"});var t=m.nearestPoint(n.targetPoint,n.points);console.log("nearest"),console.log(t.properties.id),n.setState(n.baseState),fetch("http://api.gios.gov.pl/pjp-api/rest/station/sensors/"+t.properties.id,{method:"GET",redirect:"follow",headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, PUT, DELETE"}}).then((function(o){o.json().then((function(o){fetch("http://api.gios.gov.pl/pjp-api/rest/aqindex/getIndex/"+t.properties.id,{method:"GET",redirect:"follow",headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, PUT, DELETE"}}).then((function(t){t.json().then((function(t){console.log(JSON.stringify(t)),n.setState({values:Object(g.a)(Object(g.a)({},n.state.values),{},Object(d.a)({},t.id,t.stIndexLevel))}),console.log(n.getReportColor(t.stIndexLevel.indexLevelName)),console.log(t.stIndexLevel.indexLevelName),n.currentPositionMarker.setLatLng(e.latlng).setIcon(u.a.BeautifyIcon.icon({icon:"trash-o",iconShape:"marker",textColor:n.getReportColor(t.stIndexLevel.indexLevelName),size:[33,44],borderWidth:"3",borderColor:n.getReportColor(t.stIndexLevel.indexLevelName),backgroundColor:n.getReportColor(t.stIndexLevel.indexLevelName)})).bindPopup(t.stIndexLevel.indexLevelName)})).catch((function(e){console.log(e)}))}))})).catch((function(e){console.log(e)}))})),console.log(t.properties.distanceToPoint),n.nearestStationMarker.setLatLng(t.geometry.coordinates),n.distanceLine.setLatLngs([[e.latlng.lat,e.latlng.lng],[parseFloat(t.geometry.coordinates[0]),parseFloat(t.geometry.coordinates[1])]]),n.distanceLine.bindTooltip(JSON.stringify(t.properties.distanceToPoint)).openTooltip(),console.log(n.state.dataString),n.currentPositionMarker.setLatLng(e.latlng).bindPopup(JSON.stringify(n.state.values)).setIcon(u.a.BeautifyIcon.icon({icon:"trash-o",iconShape:"marker",textColor:"transparent",size:[33,44],borderWidth:"3",borderColor:"transparent",backgroundColor:"transparent"}))},n.state={point:null,gios:[],dataString:{},lol:{},values:{}},n.baseState=n.state,n}return Object(l.a)(o,[{key:"componentDidMount",value:function(){var e=this;this.poj=u.a.tileLayer.wms("http://193.201.34.28/hackathon/wms",{layers:"pojemniki",maxZoom:21,format:"image/png",transparent:!0,attribution:"ep"});var t=u.a.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:18,attribution:'&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'});this.map=u.a.map("map",{center:[51.8419,21.0315],zoom:5,layers:[u.a.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'})]});var o=[],n={method:"GET",redirect:"follow",headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, PUT, DELETE"}};fetch("http://api.gios.gov.pl/pjp-api/rest/station/findAll",n).then((function(t){t.json().then((function(t){console.log(t),console.log("meteo"),console.log(t),t.forEach((function(t){console.log(t.id),fetch("http://api.gios.gov.pl/pjp-api/rest/aqindex/getIndex/"+t.id,n).then((function(n){n.json().then((function(n){"Brak indeksu"!==n.stIndexLevel.indexLevelName&&o.push([t.gegrLat,t.gegrLon,e.getClassValue(n.stIndexLevel.indexLevelName)])}))})),console.log(o),u.a.circleMarker([t.gegrLat,t.gegrLon],{radius:2}).addTo(e.map),e._points.push(m.point([t.gegrLat,t.gegrLon],{id:t.id,name:t.stationName}))})),console.log(o)})).catch((function(e){console.log(e)}))})),this.map.on("click",this.onMapClick),this.currentPositionMarker=new u.a.marker([-90,-90]).addTo(this.map),this.nearestStationMarker=new u.a.marker([0,0]).setIcon(u.a.BeautifyIcon.icon({icon:"",iconShape:"circle",textColor:"#3c5c57",size:[10,10],borderWidth:"3",borderColor:"#3c5c57",backgroundColor:"transparent"})).addTo(this.map),this.distanceLine=new u.a.polyline([[0,0],[0,0]]).addTo(this.map),this._points=Array(),this.points=m.featureCollection(this._points),console.log("turf test"),u.a.control.layers({osm:t.addTo(this.map),google:u.a.tileLayer("http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",{attribution:"google"})},{"wio\u015b":u.a.idwLayer(o,{opacity:.6,maxZoom:18,cellSize:10,exp:1,max:6,gradient:{0:"#ffffff",.2:"#840707",.4:"#ff5f05",.6:"#ffd500",.8:"#048b2d",1:"#066303"}})},{position:"topleft",collapsed:!1}).addTo(this.map)}},{key:"componentDidUpdate",value:function(e){var t=e.markerPosition;this.props.markerPosition!==t&&this.marker.setLatLng(this.props.markerPosition)}},{key:"render",value:function(){return a.a.createElement("div",null,a.a.createElement("div",{id:"map",zoom:this.zoom,style:L}))}}]),o}(a.a.Component),x=function(e){Object(c.a)(o,e);var t=Object(p.a)(o);function o(e){var n;return Object(s.a)(this,o),(n=t.call(this,e)).moveMarker=function(){var e=n.state.markerPosition,t=e.lat,o=e.lng;n.setState({markerPosition:{lat:t+Math.floor(10*Math.random()),lng:o+Math.floor(10*Math.random())}})},n.state={markerPosition:{lat:51.8419,lng:21.0315}},n}return Object(l.a)(o,[{key:"render",value:function(){var e=this.state.markerPosition;return a.a.createElement("div",null,a.a.createElement(w,{markerPosition:e}))}}]),o}(a.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(x,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[13,1,2]]]);
//# sourceMappingURL=main.bd7a13be.chunk.js.map