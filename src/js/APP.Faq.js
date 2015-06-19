// ==========================================
// FAQ page
// ==========================================

var APP = APP || {};
APP.Help = {
  setUp: function() {
    this.filterFaq();
  },

  filterFaq: function() {
    $('#search-term').on('keyup', function() {
      var search = $(this).val(),
      count = 0;

      $('#questions li').each(function() {
        if ( $(this).text().search(new RegExp(search, 'i')) < 0 ) {
          $(this).fadeOut();
        } else {
          $(this).show();
          count++;
        }
      });

      var resultsItem = count;
      $('#count-results').text(i18nJS_search + resultsItem);
    });
  }
}
