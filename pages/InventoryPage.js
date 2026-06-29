const { By, until } = require('selenium-webdriver');

class InventoryPage {
    constructor(driver) {
        this.driver = driver;
        this.inventoryContainer = By.id('inventory_container');
        this.addToCartButton = By.css('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.cartIcon = By.css('.shopping_cart_link');
    }

    async isLoaded() {
        let container = await this.driver.findElement(this.inventoryContainer);
        return await container.isDisplayed();
    }

    async addBackpackToCart() {
        let btnAdd = await this.driver.wait(until.elementLocated(this.addToCartButton), 5000);
        await this.driver.wait(until.elementIsVisible(btnAdd), 5000);
        await btnAdd.click();
    }

    async goToCart() {
        // Cari elemen keranjang
        let btnCart = await this.driver.wait(until.elementLocated(this.cartIcon), 5000);
        
        // Gunakan JS Executor untuk klik paksa (sangat ampuh untuk elemen yang flaky)
        await this.driver.executeScript("arguments[0].click();", btnCart);
    }
}
module.exports = InventoryPage;