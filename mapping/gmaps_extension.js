new(function() {
    var ready = false;

    $("body").prepend("<div id='map_container' style='display: inline-block;'></div");
    $("#map_container").hide();

    window.initMap = function() {
          };



    $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBKw5lJizJ9bcCteYTDfKZTMOV20chmTLc&callback=initMap", function( data, textStatus, jqxhr ) { if(textStatus === "success") ready = true; }); 
    var ext = this;
    
    ext._getStatus = function() {
        if (!ready) {
            return {
                status: 1,
                msg: 'loading google maps...'
            };
        }
        return {
            status: 2,
            msg: 'Ready'
        };
    };
    
    var map;
    var street_view;
    ext.open_map = function() {
        $("#map_container").show();
        $('#map_container').animate({ width: "500px", height: "500px", display: "inline-block"} , 400, "swing", function(){

            map = new google.maps.Map(document.getElementById('map_container'), {
                  center: {lng: -122.087461, lat: 37.422069 },
                      zoom: 8
                            });
    
            street_view = new google.maps.StreetViewPanorama(document.getElementById('map_container'),
                    {
                        position: map.getCenter(),
                        pov: {
                            heading: 34,
                            pitch: 10
                        },
                        visible: false
                    }
            );
            map.setStreetView(street_view);
            var ctaLayer = new google.maps.KmlLayer({
                url: 'http://kml-samples.googlecode.com/svn/trunk/kml/Placemark/placemark.kml',
                preserveViewport: true,
                map: map
            });
    
        });
    };

    ext.set_zoom = function(zoom){
        map.setZoom(zoom);
    };

    var marker;
    ext.pan_to = function(place){
        new google.maps.Geocoder().geocode({address: place}, function(result, geoStatus){
            if(geoStatus === google.maps.GeocoderStatus.OK){
                var position = result[0].geometry.location;
                map.panTo(position);
                if(!marker){
                    marker = new google.maps.Marker({map: map, position: position});
                }
                else{
                    marker.setPosition(position);
                }
                street_view.setPosition(position);
            }
        
        });

    };

    ext.toggle_street_view = function() {
        street_view.setVisible(!street_view.getVisible());
        if(street_view.getVisible() && marker){
            street_view.setPosition(marker.getPosition());
        }
    };

    ext.close_map = function() {
        $('#map_container').animate({ width: "0px", height: "0px", display: "none"} , 400, "swing");
    
    };

    ext.walk = function() {
        street_view.setPano((street_view.getLinks()[0].pano))
    };

    var descriptor = {
        blocks: [
            //['', 'set voice to %m.voices', 'set_voice', ''],
            ['', 'open map', 'open_map', ''],
            ['', 'pan to %s', 'pan_to', 'Boston, MA'],
            ['', 'close map', 'close_map', ''],
            ['', 'set zoom to %n', 'set_zoom', 8],
            ['', 'toggle street view', 'toggle_street_view', ''],
            ['', 'walk down the street', 'walk', '']


        ],
        menus: {}
    };

    ScratchExtensions.register('Google Maps', descriptor, ext);

})();


