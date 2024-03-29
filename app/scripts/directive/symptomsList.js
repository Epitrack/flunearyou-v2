'use strict';

app.directive('symptomsList', ['$sce', function($sce) {
	return {
		restrict : 'A',
		link: function(scope, elem){
			// var symptoms = "";

			// if (scope.report.fever == 1) symptoms += '<span translate="fever"></span>, ';
			// if (scope.report.cough == 1) symptoms += '<span translate="cough" data-tes="te"></span>, ';
			// if (scope.report.headache == 1) symptoms += '<span translate="headache"></span>, ';
			// if (scope.report.sorethroat == 1) symptoms += '<span translate="sore_throat"></span>, ';
			// if (scope.report.diarrhea == 1) symptoms += '<span translate="diarrhea"></span>, ';
			// if (scope.report.bodyache == 1) symptoms += '<span translate="bodyache"></span>, ';
			// if (scope.report.fatigue == 1) symptoms += '<span translate="fatigue"></span>, ';
			// if (scope.report.chills == 1) symptoms += '<span translate="chills"></span>, ';
			// if (scope.report.nausea == 1) symptoms += '<span translate="nausea"></span>, ';
			// if (scope.report.breath == 1) symptoms += '<span translate="breath"></span>, ';

			var symptoms = [];

			if (scope.report.fever == 1) symptoms.push('fever');
			if (scope.report.cough == 1) symptoms.push('cough');
			if (scope.report.headache == 1) symptoms.push('headache');
			if (scope.report.sorethroat == 1) symptoms.push('sorethroat');
			if (scope.report.diarrhea == 1) symptoms.push('diarrhea');
			if (scope.report.bodyache == 1) symptoms.push('bodyache');
			if (scope.report.fatigue == 1) symptoms.push('fatigue');
			if (scope.report.chills == 1) symptoms.push('chills');
			if (scope.report.nausea == 1) symptoms.push('nausea');
			if (scope.report.breath == 1) symptoms.push('breath');
			if (scope.report.rash == 1) symptoms.push('rash');
			if (scope.report.eye_pain == 1) symptoms.push('eye_pain');
			if (scope.report.yellow_eyes == 1) symptoms.push('yellow_eyes');
			if (scope.report.joint_pain == 1) symptoms.push('joint_pain');
			if (scope.report.red_eyes == 1) symptoms.push('red_eyes');
			if (scope.report.dark_urine == 1) symptoms.push('dark_urine');


			scope.report.symptoms = symptoms;
			// elem.text(symptoms).html();
			// elem.attr('translate', 'fever');
		}
	};
}]);