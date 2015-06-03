// ==========================================
// Mobile/Home
// ==========================================

var APP = APP || {};
APP.Mobile = {
  setUp: function() {
    this.changePlatform();
    this.checkMobileAds();
    this.clickContinue();
  },

  changePlatform: function() {
    if ( ( navigator.userAgent.match(/iPhone/i) ) || ( navigator.userAgent.match(/iPod/i) ) ) {
      document.body.classList.add('to-iphone');
    } else if ( navigator.userAgent.match(/Android/i) ) {
      document.body.classList.add('to-android');
    }

    if(navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/Android/i)) {
      document.querySelector(".content-mobile").style.display="block";
    }
  },

  checkMobileAds: function() {
    var record, that;

    that = this;
    record = sessionStorage.getItem("hideMobileAds");

    // if((record == null || record == "false") && site_name === 'flunearyou.org') {
    if(record == null || record == "false") {
      that.showMobileAds();
    } else {
      that.hideMobileAds();
    }
  },

  hideMobileAds: function() {
    $('.content-mobile').hide();
    sessionStorage.setItem("hideMobileAds", "true");
  },

  showMobileAds: function() {
    $('.content-mobile').show();
    sessionStorage.setItem("hideMobileAds", "false");
  },

  clickContinue: function() {
    var that;

    that = this;

    $('.continue').on('click', function() {
      $('body').removeClass();
      that.hideMobileAds();
    });
  }
}
