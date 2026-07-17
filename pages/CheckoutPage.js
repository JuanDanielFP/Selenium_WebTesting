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
        this.backHomeButton = By.id('back-to-products');
    }

    async startCheckout() {
        await this.driver.sleep(5000);
        let btnCheckout = await this.driver.wait(until.elementLocated(this.checkoutButton), 5000);
        await btnCheckout.click();
    }

    async fillDetails(firstName, lastName, postalCode) {
        await this.driver.sleep(5000);
        await this.driver.findElement(this.firstNameInput).sendKeys(firstName);
        await this.driver.findElement(this.lastNameInput).sendKeys(lastName);
        await this.driver.findElement(this.postalCodeInput).sendKeys(postalCode);
        await this.driver.findElement(this.continueButton).click();
    }

    async finishCheckout() {
        await this.driver.sleep(5000);
        await this.driver.executeScript("window.scrollTo(0, document.body.scrollHeight);"); //scroll ke bawah
        let btnFinish = await this.driver.wait(until.elementLocated(this.finishButton), 5000);
        await this.driver.wait(until.elementIsVisible(btnFinish), 5000);
        await btnFinish.click();
    }

    async getSuccessMessage() {
        await this.driver.sleep(5000);
        let header = await this.driver.findElement(this.completeHeader);
        return await header.getText();
    }
    async backHome() {
        await this.driver.sleep(5000);
        await this.driver.findElement(this.backHomeButton).click();
    }
}
module.exports = CheckoutPage;