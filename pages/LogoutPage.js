const { By } = require('selenium-webdriver');

class LogoutPage {
    constructor(driver) {
        this.driver = driver;
        this.inventoryUrl = 'https://www.saucedemo.com/inventory.html';
        this.burgerMenuButton = By.id('react-burger-menu-btn');
        this.logoutButton = By.id('logout_sidebar_link');
    }

    async homepage() {
        await this.driver.get(this.inventoryUrl);
    }

    async burgerMenu() {
        await this.driver.sleep(1000);
        await this.driver.findElement(this.burgerMenuButton).click();
    }

    async logout() {
        await this.driver.sleep(1000);
        await this.driver.findElement(this.logoutButton).click();
    }
}
module.exports = LogoutPage;