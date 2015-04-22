
// Clicks
$('[data-track]').on('click', function() {
  var category = $(this).attr('data-track');
  var action = $(this).attr('data-action');
  var label = $(this).attr('data-label');

  ga('send', 'event', category, action, label);
});


// Map / Change state
$('#where').on('change', function() {
  var category = $(this).attr('data-track');
  var action = $(this).attr('data-action');
  var label = $('#where option:selected').text();

  ga('send', 'event', category, action, label);
});

// Databox / Click to show more options
$('#symptoms-item-count').on('click', function() {
  var category = $(this).attr('data-track');
  var action = $(this).attr('data-action');
  var label = $(this).attr('data-label');

  ga('send', 'event', category, action, label);
});

// Map / Postal code
$('#postal-code-submit').on('click', function() {
  var category = $(this).attr('data-track');
  var action = $(this).attr('data-action');
  var label = $('#zip').val();

  ga('send', 'event', category, action, label);
});

// Registration / Sign in
$('#registration-form').on('submit', function() {
  var category = $(this).attr('data-track');
  var action = $(this).attr('data-action');
  var label = $(this).attr('data-label');

  ga('send', 'event', category, action, label);
});

// Survey Form
$('#survey-form').on('submit', function() {
  var category = $(this).attr('data-track');
  var action = $(this).attr('data-action');

  ga('send', 'event', category, action);
});
