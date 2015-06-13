// ==========================================
// Press page
// ==========================================

var APP = APP || {};
APP.Press = {
  setUp: function() {
    this.trigger();
  },

  trigger: function() {
    var that, href, social, url;

    that = this;

    $('.press-share').on('click', 'a', function(event) {
      event.preventDefault();

      href = this.href;
      network = $(this).attr('class');

      that.checkUrl(href, network);
    });
  },

  checkUrl: function(href, network) {
    if (network == 'twitter') {
      url = 'https://twitter.com/home?status=' + href;
      window.open(url);
    } else if (network == 'facebook') {
      url = 'https://www.facebook.com/sharer/sharer.php?u=' + href;
      window.open(url);
    } else if (network == 'gplus') {
      url = 'https://plus.google.com/share?url=' + href;
      window.open(url);
    }
  }
}
