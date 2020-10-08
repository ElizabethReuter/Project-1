$(document).ready(function () {
    var barArr = [];
    var map

    $("#btn").on("click", function () {
        $('#bar-div').empty()
        $('#map').remove()
        $('.mapPlace').append('<div id="map" style="width: 372px; height: 372px;"></div>')
        var userInput = $("#userInput").val().trim();
        getBarInfo(userInput);
    });

    function getBarInfo(z) {
        barArr = [];
        var city = z;
        var queryURL = "https://api.openbrewerydb.org/breweries?by_city=" + city;
        $.ajax({url: queryURL, method: "GET"}).then(function (response) {
            console.log(response);
            for (var i = 0; i < response.length; i++) {
                if (response[i].longitude != null && response[i].latitude != null) {
                    var barName = response[i].name;
                    var barURL = response[i].website_url;
                    var barLong = response[i].longitude;
                    var barLat = response[i].latitude;
                    barArr.push({barName, barLong, barLat, barURL});
                }

            }
            displayMap();
            displayBars();
        })
    }

    function displayBars() {
        for (var i = 0; i < barArr.length; i++) {
            var grabBarName = barArr[i].barName;
            // newDiv = $("<h4>").text(grabBarName);
            // $("#bar-div").append(newDiv);
            newLink = $("<a>").text(grabBarName);
            var LinkFixer =barArr[i].barURL.substring(11);
            console.log(LinkFixer);
            newLink.attr("href", "https://"+LinkFixer);
            newLink.attr("alt", grabBarName);

            var newBreak = $("<br>");
            newLink.attr("target", "_blank");
            
            $("#bar-div").append(newLink);
            $("#bar-div").append(newBreak);
        }
    }

    function displayMap() {
        L.mapquest.key = 'lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24';
        if(typeof barArr[0] === 'undefined'){
            errorMsg = $("<h4>").text("City Input is Invalid: Please Enter a Valid City Name (US Only)");
            errorMsg.attr("style", "font-weight: bold; color: red;");
            $("#bar-div").append(errorMsg);
        }
        else{

        map = L.mapquest.map('map', {
            center: [
                barArr[0].barLat,
                barArr[0].barLong
            ],
            layers: L.mapquest.tileLayer('map'),
            zoom: 8
        });

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
        }
    };
          $("#btn").on("click", function () {
           var LastSearch = $("#userInput").val().toUpperCase().trim();
           localStorage.setItem("LastSearch", LastSearch);
          });

          function displayLastSearch(){
              var displaySearch = localStorage.getItem("LastSearch");
              $("#userInput").val(displaySearch);
          }
          displayLastSearch();



});