
function initMap() {
    var el = document.getElementById('map');
    var myLocation = new google.maps.LatLng(3.597031, 98.678513);
    var mapOptions = {
        zoom: 10,
        center: myLocation
    };
    var map = new google.maps.Map(el, mapOptions);

    // MARKER
    var marker = new google.maps.Marker({
        position: myLocation,
        map: map
    });

    // CONTENT WINDOW
    var contentString = '<h1>Medan</h1>';

    var infoWindow = new google.maps.InfoWindow({ 
        content: contentString
    });
    
    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.open(map, marker);
      });

}
