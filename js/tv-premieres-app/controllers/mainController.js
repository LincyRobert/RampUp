app.controller("mainController", function($scope, $http){
    $scope.results = [];
    $scope.availableGenres = [];
    $scope.genreFilter = null;
    $scope.pgmDataresults = null;
    $scope.init = function() {
		$http.get('js/tv-premieres-app/json/showList.json').success (function(data){
			$scope.showListJson = data;
			$scope.results.push(data);
		});
		//Reading program data from a Local JSON file.
		//This has to be replaced with an API which returns pgm data.
		$http.get('js/tv-premieres-app/json/pgmData.json').success (function(data){
			$scope.pgmDataresults = data;
			angular.forEach($scope.pgmDataresults, function(pgm, index){
				angular.forEach(pgm.genres, function(genre, index){
					var exists = false;
	                angular.forEach($scope.availableGenres, function(avGenre, index){
	                    if (avGenre == genre) {
	                        exists = true;
	                    }
	                });
	                if (exists === false) {
	                    $scope.availableGenres.push(genre);
	                }
		                            
	        	});
	        });
        });    
    };
});
app.filter('isGenre', function() {
    return function(input, genre) {
        if (typeof genre == 'undefined' || genre == null) {
            return input;
        } else {
            var out = [];
            angular.forEach(input, function(pgm, index){
            	angular.forEach(pgm.genres, function(eachGenre, index){
                    if(eachGenre == genre) {
                        out.push(pgm);
                    }
            	});
        	});
            return out;
        }
    };
});