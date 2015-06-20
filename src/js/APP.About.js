// ==========================================
// About
// ==========================================

var APP = APP || {};
APP.About = {
  setUp: function() {
    this.showContent();
  },

  showContent: function() {
    var that;

    that = this;

    $('.nav-tabs li:first-child').addClass('active'); // show first tab
    $('.tab-content:last-child').hide(); // hide last tab

    that.getClick();
  },

  getClick: function() {
    var href;

    $('.nav-tabs').on('click', 'a', function(event) {
      event.preventDefault();

      href = $(this).attr('href');

      $('.tab-content').hide(); // hide all

      $('.nav-tabs li').removeClass(); // remove all classes
      $(this).parent().addClass('active'); // active li

      $(href).show(); // show tab
    });
  }
}
