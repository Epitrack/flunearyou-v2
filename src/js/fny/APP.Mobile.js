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

function checkMobileAds() {
  var record = sessionStorage.getItem("hideMobileAds");
	if((record == null || record == "false") && site_name === 'flunearyou.org') {
		showMobileAds();
	} else {
		hideMobileAds();
	}
}

function hideMobileAds() {
	$('.content-mobile').hide();
	sessionStorage.setItem("hideMobileAds", "true");
}

function showMobileAds() {
	$('.content-mobile').show();
	sessionStorage.setItem("hideMobileAds", "false");
}

$('.continue').on('click', function() {
  $('body').removeClass();
  hideMobileAds();
});


checkMobileAds();
