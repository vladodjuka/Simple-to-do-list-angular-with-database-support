app.controller("MainController", ["$scope", "$http", function($scope, $http){
	
	$scope.tasks=[];
	$scope.inputTaskName="";
	onLoad();



	function onLoad(){
		$http({
			method: 'POST',
			url: 'http://autoelektronikame.ipage.com/todo/php/onLoad.php',
		}).then(function (response) {
			angular.forEach(response.data, function(task , key) {
				$scope.addTask(task.name, task.completed, task.description);
			})
		}, function (response) {
			console.log(response.data);
		});
	}

	window.onbeforeunload = function (e) {

		var data = JSON.stringify($scope.tasks);

		navigator.sendBeacon("http://autoelektronikame.ipage.com/todo/php/clearDb.php");
		navigator.sendBeacon("http://autoelektronikame.ipage.com/todo/php/onBeforeUnload.php", data);

		//e.returnValue="Cekaj";
	}

	function loadFile(data){ 
		$http({
			method: 'POST',
			url: 'http://autoelektronikame.ipage.com/todo/php/cleadDb.php',
			data: data,
		}).then(function (response) {
			console.log(response.data+"  pos");
		}, function (response) {
			console.log(response.data+" neg");
		});
	}

	function showMessage (sMsg) {
		console.log(sMsg + this.responseText);
	}

	$scope.addTask = function(name, completed, description){
		//alert(JSON.stringify($scope.tasks));
		if(name.trim()==""){
			return;
		}
		newTaskObject = {
			name: name,
			completed: (completed==1?true:false),
			show: true,
			description: ""
		}

		$scope.tasks.push(newTaskObject);

		$scope.inputTaskName = "";
	}

	$scope.toggleCompleted = function(index){
		$scope.tasks[index].completed = !$scope.tasks[index].completed; 
	}



	$scope.setTasksContainerVisibility = function(){
		if($scope.tasks.length>0){
			return true;
		}
		else{
			return false;
		}
	}

	$scope.showNotCompletedTasks = function(){
		angular.forEach($scope.tasks, function(task , key) {
			if($scope.tasks[key].completed){
				$scope.tasks[key].show = false;
			}
			else{
				$scope.tasks[key].show = true;          }
			})
	}

	$scope.showCompletedTasks = function(){
		angular.forEach($scope.tasks, function(task , key) {
			if($scope.tasks[key].completed){
				$scope.tasks[key].show = true;
			}
			else{
				$scope.tasks[key].show = false;
			}
		})
	}

	$scope.showAllTasks = function(){
		angular.forEach($scope.tasks, function(task , key) {
			$scope.tasks[key].show = true;
		})
	}

	$scope.deleteTask = function(index){
		$scope.tasks.splice(index,1);
	}

	$scope.deleteCompleted = function(){
		$scope.notCompletedTasks=[];
		angular.forEach($scope.tasks, function(task , key) {
			if(!task.completed){
				$scope.notCompletedTasks.push(task);
			}
		})
		$scope.tasks = $scope.notCompletedTasks;
	}

	$scope.deleteAll = function(){
		$scope.tasks = [];
	}

}]);