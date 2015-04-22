$('#input-search').on('keyup', function() {
    var search = $(this).val(),
                count = 0;

    $('.ac-container div').each(function() {
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
