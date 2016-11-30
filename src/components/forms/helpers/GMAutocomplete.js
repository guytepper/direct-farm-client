import mapsapi from 'google-maps-api';
const myGoogleMaps = mapsapi('AIzaSyD93NWdLgraXWFj_82Wvzz5m58827p_vr0', ['places']);

// Inits the Google Maps Autocomplete plugin.
// Takes the vm instance as parameter.
export default function googleMapsInit(vm) {
  myGoogleMaps().then(maps => {
    const input = document.getElementById('location');
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', function() {
      const location = autocomplete.getPlace();
      vm.location = location;
    });
  });
}