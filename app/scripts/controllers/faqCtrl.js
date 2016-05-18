/*
*
*/

'use strict';

app.controller('faqCtrl', ['$scope', '$http', function($scope,$http){
	$http.get('http://dev.flunearyou.org/faq.json').success(function(data, status){
		var faq      = data.data,
			questions = [];

		for(var i = 0; i < faq.length; i++){
			questions.push(faq[i])
		}

		$scope.questions = questions;
	});
}]); 