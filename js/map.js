function initMap() {
    // Map options
    var options = {
        center: { lat: 41.8781, lng: -87.6298 }, // Chicago coordinates
        zoom: 12
    };

    // Create map
    var map = new google.maps.Map(document.getElementById('map'), options);

    // Custom marker icon
    var customIcon = {
        url: 'https://maps.google.com/mapfiles/kml/paddle/blu-blank.png',
        scaledSize: new google.maps.Size(40, 40),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(20, 40)
    };

    // Add draggable marker with custom icon
    var draggableMarker = new google.maps.Marker({
        position: { lat: 41.8781, lng: -87.6298 },
        map: map,
        title: 'Drag Me!',
        draggable: true,
        icon: customIcon
    });

    // Info window for draggable marker
    var infoWindow = new google.maps.InfoWindow({
        content: '<h3>Draggable Marker</h3><p>Drag me to a new location!</p>'
    });

    // Show info window when draggable marker is clicked
    draggableMarker.addListener('click', function() {
        infoWindow.open(map, draggableMarker);
    });

    // Search box for finding locations
    var input = document.createElement('input');
    input.placeholder = 'Search for a location';
    input.style.marginTop = '10px';
    input.style.width = '200px';
    document.body.appendChild(input);

    var searchBox = new google.maps.places.SearchBox(input);

    // Bias the search results towards the map's viewport
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    // Handle the search result selection
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // For each place, display the name and location
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log('Returned place contains no geometry');
                return;
            }

            // Create a marker for each place
            var searchMarker = new google.maps.Marker({
                map: map,
                title: place.name,
                position: place.geometry.location
            });

            // Extend the map bounds to include the location of this marker
            bounds.extend(place.geometry.location);
        });

        // Fit the map bounds to the search results
        map.fitBounds(bounds);
    });
}   