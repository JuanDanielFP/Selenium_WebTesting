const { By, until } = require('selenium-webdriver');

class CheckoutPage {
    constructor(driver) {
        this.driver = driver;
        this.checkoutButton = By.id('checkout');
        this.firstNameInput = By.css('[data-test="firstName"]');
        this.lastNameInput = By.css('[data-test="lastName"]');
        this.postalCodeInput = By.css('[data-test="postalCode"]');
        this.continueButton = By.css('[data-test="continue"]');
        this.finishButton = By.css('[data-test="finish"]');
        this.completeHeader = By.className('complete-header');
    }

    async startCheckout() {
        let btnCheckout = await this.driver.wait(until.elementLocated(this.checkoutButton), 5000);
        await btnCheckout.click();
    }

    async fillDetails(firstName, lastName, postalCode) {
        await this.driver.findElement(this.firstNameInput).sendKeys(firstName);
        await this.driver.findElement(this.lastNameInput).sendKeys(lastName);
        await this.driver.findElement(this.postalCodeInput).sendKeys(postalCode);
        await this.driver.findElement(this.continueButton).click();
    }

    async finishCheckout() {
        await this.driver.findElement(this.finishButton).click();
    }

    async getSuccessMessage() {
        let header = await this.driver.findElement(this.completeHeader);
        return await header.getText();
    }
}
module.exports = CheckoutPage;