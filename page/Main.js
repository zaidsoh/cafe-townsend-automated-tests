var Main = function () {

	var grettingMsg = element(by.id('greetings'));
	var createButton = element (by.id('bAdd'));
	var addButton = element (by.buttonText('Add'));
	var firstName = element (by.model ('selectedEmployee.firstName'));
	var lastName = element (by.model ('selectedEmployee.lastName'));
	var startDate = element (by.model ('selectedEmployee.startDate'));
	var email = element (by.model ('selectedEmployee.email'));
	var employeeList = element.all (by.repeater('employee in employees'));
	var edit = element (by.id('bEdit'));
	var update = element (by.buttonText('Update'));
	var back = element (by.className('subButton bBack'));
	var del = element (by.id('bDelete'));
	var logout = element (by.className('main-button'));


	this.greetingMessage = function () {

		return grettingMsg;
	};

    //Create button
	this.clickCreate = function () {

		createButton.click();
	};

    //First Name
	this.enterFirstName = function (value) {

		firstName.clear ();   
		firstName.sendKeys (value);

	};

    //Last Name
	this.enterLastName = function (value) {

		lastName.clear ();   
		lastName.sendKeys (value);

	};

    //Start Date
	this.enterStartDate = function (value) {

		startDate.clear ();   
		startDate.sendKeys (value);

	};

    //Email
    this.enterEmail = function (value) {

    	email.clear ();   
		email.sendKeys (value);

	};

    //Add button
	this.clickAdd = function () {

		addButton.click();
	};

    //Edit button
	this.clickEdit  = function () {
		edit.click ();
	};

    //Update button
	this.clickUpdate  = function () {
		update.click ();
	};

    //Back button
	this.clickBack  = function () {

		back.click ();
	};

	//Logout button
	this.clickLogout  = function () {

		logout.click ();
	};

	this.verifyCreatedEmployee = function (firstN, lastN, startD, em) {

	var fullName = firstN +' '+ lastN;
    var EmployeeName;
    var flag = true;
    
    employeeList.count().then 
    (

        function(totalEmployeeCount) 
    {
        for (var i=0 ;(flag == true) && (i<totalEmployeeCount); i++) 
        {
            EmployeeName = employeeList.get(i); 
            EmployeeName.getText().then
            (
                function (name) 
                {
                if (name == fullName)
                {
                    EmployeeName.click ();
                    edit.click ();
                    flag = false;
                }
                }
            );
        }
    }
    );

    var extractedString1 = firstName.getAttribute('value');
    extractedString1.then (

        function(value)
        { 
            expect (value).toBe (firstN);
        }
    );

    var extractedString2 = lastName.getAttribute('value');
    extractedString2.then
    (
        function(value)
        { 
            expect (value).toBe (lastN);
        }
    );

    var extractedString3 = startDate.getAttribute('value');
    extractedString3.then
    (
        function(value)
        { 
            expect (value).toBe (startD);
        }
    );

    var extractedString4 = email.getAttribute('value');
    extractedString4.then
    (
        function(value)
        { 
            expect (value).toBe (em);
        }
    );
};

	this.verifyUpdateEmployee = function (updFirstN, updLastN, updStartD, updEm) {

	var updFullName = updFirstN +' '+ updLastN;
    var EmployeeName;
    var flag = true;
    employeeList.count().then
    (
        function(totalEmployeeCount) 
    {
        for (var i=0 ;(flag == true) && (i<totalEmployeeCount); i++) 
        {
            EmployeeName = employeeList.get(i); 
            EmployeeName.getText().then
            (
                function (name) 
                {
                if (name == updFullName)
                {
                    EmployeeName.click ();
                    edit.click ();
                    flag = false;
                }
                }
            );
        }
    }
    );

    var extractedString1 = firstName.getAttribute('value');
    extractedString1.then (

        function(value)
        { 
            expect (value).toBe (updFirstN);
        }
    );

    var extractedString2 = lastName.getAttribute('value');
    extractedString2.then
    (
        function(value)
        { 
            expect (value).toBe (updLastN);
        }
    );

    var extractedString3 = startDate.getAttribute('value');
    extractedString3.then
    (
        function(value)
        { 
            expect (value).toBe (updStartD);
        }
    );

    var extractedString4 = email.getAttribute('value');
    extractedString4.then
    (
        function(value)
        { 
            expect (value).toBe (updEm)
        }
    );
	}

	this.deleteEmployee = function (updFirstName, updLastName) {

	var updFullName = updFirstName +' '+ updLastName;
    var EmployeeName;
    var flag = true;

	employeeList.count().then
    (
        function(totalEmployeeCount) 
    {
        for (var i=0 ;(flag == true) && (i<totalEmployeeCount); i++)  
        {
            EmployeeName = employeeList.get(i); 
            EmployeeName.getText().then
            (
                function (Emp) 
                {
                if (Emp == updFullName)
                {
                    EmployeeName.click ();
                    del.click ();
                    browser.switchTo().alert().accept();
                    flag = false;
                    return totalEmployeeCount;
                }
                }
            );
        }
	});
};

	this.verifyDelete = function (totalEmployeeCount) {

		for (var i=0;i<totalEmployeeCount;i++) 
        {

            EmployeeName = employeeList.get (i); 
            EmployeeName.getText().then(function (Emp) 
            {
                expect (Emp).not.toEqual (updFullName)
            }
            );
        }

    }

	this.verifyLogout = function () {

		 expect (element (by.model('user.name')).isPresent()).toBe (true);
	}

};

module.exports = new Main ();
