new(function() {
    var ext = this;
    MBTA_URL = "http://realtime.mbta.com/developer/api/v2/";

    ext.next_inbound = function(callback) {
        request_params = {
            api_key: "wX9NwuHnZU2ToO7GmGR9uw",
            stop: "Back Bay",
            max_time: 60,
            format: "json"
        };
        $.ajax({
            url: MBTA_URL + "schedulebystop",
            data: request_params,
            success: function(data, tStatus, xhr) {
                console.log(data + " " + ":: DATA");
                callback(data["mode"][0]["route"][0]["direction"][0]["trip"][0]["trip_name"]);
            },
            error: function(xhr, tStatus, error) {
                console.log(data.message);
                callback("ERROR");
            },
            complete: function(xhr, tStatus) {
                console.log(tStatus);
            }

        });

    };


    ext.next_outbound = function(callback) {

        request_params = {
            api_key: "wX9NwuHnZU2ToO7GmGR9uw",
            stop: "70070",
            max_time: 60,
            format: "json"
        };
        $.ajax({
            url: MBTA_URL + "schedulebystop",
            data: request_params,
            success: function(data, tStatus, xhr) {
                console.log(data + " " + ":: DATA");
                callback(data["mode"][0]["route"][0]["direction"][0]["trip"][0]["trip_name"]);
            },
            error: function(xhr, tStatus, error) {
                console.log(data.message);
                callback("ERROR");
            },
            complete: function(xhr, tStatus) {
                console.log(tStatus);
            }

        });

    };


    ext.next_outbound_prediction = function(callback) {

        request_params = {
            api_key: "wX9NwuHnZU2ToO7GmGR9uw",
            stop: "70070",
            format: "json"
        };
        $.ajax({
            url: MBTA_URL + "predictionsbystop",
            data: request_params,
            success: function(data, tStatus, xhr) {
                console.log(data + " " + ":: DATA");
                callback(data["mode"][0]["route"][0]["direction"][0]["trip"][0]["pre_away"] / 60);
            },
            error: function(xhr, tStatus, error) {
                console.log(data.message);
                callback("ERROR");
            },
            complete: function(xhr, tStatus) {
                console.log(tStatus);
            }

        });

    };


    ext.next_inbound_prediction = function(callback) {

        request_params = {
            api_key: "wX9NwuHnZU2ToO7GmGR9uw",
            stop: "70069",
            format: "json"
        };
        $.ajax({
            url: MBTA_URL + "predictionsbystop",
            data: request_params,
            success: function(data, tStatus, xhr) {
                console.log(data + " " + ":: DATA");
                callback(data["mode"][0]["route"][0]["direction"][0]["trip"][0]["pre_away"] / 60);
            },
            error: function(xhr, tStatus, error) {
                console.log(data.message);
                callback("ERROR");
            },
            complete: function(xhr, tStatus) {
                console.log(tStatus);
            }

        });

    };



    ext._getStatus = function() {
        if (window.SpeechSynthesisUtterance === undefined) {
            return {
                status: 1,
                msg: 'Your browser does not support text to speech. Try using Google Chrome or Safari.'
            };
        }
        return {
            status: 2,
            msg: 'Ready'
        };
    };

    var descriptor = {
        blocks: [
            //['', 'set voice to %m.voices', 'set_voice', ''],
            ['R', 'Get next inbound train at Back Bay', 'next_inbound'],
            ['R', 'Get next outbound train at Central Sq.', 'next_outbound'],
            ['R', 'Get next inbound train prediction at Central Sq.', 'next_inbound_prediction'],
            ['R', 'Get next outbound train prediction at Central Sq.', 'next_outbound_prediction']

        ],
        menus: {}
    };

    ScratchExtensions.register('Text to Speech', descriptor, ext);

})();
