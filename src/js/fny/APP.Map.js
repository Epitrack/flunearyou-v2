var app = app || {};
function Map() {
    this.init = function (latitude, longitude, zoom, center) {
//        console.log("map.init", center);
        $(".view-map").addClass("hide-data");
        $(".view-map").html("HIDE MAP");
        map_home = 1;
        var self = this;
        this.overlay = "user";
        this.userMarkers = [];
        this.setView = function (overlay, in_center) {
            self.overlay = overlay;
            if (overlay == 'user') {
                self.clearDataLayer();
                self.clearMarkers(self.map);
                if (self.userMarkers.length > 0) {
                    self.setUserMarkers(self.map);
//                    console.log("setView", in_center);
                    if (in_center) {
//                        console.log("incenter");
                        app.centerOnZip();
                    } else {
                        if (!app.pendingCenter) {
                            console.log("zoomForUserMarkers");
                            setTimeout(function () {
                                $.unblockUI();
                                self.geolocate(self.map);
                            }, 1000);
                            self.zoomForUserMarkers();
                        } else {
                            console.log("pendingCenter");
                            centerMap(app.pendingCenter[0], app.pendingCenter[1], app.pendingCenter[2]);
                            app.pendingCenter = null;
                        }
                    }
                } else {
//                    console.log("empty");
                    setTimeout(self.setView, 1000, overlay, in_center);
                }
//                $(".wrapper-statics").show();
                $("#legend-cdc").hide();
                $("#legend-user").show();
                $('#cdc-statics').hide();
                $('#user-statics').show();
            } else {
                blockUI(i18nJS_loading_cdc_data);
                if (self.stateBounds != null) {
                    self.clearDataLayer();
                    self.clearMarkers(self.map);
                    self.map.map.data.setStyle(self.styleCDCOverlays);
                    self.map.map.data.addGeoJson(JSON.parse(self.stateBounds), {idPropertyName: "id"});
                    self.zoomForCDCOverlay(self.map.map);
                    self.map.map.data.addListener('click', function (e) {
                        var name = e.feature.getProperty("name");
                        if (app.cdc_level) {
                            var cdc = JSON.parse(app.cdc_level);
                            if (cdc[name]) {
                                $("#where").selectOptionWithText(name);
                                updateSummary({contained_by: $("#where").val()});
                            } else {
                                $("#map_bg").css("background", "#fff6cc");
                            }
                        }
                    });
                    setTimeout(function () {
                        $.unblockUI()
                    }, 200);
                } else {
                    self.clearDataLayer();
                    self.getStateBounds(function () {
                        self.setView('cdc')
                    });
                    self.clearMarkers(self.map);
                }
                $(".wrapper-statics").show();
                $("#legend-cdc").show();
                $("#legend-user").hide();
            }
        };
        this.clearDataLayer = function () {
            self.map.map.data.setMap(null);
            self.map.map.data = new google.maps.Data({map: self.map.map});
            self.map.map.data.setMap(self.map.map);
        };
        this.setInfobox = function (marker) {
//            console.log("illness", marker, illness, illness_name);
            var content = '<div class="infobox"><h3 class="infobox-title"> Reports in: ' + marker.city + '</h3>';
            if (site_name == SALUD_BORICUA) {
                if (illness == "dengue") content += '<div class="infobox-description"> <p class="value"> ' + marker.dengue + ' </p> <p class="text"> Dengue </p> </div>';
                if (illness == "lepto") content += '<div class="infobox-description"> <p class="value"> ' + marker.lepto + ' </p> <p class="text"> Lepto </p> </div>';
                if (illness == "chick") content += '<div class="infobox-description"> <p class="value"> ' + marker.chick + ' </p> <p class="text"> Chikungunya </p> </div>';
                if (illness == "ili") content += '<div class="infobox-description"> <p class="value"> ' + marker.flu + ' </p> <p class="text"> Gripe </p> </div>';
            } else {
                content += '<div class="infobox-description"> <p class="value"> ' + marker.flu + ' </p> <p class="text"> Flu symptoms </p> </div>';
            }
            content += '<div class="infobox-description"> <p class="value"> ' + marker.symptoms + ' </p> <p class="text"> Any symptoms </p> </div>';
            content += '<div class="infobox-description"> <p class="value"> ' + marker.none + ' </p> <p class="text"> No<br/> symptoms </p> </div>';
            content += '</div>';
            return content;
        };
        this.geolocate = function (map) {
            GMaps.geolocate({
                success: function (position) {
                    GMaps.geocode({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        callback: function (results, status) {
                            if (status == 'OK') {
                                var country = getAddressComponent('country', results[0], true);
                                if ((site_name == SALUD_BORICUA && country == "PR") || (site_name == "flunearyou.org" && country == "US")) {
                                    map.setCenter(position.coords.latitude, position.coords.longitude);
                                    var zip = getAddressComponent('postal_code', results[0], true);
                                    var latlng = results[0].geometry.location;
                                    self.map.setCenter(latlng.lat(), latlng.lng());
                                    self.map.setZoom(7);
                                    app.updateUserMarker(position.coords.latitude, position.coords.longitude);
                                    updateSummary({zip: zip});
                                } else {
                                    console.log("geolocate else");
//                                    app.updateUserMarker(app.latitude, app.longitude);
                                    if (site_name == SALUD_BORICUA) {
                                        self.map.setCenter(app.latitude, app.longitude);
                                        self.map.setZoom(9);
                                        updateSummary({contained_by: 192});
                                    } else {
                                        self.map.setCenter(app.latitude, -101);
                                        self.map.setZoom(4);
                                        updateSummary({contained_by: 106});
                                    }
                                }
                            }
                        }
                    });
                },
                error: function (error) {
                },
                not_supported: function () {
                },
                always: function () {

                }
            });
        };
        this.setCustomMarker = function (lat, lng, map) {
            var image = 'img/map/marker.png';
            var customMarker = {
                lat: lat,
                lng: lng,
                icon: image,
                title: "Me",
                zIndex: 1000,
                animation: google.maps.Animation.DROP
            };
            return customMarker;
        };
        this.createUserMakers = function (markers) {
            var pins = new Array();
            if (site_name == SALUD_BORICUA) {
                pins[1] = 'img/icon-symptoms-4.png';
            } else {
                pins[1] = 'img/icon-symptoms-2.png';
            }
            pins[3] = 'img/icon-symptoms-3.png';
            pins[5] = 'img/icon-symptoms-1.png';
            for (var i = 0; i < markers.length; i++) {
                var marker = markers[i];
//                console.log("createUserMarkers", marker.icon, marker.flu, marker.lepto, marker.dengue);
                var html = this.setInfobox(marker);
                if (marker.latitude && marker.longitude) {
                    var markerIcon = marker.icon;
                    if (markerIcon == 5) {
                        if (illness == "ili") {
                            if (marker.flu > 0) markerIcon = 5;
                            else markerIcon = 3;
                        } else if (illness == "dengue") {
                            if (marker.dengue > 0) markerIcon = 5;
                            else markerIcon = 3;
                        } else if (illness == "chick") {
                            if (marker.chick > 0) markerIcon = 5;
                            else markerIcon = 3;
                        } else if (illness == "lepto") {
                            if (marker.lepto > 0) markerIcon = 5;
                            else markerIcon = 3;
                        }
                    }
                    var m = {
                        lat: marker.latitude,
                        lng: marker.longitude,
                        title: marker.city,
                        zip: marker.zip,
                        place_id: marker.place_id,
                        location: {
                            lat: marker.latitude,
                            lng: marker.longitude,
                            place_id: marker.place_id,
                            contained_by: marker.contained_by
                        },
                        icon: pins[markerIcon],
                        infoWindow: {
                            content: html,
                            maxWidth: 410,
                            zIndex: null,
                            boxStyle: {
                                width: '410px',
                                background: 'orange',
                                closeBoxMargin: "12px 4px 2px 2px"
                            }
                        },
                        click: function (e) {
                            if (e.location) {
                                ga('send', 'event', 'Map', 'Clicked Marker', e.title);
                                if (site_name != SALUD_BORICUA) {
                                    updateSummary(e.location);
                                }
                                self.map.setCenter(e.location.lat, e.location.lng);
                            }
                        }
                    };
//                    console.log("m", marker.place_id);
                    if (marker.icon == 5) {
                        m.zIndex = 999;
                    } else if (marker.icon == 3) {
                        m.zIndex = 700;
                    }
                    this.userMarkers.push(m);
                }
            }
        };
        this.setUserMarkers = function (map) {
            for (var i = 0; i < self.userMarkers.length; i++) {
                var marker = self.userMarkers[i];
                map.addMarker(marker);
            }
        };
        this.clearMarkers = function (map) {
            map.removeMarkers();
        };
        this.mapStyle = [
            {
                featureType: "road",
                stylers: [
                    {visibility: "off"}
                ]
            },
            {
                featureType: "transit",
                stylers: [
                    {visibility: "off"}
                ]
            },
            {
                featureType: "poi",
                stylers: [
                    {visibility: "off"}
                ]
            },
            {
                featureType: "landscape",
                elementType: "geometry",
                stylers: [
                    {color: "#ffffff"}
                ]
            },
            {
                featureType: "water",
                elementType: "geometry.fill",
                stylers: [
                    {color: "#CDE7F6"}
                ]
            },
            {
                featureType: "administrative.province",
                elementType: "geometry.stroke",
                stylers: [
                    {color: "#326E95"},
                    {weight: 1.1}
                ]
            },
            {
                featureType: "administrative.province",
                elementType: "labels.text.fill",
                stylers: [
                    {color: "#326E95"}
                ]
            },
            {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [
                    {color: "#006196"}
                ]
            },
            {
                featureType: "administrative.neighborhood",
                elementType: "labels.text.fill",
                stylers: [
                    {color: "#7DBCDB"}
                ]
            },
            {
                featureType: "administrative",
                elementType: "labels.icon",
                stylers: [
                    {color: "#ffffff"}
                ]
            },
            {
                featureType: "administrative.country",
                elementType: "labels.text.fill",
                stylers: [
                    {color: "#013750"}
                ]
            }
        ];
        this.map = new GMaps({
            div: '#banner-map',
            lat: latitude,
            lng: longitude,
            zoom: parseInt(zoom),
            panControl: false,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            overviewMapControl: false,
            disableDefaultUI: true,
            navigationControl: true,
            scrollwheel: false,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE,
                position: google.maps.ControlPosition.LEFT_CENTER
            },
            streetViewControl: false,
            mapTypeId: 'Styled',
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        this.map.addStyle({
            styledMapName: "Styled",
            styles: this.mapStyle,
            mapTypeId: "Styled"
        });
        this.map.setStyle("Styled");
        this.getMarkers = function (scope, in_center) {
//            console.log("getMarkers");
            blockUI(i18nJS_loading_reports);
            var self = scope;
            $.ajax({
                url: "map/markers",
                headers: {
                    "auth-token": 1
                },
                type: 'get',
                error: function () {
//                    console.log("error");
//                    setTimeout(self.getMarkers, 100, scope, in_center);
                },
                success: function (data) {
//                    blockUI(i18nJS_loading_reports);
//                    console.log("data", data);
                    scope.rawMarkers = data;
                    scope.createUserMakers(scope.rawMarkers);
//                    console.log("setting view", in_center);
                    scope.setView('user', in_center);
                }
            });
        };
        this.getStateBounds = function (cb) {
            $.ajax({
                url: "assets/states.geo.json",
                success: function (data) {
                    self.stateBounds = data;
                    self.getCDCData(self, cb);
                }
            });
        };
        this.processPoints = function (geometry, callback, thisArg) {
            if (geometry instanceof google.maps.LatLng) {
                callback.call(thisArg, geometry);
            } else if (geometry instanceof google.maps.Data.Point) {
                callback.call(thisArg, geometry.get());
            } else {
                geometry.getArray().forEach(function (g) {
                    self.processPoints(g, callback, thisArg);
                });
            }
        };
        this.styleCDCOverlays = function (feature) {
            var dataCDC = self.dataCDC;
            var name = feature.getProperty('name');
            var color;
            if (dataCDC[name]) {
                color = dataCDC[name].fill.color;
            } else {
                color = "#FFFFFF";
            }
            return {
                fillColor: color,
                fillOpacity: 0.85,
                strokeWeight: 1
            };
        };
        this.zoomForUserMarkers = function () {
            if (site_name != SALUD_BORICUA) {
                self.map.setCenter(app.latitude, -101);
                self.map.setZoom(4);
            } else {
                console.log("zoom for user markers");
                self.map.setCenter(app.latitude, app.longitude);
                self.map.setZoom(6);
            }
        };
        this.zoomForCDCOverlay = function (map) {
            self.clearMarkers(self.map);
            map.setZoom(4);
            self.map.setCenter(app.latitude, -101);
            if (app.p0) {
                self.map.addMarker(app.p0);
            }
        };
        this.getMarkers(this, center);
    };
    this.getCDCData = function (scope, cb) {
        $.ajax({
            url: "map/cdc",
            error: function () {
                self.getCDCData(scope, cb);
            },
            success: function (data) {
                scope.dataCDC = data;
                cb();
            }
        });
    }
}
var map;
app.openMap = function (geo) {
    if (!map) {
        $('#cdc-statics').hide();
        map = app.map = new Map();
        var latitude = app.latitude;
        var longitude = app.longitude;
        var zoom = 4;
        app.map.init(latitude, -101, zoom, geo);
    } else {
        if (geo) {
            app.centerOnZip();
        } else app.map.geolocate(map.map);
    }
};

app.centerOnZip = function () {
    if ($('#zip').val() || app.user.zip) {
        var zip = $('#zip').val() != null ? $('#zip').val() : app.user.zip;
        if(zip != null) {
            if (site_name == SALUD_BORICUA) {
                zip += ", PR";
            } else {
                zip += ", US";
            }
        }
        GMaps.geocode({
            address: zip,
            callback: function (results, status) {
                $.unblockUI();
                if (status == 'OK') {
                    var country = getAddressComponent('country', results[0], true);
                    var zip = getAddressComponent('postal_code', results[0], true);
                    console.log("centerOnZip", country, zip);
                    if (site_name == SALUD_BORICUA) {
                        if (country == "PR") {
                            var latlng = results[0].geometry.location;
                            map.map.setCenter(latlng.lat(), latlng.lng());
                            app.updateUserMarker(latlng.lat(), latlng.lng(), false);
                            map.map.setZoom(9);
                            updateSummary({zip: zip});
                        } else {
                            console.log("centerOnZip : else", app.latitude, app.longitude);
                            centerMap(192, app.latitude, app.longitude);
                            map.map.setZoom(9);
                            updateSummary({contained_by: 192});
                        }
                    } else {
                        console.log("centerOnZip : else 475");
                        var latlng = results[0].geometry.location;
                        map.map.setCenter(latlng.lat(), latlng.lng());
                        map.map.setZoom(10);
                        updateSummary({zip: zip, name: results[0].address_components[0].long_name});
                        setTimeout(function () {
                            app.openInfoBoxByZip(zip);
                        }, 1000);
                        app.updateUserMarker(latlng.lat(), latlng.lng(), false);
                    }
                }
            }
        });
    } else {
        map.geolocate(map.map);
    }
};
app.openInfoBoxByZip = function (zip) {
//    console.log("openInfobox", zip);
    if (zip) {
        var markers = map.map.markers;
        var m2 = $.grep(markers, function (e) {
            return e.zip == zip || e.title.indexOf(zip) >= 0;
        });
        if (app.infoWindow) {
            app.infoWindow.close();
        }
        if (m2.length > 0) {
            app.infoWindow = m2[0].infoWindow;
            app.infoWindow.open(map.map.map, m2[0]);
        }
    }
};
app.openInfoBoxByName = function (name) {
    var markers = map.map.markers;
    var m = $.grep(markers, function (e) {
        return e.title.toLowerCase().indexOf(name.toLowerCase()) > -1;
    });
    if (m.length > 0) {
        m[0].infoWindow.open(map.map.map, m[0]);
    }
};
app.openInfoBoxByPlaceId = function (place_id) {
    var markers = map.map.markers;
    var m = $.grep(markers, function (e) {
        return e.place_id == place_id;
    });
    if (m.length > 0) {
        m[0].infoWindow.open(map.map.map, m[0]);
    }
};
app.findClosestMarker = function (lat1, lon1, t) {
    if (!t) t = 150;
//    console.log("findClosestMarker", t);
    var markers = map.map.markers;
    var pi = Math.PI;
    var R = 6371; //equatorial radius
    var distances = [];
    var closest = -1;
    var i;
    var mlength = markers.length;
    if (mlength > 3) {
        for (i = 0; i < mlength; i++) {
            var marker = markers[i];
            if (marker != null && marker.infoWindow != null) {
                var lat2 = markers[i].position.lat();
                var lon2 = markers[i].position.lng();
                //pega a diferenca
                var latDiffInRadians = lat2 - lat1;
                var lngDiffInRadians = lon2 - lon1;
                var latDiff = latDiffInRadians * (pi / 180);
                var lngDiff = lngDiffInRadians * (pi / 180);
                //definir radius
                var latRadius = lat1 * (pi / 180);
                var lngRadius = lat2 * (pi / 180);
                //triangulação
                var a = Math.sin(latDiff / 2) * Math.sin(latDiff / 2)
                    + Math.sin(lngDiff / 2) * Math.sin(lngDiff / 2) * Math.cos(latRadius) * Math.cos(lngRadius);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                //teorema de pitagoras
                var d = R * c;
                distances[i] = d;
                if ((closest == -1 || d < distances[closest])) {
                    closest = i;
                }
            }
        }
        if (closest > 0) {
            var dCLosest = distances[closest];
//            console.log("closest", dCLosest);
            if (dCLosest < t) {
                return markers[closest];
            } else return null;
        } else {
            return null;
        }
    } else {
        return null;
    }
};
app.updateUserMarker = function (lat, lng, d) {
//    console.log("updateUserMarker");
    if (!app.p0) {
        app.p0 = app.map.map.addMarker(app.map.setCustomMarker(app.latitude, app.longitude, app.map.map));
    }
    if (app.p0) {
        var latlng = new google.maps.LatLng(lat, lng);
        app.p0.setPosition(latlng);
        if (d) {
            setTimeout(function () {
                app.openClosestInfoWindow(lat, lng);
            }, 2000);
        }
    }
};
app.openClosestInfoWindow = function (lat, lng, t) {
    var m = app.findClosestMarker(lat, lng, t);
    if (m) {
        if (app.infoWindow) app.infoWindow.close();
        app.infoWindow = m.infoWindow;
        app.infoWindow.open(map.map.map, m);
    } else {
        if (app.infoWindow) app.infoWindow.close();
        app.infoWindow = null;
    }
};