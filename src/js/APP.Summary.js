// ==========================================
// Databox / Home
// ==========================================

var APP = APP || {};
APP.Summary = {
  setUp: function() {},

  fny: function() {
    var illness = "ili";
    var summary = summary || null;
    function updateSummary(params) {
    //console.log("updateSummary", params);
    if (site_name == SALUD_BORICUA) {
    if (params.contained_by) {
    getSummaryByPlaceId(params.contained_by, function (data) {
    summary = data;
    updateDatabox(summary);
    });
    }
    } else {
    if (params.contained_by && hasContainedBy(params.contained_by)) {
    $("#where").val(params.contained_by);
    $('#where').selectpicker('render');
    if (params.contained_by == 192) {
    $("#map-icon").attr("src", "img/img-mapa-data.png");
    } else if (params.contained_by == 106) {
    $("#map-icon").attr("src", "img/map-us.png");
    } else if (params.contained_by == 12) {
    $("#map-icon").attr("src", "img/map-can.png");
    } else {
    $("#map-icon").attr("src", "img/map/states/" + $('#where').find(":selected").text().replace(" ", "-").replace(",", "") + ".png");
    }
    summary = getSummaryByPlace(params.contained_by);
    getLinks(params.contained_by);
    var lat = $("#where").find(':selected').data("lat");
    var lon = $("#where").find(':selected').data("lon");
    $('#map_bg').data("lat", lat);
    $('#map_bg').data("lon", lon);
    } else if (params.zip) {
    getSummaryByZip(params.zip, function (data) {
    if (data.contained_by) {
    $("#where").val(data.contained_by);
    updateSummary({contained_by: data.contained_by});
    }
    });
    } else if(params.name){
    getSummaryByName(params.name, function (data) {
    if (data.contained_by && data.contained_by != 106) {
    $("#where").val(data.contained_by);
    updateSummary({contained_by: data.contained_by});
    } else if(data.place_id) {
    $("#where").val(data.place_id);
    updateSummary({contained_by: data.place_id});
    }
    });
    }
    }
    if (summary) {
    updateDatabox(summary);
    }
    }
    function updateDatabox(summary) {
    var illness_count = summary.data[illness];
    var illness_count_lw = summary.last_week_data[illness];
    var illness_percentage = summary.data[illness + "_percentage"];
    $("#illness_count_span").removeClass("arrow-down").removeClass("arrow-up");

    if (illness_count > illness_count_lw) {
    $("#illness_count_span").addClass("arrow-up");
    $("#summary_tip").text(more_than_last_week.replace("%disease%", " "+illness_name.toLowerCase()));
    } else {
    $("#illness_count_span").addClass("arrow-down");
    $("#summary_tip").text(less_than_last_week.replace("%disease%", " "+illness_name.toLowerCase()));
    }
    if (site_name == SALUD_BORICUA) {
    //$("#where").text("en " + summary.name);
    $("#where").text("en Puerto Rico");
    }

    var any_count = summary.data.symptoms;
    var any_pct = summary.data.symptoms_percentage;
    var no_count = summary.data.no_symptoms;
    var no_pct = summary.data.none_percentage;
    var colors = ["#FFFFFF", "#54B410", "#6DEA11", "#76EA0B", "#A6EB17", "#D1ED1F", "#E9D225", "#E69C27", "#DE6926", "#D83526", "#B82121"];
    var imgs = ["", "icon-dbox-minimal1.png", "icon-dbox-minimal2.png", "icon-dbox-minimal3.png", "icon-dbox-low1.png", "icon-dbox-low2.png", "icon-dbox-moderate1.png", "icon-dbox-moderate2.png", "icon-dbox-high1.png", "icon-dbox-high2.png", "icon-dbox-high3.png"];
    if (site_name == SALUD_BORICUA) $('.illness_label').text(illness_name);
    $('#summary_participants').text(summary.data.total_surveys);
    $('#illness_count').text(illness_count);
    $('#illness_reports').text(illness_count);
    $('#illness_percentage, .illness_percentage').text(Math.round(illness_percentage) + "%");
    $('#any_count').text(any_count);
    $('#any_pct').text(Math.round(any_pct) + "%");
    $('#no_count').text(no_count);
    $('#no_pct').text(Math.round(no_pct) + "%");
    var cdc = JSON.parse(app.cdc_level);
    if (cdc[summary.name] && site_name != SALUD_BORICUA) {
    //console.log("cdc summary", cdc[summary.name]);
    var level = Math.floor(parseInt(cdc[summary.name].level2));
    $("#map_bg").css("background", colors[level]);
    $("#mini_pin").attr('src', 'img/' + imgs[level]);
    } else {
    //console.log("summary.data.level", summary.data.level);
    $("#map_bg").css("background", colors[summary.data.level]);
    $("#mini_pin").attr('src', 'img/' + imgs[summary.data.level]);
    }
    $('#illness_name').text(illness);
    }
    function getSummaryByName(name, cb) {
    $.ajax({
    url: "map_summary",
    method: "get",
    data: {name: name},
    success: function (data) {
    cb(data);
    }
    }).retry({times: 3});
    }
    function getSummaryByZip(zip, cb) {
    $.ajax({
    url: "map_summary",
    method: "get",
    data: {zip: zip},
    success: function (data) {
    cb(data);
    }
    }).retry({times: 3});
    }
    function getSummaryByPlaceId(place_id, cb) {
    $.ajax({
    url: "map_summary",
    method: "get",
    data: {place_id: place_id},
    success: function (data) {
    cb(data);
    }
    }).retry({times: 3});
    }
    function hasContainedBy(contained_by) {
    var r = false;
    $('#where option').each(function () {
    var v = parseInt($(this).val()) == parseInt(contained_by);
    if (v) {
    if (!r) r = true;
    }
    });
    return r;
    }
    $("#illness-list").change(function () {
    illness = $(this).find(':selected').val();
    illness_name = $(this).find(':selected').text();
    if(app.map) {
    app.map.clearMarkers(app.map.map);
    app.map.userMarkers = [];
    app.map.createUserMakers(app.map.rawMarkers);
    app.map.setUserMarkers(app.map.map);
    }
    if (summary) {
    updateDatabox(summary);
    } else {
    //    //console.log("go fetch summary");
    }
    });
    function centerMap(val,lat, lon) {
    if(map.map != null && app.map.userMarkers.length) {
    if (val == 106 || lat == 39.966930 && (site_name != SALUD_BORICUA)) {
    map.map.setCenter(app.latitude, -101);
    map.map.setZoom(4);
    //console.log("centerMap 1", val, lat, lon);
    } else {
    map.map.setCenter(lat, lon);
    if(site_name == SALUD_BORICUA) {
    map.map.setZoom(9);
    } else {
    map.map.setZoom(6);
    }
    //console.log("centerMap 2", val, lat, lon);
    //            setTimeout(function(){app.openClosestInfoWindow(lat, lon, 500);}, 1000);
    }
    } else {
    if(!lat) lat = app.latitude;
    if(!lon) lon = app.longitude;
    //console.log("centerMap 3", val, lat, lon);
    app.pendingCenter = [val,lat, lon];
    }
    }
    $("#where").change(function () {
    var lat = $(this).find(':selected').data("lat");
    var lon = $(this).find(':selected').data("lon");
    var val = $(this).find(':selected').val();
    if (map) {
    centerMap(val,lat, lon);
    } else {
    map_home=0;
    open_map_responsive(null);
    abreMapa(false);
    centerMap(val,lat, lon);
    }
    $('#zip').val('');
    updateSummary({contained_by: $(this).find(':selected').val()});
    // print params to image
    $('#map_bg').data("lat", lat);
    $('#map_bg').data("lon", lon);
    });
    // zoom map with click image
    $('#map_bg').on('click', function () {
    var lat = $(this).data("lat");
    var lon = $(this).data("lon");
    map_home=0;
    open_map_responsive(null);
    if(app.map == null) {
    abreMapa(false);
    centerMap(0,lat, lon);
    } else {
    //console.log("map_bg else", lat, lon);
    centerMap(0,lat, lon);
    }
    });

    /*function moveToState(lat, lon){
    if (lat && lon) {
    if (lat == 39.966930) {
    map.map.setCenter(app.latitude, -101);
    map.map.setZoom(4);
    } else {
    app.map.map.setCenter(lat, lon);
    app.map.map.setZoom(6);
    //            setTimeout(function(){app.openClosestInfoWindow(lat, lon, 500);}, 1000);
    }
    } else {
    app.centerOnZip();
    }
    }*/
    // ===
    function getSummaryByPlace(place_id) {
    var states = JSON.parse(app.states);
    for (var i = 0; i < states.length; i++) {
    if (states[i].place_id == place_id) {
    return states[i];
    }
    }
    return null;
    }
    function getAddressComponent(type, geocodeResponse, shortName) {
    for (var i = 0; i < geocodeResponse.address_components.length; i++) {
    for (var j = 0; j < geocodeResponse.address_components[i].types.length; j++) {
    if (geocodeResponse.address_components[i].types[j] == type) {
    if (shortName) {
    return geocodeResponse.address_components[i].short_name;
    }
    else {
    return geocodeResponse.address_components[i].long_name;
    }
    }
    }
    }
    return '';
    }
    function getLinks(place_id) {
    $.ajax({
    url: "site/links?place_id=" + place_id,
    headers: {
    "auth-token": 1
    },
    type: 'get',
    error: function () {
    //console.log("error")
    },
    success: function (data) {
    //            //console.log("links", data);
    $('#local_links').empty();
    for (var i = 0; i < data.links.length; i++) {
    $('#local_links').append('<li><a href=' + data.links[i].website + ' target="_blank">' + data.links[i].title + '</a></li>');
    }
    }
    });
    }

  }
}
