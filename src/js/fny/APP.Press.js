$('.wrapper-social-networks-help').on('click', 'a', function(event) {
  event.preventDefault();
  var href, social, url;

  href = this.href;
  network = $(this).attr('class');

  checkUrl(href, network);
});


function checkUrl(href, network) {
  if (network == 'twitter') {
    url = 'https://twitter.com/home?status=' + href;
    window.open(url);
  } else if (network == 'facebook') {
    url = 'https://www.facebook.com/sharer/sharer.php?u=' + href;
    window.open(url);
  } else if (network == 'google') {
    url = 'https://plus.google.com/share?url=' + href;
    window.open(url);
  }
}
