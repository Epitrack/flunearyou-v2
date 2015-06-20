// ==========================================
// FAQ page
// ==========================================

var APP = APP || {};
APP.Faq = {
  setUp: function() {
    this.beforeRequest();
    this.filterFaq();
  },

  beforeRequest: function(){
    var that, faqStorage;

    that = this;
    faqStorage = localStorage.getItem('faq-storage');

    if (faqStorage) {
      that.templateOff(faqStorage); // check if exist data
    } else {
      that.request(); // request data
    }
  },

  request: function() {
    var url, that, faqFeeds, dataSize, htmlElement, body;

    that        = this;
    url         = 'http://dev.flunearyou.org/faq.json';
    htmlElement = document.querySelector('#questions');
    body        = document.querySelector('body');

    $.ajax({
      url: url,
      type: 'GET',

      beforeSend: function() {
        body.classList.add('js-loading');
      },

      success: function(data) {
        body.classList.remove('js-loading');

        faqFeeds = data.data;

        if (data.status === 200) {
          that.template(faqFeeds); // build template
          that.insertIntoStorage(faqFeeds); // insert into localstorage
        } else {
          htmlElement.innerHTML = faqFeeds; // status !== 200
        }
      },

      error: function(error) {
        console.warn('Request error:', error);
        htmlElement.innerHTML = error; // ajar error
      }
    });
  },

  templateOff: function(faqStorage) {
    var that;

    that = this;

    that.template(JSON.parse(faqStorage)); // transform to JSON again
  },

  template: function(faqFeeds) {
    var source, template, output, faqList, ask, answer, id;

    source   = document.getElementById('faq-template').innerHTML;
    template = Handlebars.compile(source);
    faqList  = [];

    for (var i = 0; i < faqFeeds.length; i++) {
      id     = faqFeeds[i].id_faq;
      ask    = faqFeeds[i].ask;
      answer = faqFeeds[i].answer;

      faqList.push({
        id: id,
        ask: ask,
        answer: answer
      });

      output = template({faq: faqList});
      document.getElementById('questions').innerHTML = output;
    }
  },

  insertIntoStorage: function(faqFeeds) {
    localStorage.setItem('faq-storage', JSON.stringify(faqFeeds));
  },

  filterFaq: function() {
    var count, resultsItem;

    $('#search-term').on('keyup', function() {
      var search = $(this).val(),
      count = 0;

      $('#questions li').each(function() {
        if ( $(this).text().search(new RegExp(search, 'i')) < 0 ) {
          $(this).fadeOut(); // display none
        } else {
          $(this).show();
          count++;
        }
      });

      resultsItem = count;
      $('#count-results').text(resultsItem);
    });
  }
}
