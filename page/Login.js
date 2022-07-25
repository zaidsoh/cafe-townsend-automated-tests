var Login = function () {

	const Main = require ('../page/Main.js');

	const username = element (by.model ('user.name'));
	const password = element (by.model ('user.password'));
	const loginButton = element (by.buttonText('Login'));
	const loginError = element(by.xpath('//*[@id="login-form"]/fieldset/p[1]'));


	this.enterUsername = function (value) {
		username.clear ();   
		username.sendKeys (value);
	}


	this.enterPassword = function (value) {
        password.clear (); 
		password.sendKeys (value);
	};

	this.clickLogin = function () {
		loginButton.click();
	};

	this.verifyInvalid = function () {
		expect (loginError.isPresent()).toBe(true);
		expect (loginError.getText()).toEqual ('Invalid username or password!');
	};

	this.verifyValid = function () {
		expect (Main.greetingMessage().isPresent()).toBe(true);
		expect (Main.greetingMessage().getText()).toEqual('Hello Luke');
    };
};

module.exports = new Login ();
