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
    ext.open_map = function() {
        $("#map_container").show();
        $('#map_container').animate({ width: "500px", height: "500px", display: "inline-block"} , 400, "swing", function(){

            map = new google.maps.Map(document.getElementById('map_container'), {
                  center: {lng: -122.087461, lat: 37.422069 },
                      zoom: 8
                            });
    
          var ctaLayer = new google.maps.KmlLayer({
            url: 'http://kml-samples.googlecode.com/svn/trunk/kml/Placemark/placemark.kml',
            preserveViewport: true,
            map: map
            });
    
    });
    
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
            }
        
        });

    };

    ext.close_map = function() {
        $('#map_container').animate({ width: "0px", height: "0px", display: "none"} , 400, "swing");
    
    };

    var descriptor = {
        blocks: [
            //['', 'set voice to %m.voices', 'set_voice', ''],
            ['', 'open map', 'open_map', ''],
            ['', 'pan to %s', 'pan_to', 'Boston, MA'],
            ['', 'close map', 'close_map', '']


        ],
        menus: {}
    };

    ScratchExtensions.register('Google Maps', descriptor, ext);

})();


