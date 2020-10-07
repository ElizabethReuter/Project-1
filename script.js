$(document).ready(function () {
    var barArr = [];
    var map

    $("#btn").on("click", function () {
      console.log("button WORKS");
        $('#bar-div').empty()
        $('#map').remove()
        $('.mapPlace').append('<div id="map" style="width: 600px; height: 600px;"></div>')
        var userInput = $("#userInput").val().trim();
        getBarInfo(userInput);
    });

    function getBarInfo(z) {
        console.log('about to smack api with this city', z)
        barArr = [];
        var city = z;
        var queryURL = "https://api.openbrewerydb.org/breweries?by_city=" + city;
        $.ajax({url: queryURL, method: "GET"}).then(function (response) {
            console.log(response);
            for (var i = 0; i < response.length; i++) {
                if (response[i].longitude != null && response[i].latitude != null) {
                    var barName = response[i].name;
                    var barLong = response[i].longitude;
                    var barLat = response[i].latitude;
                    barArr.push({barName, barLong, barLat});
                }

            }
            console.log('barArray inside .then onf ajax', barArr);
            displayMap();
            displayBars();
        })
    }

    function displayBars() {
        console.log('theres are barrArr in the display bars function', barArr)
        for (var i = 0; i < barArr.length; i++) {
            var grabBarName = barArr[i].barName;
            newDiv = $("<h4>").text(grabBarName);
            $("#bar-div").append(newDiv);
        }
    }

    function displayMap() {
        console.log('inside display map!!', L)
        L.mapquest.key = 'lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24';

        console.log('barrArr[0] we use this for map', barArr[0])

        map = L.mapquest.map('map', {
            center: [
                barArr[0].barLat,
                barArr[0].barLong
            ],
            layers: L.mapquest.tileLayer('map'),
            zoom: 8
        });

        console.log('this is the map variable', map)
        console.log('barr arr in display map function', barArr)
        for (var i = 0; i < barArr.length; i++) {
            if (barArr[i].barLat != null && barArr[i].barLong != null) {
                L.marker([
                    barArr[i].barLat,
                    barArr[i].barLong
                ], {
                    icon: L.mapquest.icons.marker(),
                    draggable: false
                }).bindPopup(barArr[i].barName).addTo(map);
            }
        }
    };
});