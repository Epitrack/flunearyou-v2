// ==========================================
// Lib that active konami code.
// ==========================================

var APP  = APP || {};
APP.EasterEggs = {
  setUp: function() {
    this.checkPlatform();
  },

  checkPlatform: function() {
    var mobile, regex, that;

    that = this;
    regex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    mobile = regex.test(navigator.userAgent);

    if (!mobile) {
      that.activeWithText();
    } else {
      // console.log('mobile');
    }
  },

  activeWithText :function() {
    cheet('h u m a n s', function() {
      window.open(document.URL + 'humans.txt', 'Project Team');
    });
  }
};
