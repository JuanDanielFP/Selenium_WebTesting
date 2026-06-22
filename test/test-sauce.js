require('dotenv').config();
const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');
// const firefox = require('selenium-webdriver/firefox');

describe('Sauce Labs Website', function() {
    let driver;

    before(async function() {
        let options = new chrome.Options();
        // options.addArguments('--headless'); // jika ingin Jalankan Chrome dalam mode headless (tanpa tampilan GUI)
        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
        await driver.get(process.env.SAUCE_URL);

        let inputUsername = await driver.findElement(By.css('[data-test="username"]'));
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'));
        let buttonLogin = await driver.findElement(By.className('submit-button btn_action'));
        await inputUsername.sendKeys(process.env.SAUCE_USERNAME);
        await inputPassword.sendKeys(process.env.SAUCE_PASSWORD);
        await buttonLogin.click();

        console.log('Setup and Login successful');
        
    });
    after(async function() {
        await driver.sleep(3000);
        await driver.quit();
    });

    it('Visit Sauce Labs Website', async function() {
        let inventoryContainer = await driver.findElement(By.id('inventory_container'));
        assert.ok(inventoryContainer, 'Berhasil login dan masuk ke halaman inventory');
        console.log('Verified on Dashboard');
        await driver.sleep(1000);
    });
    it('Sort products by name Descending', async function() {

        let sortButton = await driver.findElement(By.className('product_sort_container'));
        await sortButton.click();
        
        await driver.sleep(1000);
        let sortOption = await driver.findElement(By.css('option[value="za"]'));
        await sortOption.click();
        
        console.log('Produk berhasil di-sort secara Descending');
    });
            
});