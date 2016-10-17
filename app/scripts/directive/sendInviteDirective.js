/*
*
*/

'use strict';

app.directive('sendInvite', function(){
	return {
		restrict : 'A',
		link: function(scope, elem){

			var serializeObj = function(obj) {
			    var result = [];

			    for (var property in obj)
			        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

			    return result.join("&");
			};

			

			elem.on('submit', function(){
				var formData = {
					emails: scope.emails,
					name: scope.email,
					subject: 'Help track the flu. Save lives.',
					message: 	scope.msg
				};

				// var serialized = serializeObj(formData);
				console.log(formData); 

				return false;
				// var formSerialise = $(this).serializeObject();
				// console.log(formSerialise);
				// e.preeventDefault();
				// var formData = $('#raf-form').serializeObject()
				// console.log('Enviado!');
				
			});
		}
	}
}); 




// $scope.sendInvite = function(){
// 	$http.post($urlBase+'/user/raf', {headers: {'token': token}}).success(function(data){
// 		console.log(data);
// 	}); 
// }


// emails:sfilhu@gmail.com
// name:sergio@sergio.com
// subject:Help track the flu. Save lives.
// message: