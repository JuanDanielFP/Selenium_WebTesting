const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');

describe('Sauce Labs Website', function() {
    let driver;

    it('Visit Sauce Labs Website', async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://www.saucedemo.com'); 
        
        let inputUsername = await driver.findElement(By.css('[data-test="username"]'));
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'));
        let buttonLogin = await driver.findElement(By.className('submit-button btn_action'));
        await inputUsername.sendKeys('standard_user');
        await inputPassword.sendKeys('secret_sauce');
        await buttonLogin.click();

        console.log('Login successful');
        await driver.sleep(2000); // Wait for 2 seconds to observe the result
        await driver.quit();
    });
    it('Sort products by name Descending', async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://www.saucedemo.com');
        let inputUsername = await driver.findElement(By.css('[data-test="username"]'));
        let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'));
        let buttonLogin = await driver.findElement(By.className('submit-button btn_action'));
        await inputUsername.sendKeys('standard_user');
        await inputPassword.sendKeys('secret_sauce');
        await buttonLogin.click();

        console.log('Login successful');
        
        let sortButton = await driver.findElement(By.className('product_sort_container'));
        await sortButton.click();
        let sortOption = await driver.findElement(By.css('option[value="za"]'));
        await sortOption.click();
        
        await driver.sleep(2000); // Wait for 2 seconds to observe the result
        await driver.quit();
    })
            
});