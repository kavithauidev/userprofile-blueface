var app = angular.module('profileApp', []);

app.service('profileService', function($timeout, $q){

  var profileUser = {
        first_name : 'Michael',
        last_name  : 'Collins',
        username   : 'michael.collins',
        age        : 30,
        email      : ''
      };

   this.getProfileUser = function() {
    return $timeout(() => {
      return profileUser;
    }, 3000);
  };

  this.setUsername = function(username) {
    return $q((resolve, reject) => {
      $timeout(() => {
        if (Math.round(Math.random())) {
          profileUser.username = username;
          resolve(profileUser);
        } else {
          reject({ error: 'Invalid username' });
        }
      }, 3000);
    });
  };

  this.setUserEmail = function(username){
     return $q((resolve, reject) => {
      $timeout(() => {
        if (Math.round(Math.random())) {
          profileUser.email = username + "@blueface.com";
          resolve(profileUser);
        }
        else{
          reject({ error: 'Error on email registration' });
        }
      }, 3000)
    });

  }

});

app.controller('profileCtrl', function($scope, profileService) {

  $scope.profileUser;
  $scope.errorMessage;

  $scope.isLoading = true;
  $scope.isSaving = false;
  $scope.isError = false;

  $scope.isDisabled = false;


  // runs on page init
  $scope.oninit = function(){
    profileService.getProfileUser().then(
      function(response){
        $scope.isLoading = false;
        $scope.profileUser = response;
      },
      function(error){
        $scope.isLoading = false;
        $scope.isError = true;
        $scope.errorMessage = error;
      }
    );
  }

  $scope.updateUsername = function(){
    $scope.isSaving = true;
    $scope.isDisabled = true;
    $scope.clearError();
    
    profileService.setUsername($scope.profileUser.username).then(
      function(success){
        $scope.isSaving = false;
        $scope.isError = false;
        $scope.isDisabled = false;
        $scope.updateUserEmail();
        
        console.log("username updated!");
      },
      function(error){
        $scope.isSaving = false;
        $scope.isError = true;
        $scope.isDisabled = false;
        $scope.errorMessage = error;
      }
    );
  }

  $scope.updateUserEmail = function(){
    profileService.setUserEmail($scope.profileUser.username).then(
      function(success){
        $scope.oninit();
        console.log("user email updated!");
      },
      function(error){
        $scope.isError = true;
        $scope.errorMessage = "Error in email registration!"
      }
    )
  }

  $scope.clearError = function(){
    $scope.isError = false;
    $scope.errorMessage = "";

  }

  $scope.oninit();

});