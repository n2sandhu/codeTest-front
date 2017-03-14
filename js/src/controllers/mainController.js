'use strict';

app.controller('mainController', ['$scope', 'DataService', 'Employee', function($scope, DataService, Employee) {

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
                  //arrangeData2($scope.managerData);
                  console.log('managerArray', $scope.managerData);


                  $scope.employeesData.forEach(function(empy, ind) {
                      if( empy.managerId) {
                          delete $scope.employeesData[ind];
                      }
                      else {
                          empy.position = 2;
                          empy.employees.forEach(function(e) {
                              if(e.isManager == true) {
                                  var manager = e;
                                  while(manager != null) {

                                  }
                              }
                          });

                      }
                  });
                  console.log('employeesArray', $scope.employeesData);
              }
          });
      });
  });

  var arrangeData = function(employees, managerArray, employee, cb) {
      employees.forEach(function(emp, index) {
          if(emp.managerId == employee.id) {
              employee.isManager = true;
              managerArray.push(emp);
          }
          if (index == employees.length - 1) {
              employee.employees = managerArray;
              if(managerArray.length == 0) {
                  employee.isManager = false;
              }
              cb(true);
          }
      });
  };
    /*
  var arrangeData2 = function (managerArray) {
      managerArray.forEach(function(managerData, index) {
         console.log('ind', index);
         managerData.forEach(function(employee) {
            if( employee.id) {

            }
         });
      });
  };
*/

    // Employee.find({
    //     filter: {
    //         include: ['manager']
    //     }
    // })
    //     .$promise
    //     .then(function(employees) {
    //         $scope.employeesData = employees;
    //         $scope.managerHierarcy = [];
    //         employees.forEach(function(employee, index) {
    //             if(!employee.managerId) {
    //                 $scope.managerHierarcy[employee.id] = [];
    //                 employees.forEach(function(emp, index) {
    //                     if(emp.managerId == employee.id) {
    //                         $scope.managerHierarcy[employee.id].push(emp);
    //                     }
    //                 });
    //             }
    //             else {
    //
    //             }
    //         });
    //     });

}]);
