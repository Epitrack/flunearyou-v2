// ==========================================
// Vaccine Finder
// ==========================================

var APP = APP || {};
APP.VaccineFinder = {
  setUp: function() {},

  fny: function() {
    $('#vaccine-finder-btn').click(function () {
      // Add Google Analytics Event Tracking:
      window.open("http://flushot.healthmap.org/?address=" + $('#vaccine-finder-input').val());
      return false;
    });
  }
}

