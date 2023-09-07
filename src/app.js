"use strict";

var locations = [
    ['Title A', 3.180967,101.715546, 1],
    ['Title B', 3.200848,101.616669, 2],
    ['Title C', 3.147372,101.597443, 3],
    ['Title D', 3.19125,101.710052, 4]
];

function initMap() {
    const mapCenter = {
        lat: 40.12150192260742,
        lng: -100.45039367675781
    };
    const map = new google.maps.Map(document.getElementById("gmp-map"), {
        zoom: 3,
        center: mapCenter,
        fullscreenControl: false,
        zoomControl: true,
        streetViewControl: false
    });
    var infowindow = new google.maps.InfoWindow;

    var marker, i;

    for (i = 0; i < locations.length; i++) {  
        marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                map: map
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infowindow.setContent(locations[i][0]);
                    infowindow.open(map, marker);
                }
        })(marker, i));
    }
}