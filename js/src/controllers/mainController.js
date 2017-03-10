'use strict';

app.controller('mainController', ['$scope', 'DataService', 'employee', function($scope, DataService, employee) {

  // $scope.data = DataService.getData();
  // employee.find({
  //   filter: {
  //     include: ['manager']
  //   }
  // })
  // .$promise
  // .then(function(employees) {
  // $scope.employeesData = employees;
  // });

    $scope.employeesData = [
        {
            id: 100,
            name: 'Alan',
            managerId: 150
        },
        {
            id: 220,
            name: 'Martin',
            managerId: 100
        },
        {
            id: 150,
            name: 'Jamie'
        },
        {
            id: 275,
            name: 'Alex',
            managerId: 100
        },
        {
            id: 400,
            name: 'Steve',
            managerId: 150
        },
        {
            id: 190,
            name: 'David',
            managerId: 400
        }
    ];

}]);
