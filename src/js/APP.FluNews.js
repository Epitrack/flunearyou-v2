// ==========================================
// Flu News page
// ==========================================

var APP = APP || {};
APP.FluNews = {
  setUp: function() {
    // this.beforeRequest();
  },

  beforeRequest: function(){
    var that, fluNewsStorage;

    that = this;
    fluNewsStorage = localStorage.getItem('flu-news-storage');

    if (fluNewsStorage) {
      that.templateOff(fluNewsStorage); // check if exist data
    } else {
      that.request(); // request data
    }
  },

  request: function() {
    var url, that, fluNewsFeeds, htmlElement, body;

    that        = this;
    url         = '/assets/flu-news.json';
    htmlElement = document.querySelector('#flu-news-feeds');
    body        = document.querySelector('body');

    $.ajax({
      url: url,
      type: 'GET',

      beforeSend: function() {
        body.classList.add('js-loading');
      },

      success: function(data) {
        body.classList.remove('js-loading');

        fluNewsFeeds = data.data;

        if (data.status === 200) {
          that.template(fluNewsFeeds); // build template
          that.insertIntoStorage(fluNewsFeeds); // insert into localstorage
        } else {
          htmlElement.innerHTML = fluNewsFeeds; // status !== 200
        }
      },

      error: function(error) {
        console.warn('Request error:', error);
        htmlElement.innerHTML = error; // ajar error
      }
    });
  },

  templateOff: function(fluNewsStorage) {
    var that;

    that = this;

    that.template(JSON.parse(fluNewsStorage)); // transform to JSON again
  },

  template: function(fluNewsFeeds) {
    var source, template, output, fluNewsList, title, url, day, month, image, content;

    source     = document.getElementById('flu-news-template').innerHTML;
    template   = Handlebars.compile(source);
    fluNewsList  = [];

    for (var i = 0; i < fluNewsFeeds.length; i++) {
      title   = fluNewsFeeds[i].title;
      url     = fluNewsFeeds[i].link;
      day     = fluNewsFeeds[i].day;
      month   = fluNewsFeeds[i].month;
      image   = fluNewsFeeds[i].image;
      content = fluNewsFeeds[i].description;

      fluNewsList.push({
        title: title,
        url: url,
        day: day,
        month: month,
        image: image,
        content: content
      });

      output = template({news: fluNewsList});
      document.getElementById('flu-news-feeds').innerHTML = output;
    }
  },

  insertIntoStorage: function(fluNewsFeeds) {
    localStorage.setItem('flu-news-storage', JSON.stringify(fluNewsFeeds));
  }
}
