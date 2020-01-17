describe('Employee management application', function() {

    //Employee attributes
    var firstName = 'Test';
    var lastName = 'Employee';
    var startDate = '2019-01-01';
    var email = 'test@gmail.com';

    //Updated employee attributes
    var updFirstName = 'Test Updated';
    var updLastName = 'Employee Updated';
    var updStartDate = '2019-02-02';
    var updEmail = 'testupdated@gmail.com'; 

    //Set references to page objects
    var Login = require ('../page/Login.js');
    var Main = require ('../page/Main.js');


    //Access the web app
    browser.get('https://cafetownsend-angular-rails.herokuapp.com/login');

  //TESTS BEGIN FROM HERE

  //Invalid username
  it('should display generic error message in the case of invalid username', function() {

    Login.enterUsername ('InvalidUsername');
    Login.enterPassword ('Skywalker');
    Login.clickLogin ();
    Login.verifyInvalid ();

  });

  //Invalid password
  it('should display generic error message in the case of invalid password', function() {

    Login.enterUsername ('Luke');
    Login.enterPassword ('InvalidPassword');
    Login.clickLogin ();
    Login.verifyInvalid ();

  });

  //Invalid username and password
  it('should display generic error message in the case of invalid username and password', function() {

    Login.enterUsername ('InvalidUsername');
    Login.enterPassword ('InvalidPassword');
    Login.clickLogin ();
    Login.verifyInvalid ();

  });

  //Valid username and password
  it('should login successfully in the case of valid username and password', function() {

    Login.enterUsername ('Luke');
    Login.enterPassword ('Skywalker');
    Login.clickLogin ();
    Login.verifyValid ();

  });

  //Successfully create an employee and validate that it persists
  it('should create an new employee successfully', function () {


    Main.clickCreate ();
    Main.enterFirstName (firstName); 
    Main.enterLastName (lastName);
    Main.enterStartDate (startDate);
    Main.enterEmail (email);
    Main.clickAdd ();
    Main.verifyCreatedEmployee (firstName, lastName, startDate, email);
}); 

  //Successfully create an employee and validate that it persists
  it('should edit an employee successfully', function() {

    Main.enterFirstName (updFirstName); 
    Main.enterLastName (updLastName);
    Main.enterStartDate (updStartDate);
    Main.enterEmail (updEmail);
    Main.clickUpdate ();
    Main.verifyUpdateEmployee (updFirstName, updLastName, updStartDate, updEmail);

});

  //Successfully delete an employee and validate that it no longer appears in the list of employees
  it('should delete an employee successfully', function() {

    Main.clickBack();
    var empCount = Main.deleteEmployee (updFirstName, updLastName);
    Main.verifyDelete (empCount);

});

  //Successfully logout
   it('should logout successfully', function() {

    Main.clickLogout ();
    Main.verifyLogout ();

  });
});
