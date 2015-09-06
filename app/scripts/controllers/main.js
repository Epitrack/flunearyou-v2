'use strict';

/**
 * @ngdoc function
 * @name flunearyouV2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flunearyouV2App
 */
angular.module('flunearyouV2App')
  .controller('MainCtrl', ['$scope', function ($scope) {
    var map, socket, markers, marker;

    $scope.geolocation = function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition($scope.mapLeaflet, $scope.errorGeolocation);
      } else {
        console.log('Not supported.')
      }
    };

    $scope.mapLeaflet = function(position) {
      var lat = position.coords.latitude,
          lng = position.coords.longitude;

      var LeafIcon = L.Icon.extend({
          options: {
            // shadowUrl: 'leaf-shadow.png',
            iconSize:     [14, 14],
            shadowSize:   [50, 64],
            iconAnchor:   [22, 94],
            shadowAnchor: [4, 62],
            popupAnchor:  [-3, -76]
          }
      });

      var greenIcon = new LeafIcon({iconUrl: '../images/icon-symptoms-4.png'}),
          redIcon = new LeafIcon({iconUrl: '../images/icon-symptoms-1.png'}),
          orangeIcon = new LeafIcon({iconUrl: '../images/icon-symptoms-3.png'});

      var msgPopup = '<b>4:20</b>'

      map = L.map('map-content').setView([lat, lng], 13);

      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
      }).addTo(map);

      L.icon = function (options) {
          return new L.Icon(options);
      };

      L.marker([lat, lng], {icon: greenIcon}).addTo(map).bindPopup(msgPopup).openPopup();

      document.getElementById('map-content').classList.add('js-active');
    };

    $scope.geolocation();

    $scope.errorGeolocation = function(msg) {
      console.log('Error, geolocation: ', msg);
    };

    // Use to add marker dynamically
    $scope.updateMarker = function(text, lat, lng) {
      markers = new L.LayerGroup().addTo(map);
      marker = L.marker([lat, lng]).addTo(markers).bindPopup(text).openPopup();
    };

  }]);
