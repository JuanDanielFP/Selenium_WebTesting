const { By } = require('selenium-webdriver');

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.usernameInput = By.css('[data-test="username"]');
        this.passwordInput = By.xpath('//*[@data-test="password"]');
        this.loginButton = By.css('[data-test="login-button"]');
        this.errorMessage = By.css('[data-test="error"]');
    }

    async open() {
        await this.driver.get('https://www.saucedemo.com/');
    }

    async login(username, password) {
        await this.driver.findElement(this.usernameInput).sendKeys(username);
        await this.driver.findElement(this.passwordInput).sendKeys(password);
        await this.driver.findElement(this.loginButton).click();
    }

    async getErrorMessageText() {
        let errorEl = await this.driver.findElement(this.errorMessage);
        return await errorEl.getText();
    }
}
module.exports = LoginPage;