'use strict';

app.controller('mainController', ['$scope', 'Employee', function($scope, Employee) {

  $scope.managerData = [];

  Employee.find({
    filter: {
      include: ['manager']
    }
  })
  .$promise
  .then(function(employees) {
      $scope.employeesData = employees;
      employees.forEach(function(employee, index) {
          var employeeId = employee.id;
          $scope.managerData[employee.id] = [];
          arrangeData(employees, $scope.managerData[employee.id], employee, function (completed) {
              if(completed == true && index == employees.length - 1) {
                  // console.log('managerArray', $scope.managerData);
                  // console.log($scope.employeesData);
                  var result = [];
                  $scope.employeesData.forEach(function(emp) {
                    if(!emp.managerId) {
                        result.push({manager: emp.name});
                        var level1Employees = emp.employees;
                        level1Employees.forEach(function(level1Employee) {
                            result.push({'empLevel1': level1Employee.name});
                            level1Employee.employees.forEach(function(level2Employee) {
                                result.push({'empLevel2': level2Employee.name});
                            });
                        });
                    }
                  });
                  $scope.results = result;
              }
          });
      });
  });

  var arrangeData = function(employees, managerArray, employee, cb) {
      employees.forEach(function(emp, index) {
          if(emp.managerId == employee.id) {
              managerArray.push(emp);
              // console.log('managerArray on employee:', employee.id, ' ', managerArray);
          }
          if (index == employees.length - 1) {
              employee.employees = managerArray;
              cb(true);
          }
      });
  };

}]);
