/*
*	Close modal directive
*/

'use strict';

app.directive('closeModal', function(){
	return {
		restrict : 'A',
		link: function(scope, elem){
			elem.on('click', function(){
				setTimeout(function(){
					if (localStorage.getItem('userLogged')) {
						$('.modal').modal('hide');
					}else{
						console.log('Nops');
					}
				}, 2000)
			});
		}
	}
}); 