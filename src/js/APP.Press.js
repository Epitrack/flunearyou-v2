// ==========================================
// Press page
// ==========================================

var APP = APP || {};
APP.Press = {
  setUp: function() {
    this.beforeRequest();
    this.trigger();
  },

  beforeRequest: function(){
    var that, pressStorage;

    that = this;
    pressStorage = localStorage.getItem('press-storage');

    if (pressStorage) {
      that.templateOff(pressStorage); // check if exist data
    } else {
      that.request(); // request data
    }
  },

  request: function() {
    var url, that, pressFeeds, dataSize, htmlElement, body;

    that        = this;
    url         = 'assets/press.json';
    htmlElement = document.querySelector('#press-list');
    body        = document.querySelector('body');

    $.ajax({
      url: url,
      type: 'GET',

      beforeSend: function() {
        body.classList.add('js-loading');
      },

      success: function(data) {
        body.classList.remove('js-loading');

        pressFeeds = data.data;

        if (data.status === 200) {
          that.template(pressFeeds); // build template
          that.insertIntoStorage(pressFeeds); // insert into localstorage
        } else {
          htmlElement.innerHTML = pressFeeds; // status !== 200
        }
      },

      error: function(error) {
        console.warn('Request error:', error);
        htmlElement.innerHTML = error; // ajar error
      }
    });
  },

  templateOff: function(pressStorage) {
    var that;

    that = this;

    that.template(JSON.parse(pressStorage)); // transform to JSON again
  },

  template: function(pressFeeds) {
    var source, template, output, pressList, title, link, time, date, site;

    source     = document.getElementById('press-template').innerHTML;
    template   = Handlebars.compile(source);
    pressList  = [];

    for (var i = 0; i < pressFeeds.length; i++) {
      title = pressFeeds[i].title;
      link = pressFeeds[i].link;
      time = pressFeeds[i].time;
      date = pressFeeds[i].date;
      site = pressFeeds[i].site;

      pressList.push({
        title: title,
        link: link,
        time: time,
        date: date,
        site: site
      });

      output = template({press: pressList});
      document.getElementById('press-list').innerHTML = output;
    }
  },

  insertIntoStorage: function(pressFeeds) {
    localStorage.setItem('press-storage', JSON.stringify(pressFeeds));
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
