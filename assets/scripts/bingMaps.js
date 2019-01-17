/* NEEDS TO BE PLACED ON THE PAGE FOR RECIPE RESULTS OR INGREDIENTS
 <script type='text/javascript' src='https://www.bing.com/api/maps/mapcontrol'></script>
*/
$("#mapsButton").on("click", function () {
     getLocation();
})


let apiKey;

db().ref(`mapapi`).once("value")
.then(function(snapshot) {
     apiKey = snapshot.val();
});


let drawMap = (lon, lat, obj) => {
     let mod = `<div class="modal mapModal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Local Grocery Stores</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body" id="myMap">      </div> <div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>`;
     $("body").append(mod);
     $("#exampleModal").modal('show');
     let map = new Microsoft.Maps.Map('#myMap', {
          credentials: apiKey,
          center: new Microsoft.Maps.Location(lon, lat),
          mapTypeId: Microsoft.Maps.MapTypeId.road,
          zoom: 11
     });
     let infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
          visible: false
     });

     //Assign the infobox to a map instance.
     infobox.setMap(map);
     obj.forEach(element => {
          let locObj = {
               altitude: 0,
               altitudeReference: -1,
               latitude: element.geocodePoints[0].coordinates[0],
               longitude: element.geocodePoints[0].coordinates[1]
          }
          let pin = new Microsoft.Maps.Pushpin(locObj, null);
          pin.metadata = {
               title: element.name,
               description: `${element.Address.formattedAddress} </br>${element.PhoneNumber}`,
               id: "store",
               infoBox: infobox
          };
          map.entities.push(pin);
          Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);
     });
     
     
     $("#exampleModal").on('hidden.bs.modal', function () {
         $(this).remove();
     });



}

function pushpinClicked(e) {
     //Make sure the infobox has metadata to display.
     if (e.target.metadata) {
          //Set the infobox options with the metadata of the pushpin.
          e.target.metadata.infoBox.setOptions({
               location: e.target.getLocation(),
               title: e.target.metadata.title,
               description: e.target.metadata.description,
               visible: true
          });
     }
}

function getLocation() {
     let pos, map, qUrl, thisApi = apiKey;
     if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
               pos = [position.coords.latitude, position.coords.longitude];
               qUrl = `https://dev.virtualearth.net/REST/v1/LocalSearch/?query=Grocery+Store&userCircularMapView=${pos[0]},+${pos[1]},5000&key=${apiKey}`;
               $.ajax({
                    url: qUrl,
                    method: "GET"
               }).then(function (response) {
                    drawMap(pos[0], pos[1], response.resourceSets[0].resources);
               }).catch(function (error) {
                    $("#myMap").text(error);
               });
          });
     } else {
          $("#myMap").text("Geolocation is not supported by this browser.");
     }
}
