"use strict";

var locations = [
    ['Alaska, Fairbanks', 'https://www.rosarycongressusa.org/wp-content/uploads/2022/10/2022-DRC-flyer-Fairbanks.pdf', 1, 64.8400511, -147.7199757],
    ['Connecticut, Hartford', 0, 2, 41.7658043, -72.6733723],
    ['Florida, Miami', 'https://www.rosarycongressusa.org/wp-content/uploads/2022/10/2022-DRC-Flyer-Miami-ADOM-2022.pdf', 3, 25.7616798, -80.1917902],
    ['Florida, St. Augustine', 'https://www.rosarycongressusa.org/wp-content/uploads/2022/08/2022-Flyer-with-Rosary-Graphic.pdf', 4, 29.8921835, -81.3139313],
    ['Florida, Venice', 'https://dioceseofvenice.org/diocesan-rosary-congress-oct-1-to-7/', 5, 27.0997775, -82.4542632],
    ['Georgia, Savannah', 'https://www.rosarycongressusa.org/wp-content/uploads/2022/09/2022-08-24-E-Rosary-Congress-Flyer-Comm-V3-DH-Real-Presence.pdf', 6, 32.0808989, -81.091203],
    ['Hawaii, Honolulu', 'https://www.rosarycongressusa.org/wp-content/uploads/2022/10/2022-DRC-Flyer-Final-2.pdf', 7, 21.3098845, -157.8581401],
    ['Iowa, Sioux City', 0, 8, 42.4963416, -96.40494079999999],
    ['Kansas, Salina', 0, 9, 38.8402805, -97.61142369999999],
    ['Louisiana, Greater New Orleans', 0, 10, 29.973969, -90.14949879999999],
    ['Louisiana, Shreveport', 0, 11, 32.5251516, -93.7501789],
    ['Maryland, Baltimore (Baltimore)', 'https://www.rosarycongressusa.org/wp-content/uploads/2022/10/Image.pdf', 12, 39.2903848, -76.6121893],
    ['Maryland, Baltimore (Fallston)', 'https://www.rosarycongressusa.org/wp-content/uploads/2022/10/2022-09-27-St.-Mark-Fallston.pdf', 13, 39.3745291, -76.5454519],
    ['Massachusetts, Springfield', 'https://www.rosarycongressusa.org/wp-content/uploads/2023/08/2023-Flyer-Stockbridge.pdf', 14, 42.1014831, -72.589811],
    ['Michigan, Lansing', 'https://www.rosarycongressusa.org/wp-content/uploads/2023/08/Rosary-Congress-2023-Lansing.pdf', 15, 42.732535, -84.5555347],
    ['Nebraska, Omaha (Columbus)', 'https://www.rosarycongressusa.org/wp-content/uploads/2023/08/2023-08-26-ERC-Promo-Flyer-Omaha-NE.pdf', 16, 41.2418116, -95.9673967],
    ['New Jersey, Metuchen', 0, 17, 40.5431598, -74.3632049],
    ['New Jersey, Newark', 'https://www.rcan.org/rosarycongress', 18, 40.735657, -74.1723667],
    ['New York, New York', 0, 19, 40.7128, -74.0060],
    ['North Carolina, Raleigh', 0, 20, 35.7795897, -78.6381787],
    ['Ohio, Steubenville', 'https://www.rosarycongressusa.org/wp-content/uploads/2023/08/Final-Flyer-Design-2023-rosary-congress.pdf', 21, 40.3697905, -80.63396379999999],
    ['Pennsylvania, Harrisburg', 0, 22, 40.2731911, -76.8867008],
    ['Pennsylvania, Philadelphia', 0, 23, 39.9525839, -75.1652215],
    ['Pennsylvania, Pittsburgh', 'https://www.rosarycongressusa.org/wp-content/uploads/2023/08/2023-Flyer-Pittsburgh-St-Anthony.pdf', 24, 40.44062479999999, -79.9958864],
    ['Rhode Island, Providence', 'https://www.rosarycongressusa.org/wp-content/uploads/2022/10/document2.pdf', 25, 41.8239891, -71.4128343],
    ['South Carolina, Charleston', 0, 26, 32.7764749, -79.93105120000001],
    ['Texas, Tyler', 0, 27, 32.3512601, -95.30106239999999],
    ['Texas, Victoria', 0, 28, 28.8052674, -97.0035982],
    ['Virginia, Arlington', 'https://www.rosarycongressusa.org/wp-content/uploads/2023/08/2023-SJTB-Publicity-Flier-1.pdf', 29, 38.8816208, -77.09098089999999],
    ['West Virginia, Wheeling-Charleston', 0, 30, 40.0663282, -80.71896319999999],
]

function initMap() {
    const mapCenter = {
        lat: 38.12150192260742,
        lng: -90.45039367675781
    };
    const map = new google.maps.Map(document.getElementById("gmp-map"), {
        zoom: 6,
        center: mapCenter,
        fullscreenControl: false,
        zoomControl: true,
        streetViewControl: false
    });
    var infowindow = new google.maps.InfoWindow;

    var marker, i;

    for (i = 0; i < locations.length; i++) {  
        marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][3], locations[i][4]),
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