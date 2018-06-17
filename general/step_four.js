function step_four()
{
    data = null;
    var data_one = one["locations"][0];
    var data_two = null;
    if (two !== null)
        data_two = two["locations"][0];
    $.ajax({
        url: "/step_four.php",
        type: "POST",
        dataType: "json",
        data: {
            one: data_one,
            two: data_two
        },
        success: function (response) {
            data = response;
            $("#step_four").removeClass("hide");
            scrollTo("four");
            printTravelMode();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("ERROR: ");
            console.log(JSON.stringify(textStatus, null, 4));
            console.log(JSON.stringify(errorThrown, null, 4));
            console.log(JSON.stringify(jqXHR, null, 4));
        }
    });
}

$(document).on("click", "#submit_four", function() {
    var checked = false;
    var transportMethod = "walking";

    if (two == null && $("#step_four .container #estimateFromPosition:checked").length > 0)
        checked = true;

    transportMethod = $("#step_four .container input[type=radio][name=transportMethod]:checked" ).val();

    $("#step_four .container iframe").remove();

    if (!checked && two !== null)
    {
        printMapDirections(transportMethod);
    }
    else if (!checked && two == null)
    {
        printMapNoDirections();
    }
    else if (checked && two == null)
    {
        printMapDirectionsLocationData(transportMethod);
    }
});

function printMapDirections(transportMethod) {
    $("#step_four .container").append('<iframe\
                        class="map"\
                        frameborder="0"\
                        src="https://www.google.com/maps/embed/v1/directions?key=' + data["api_key"] + '&origin=' + data["start"]["streetAddress"] + '+' + data["start"]["streetNumber"] + '+' + data["start"]["city"] + '&destination=' + data["end"]["streetAddress"] + '+' + data["end"]["streetNumber"] + '+' + data["end"]["city"] + '&mode=' + transportMethod + '" allowfullscreen>\
                    </iframe>');
}

function printMapNoDirections() {
    $("#step_four .container").append('<iframe\
                        class="map"\
                        frameborder="0"\
                        src="https://www.google.com/maps/embed/v1/place?key=' + data["api_key"] + '&q=' + data["start"]["streetAddress"] + '+' + data["start"]["streetNumber"] + '+' + data["start"]["city"] + '" allowfullscreen>\
                    </iframe>');
}

function printMapDirectionsLocationData(transportMethod) {
    var longitude;
    var latitude;

    getPos(function() {
        $("#step_four .container").append('<iframe\
                        class="map"\
                        frameborder="0"\
                        src="https://www.google.com/maps/embed/v1/directions?key=' + data["api_key"] + '&origin=' + latitude + ',' + longitude + '&destination=' + data["start"]["streetAddress"] + '+' + data["start"]["streetNumber"] + '+' + data["start"]["city"] + '&mode=' + transportMethod + '" allowfullscreen>\
                    </iframe>');
    });

    function getPos(callback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (pos) {
                latitude = pos.coords.latitude;
                longitude = pos.coords.longitude;
                callback();
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
            callback();
        }
    }
}

function printTravelMode() {
    $("#step_four .container").append('\
            <h5>Jag vill ta mig till min destination med: </h5>\
            <div class="form-check form-check-inline">\
                <input class="form-check-input" type="radio" name="transportMethod" id="radioWalking" value="walking" checked>\
                <label class="form-check-label" for="radioWalking">Gång</label>\
            </div>\
            <div class="form-check form-check-inline">\
                <input class="form-check-input" type="radio" name="transportMethod" id="radioTransit" value="transit">\
                <label class="form-check-label" for="radioTransit">Kollektivt</label>\
            </div>\
            <div class="form-check form-check-inline">\
                <input class="form-check-input" type="radio" name="transportMethod" id="radioBicycle" value="bicycling">\
                <label class="form-check-label" for="radioBicycle">Cykling</label>\
            </div>\
            <div class="form-check form-check-inline">\
                <input class="form-check-input" type="radio" name="transportMethod" id="radioDriving" value="driving">\
                <label class="form-check-label" for="radioDriving">Bil</label>\
            </div>\
        ')

    if (two == null)
    {
        $("#step_four .container").append('\
                <div class="form-check">\
                    <input class="form-check-input" type="checkbox" value="" id="estimateFromPosition" checked>\
                    <label class="form-check-label" for="estimateFromPosition">\
                    Ja, estimera tiden från min nuvarande position\
                    </label>\
                </div>\
                ')
    }

    $("#step_four .container").append('<br><button type="submit" class="btn btn-primary" id="submit_four">Submit</button>');
}