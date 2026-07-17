require('dotenv').config();
const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');
// const firefox = require('selenium-webdriver/firefox');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CheckoutPage = require('../pages/CheckoutPage');
const { captureVisualRegression } = require('../utils/visualRegression');
const LogoutPage = require('../pages/LogoutPage'); 

describe('Sauce Labs Website', function() {
    let driver;
    let loginPage;
    let inventoryPage;
    let checkoutPage;
    let logoutPage;
    let backtoProduct;

    before(async function() {
       let options = new chrome.Options();
        // options.addArguments('--headless'); // Uncomment jika butuh headless
        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
        
        // Jika ingin menampilkan browser fullscreen
        await driver.manage().window().maximize();
        
        // Inisialisasi POM
        loginPage = new LoginPage(driver);
        inventoryPage = new InventoryPage(driver);
        checkoutPage = new CheckoutPage(driver);
        logoutPage = new LogoutPage(driver);
    });

    beforeEach(async function() {
        await loginPage.open();
    });

    after(async function() {
        await driver.sleep(2000); // Jeda sebelum quit untuk keperluan debug visual
        await driver.quit();
    });

    
    // --- TEST CASE POSITIVE ---
    it('Positive: Login Success, Add to Cart, Checkout, Logout', async function() {
        // 1. Login Success
        await loginPage.login(process.env.SAUCE_USERNAME, process.env.SAUCE_PASSWORD); // Boleh diganti pakai process.env jika diwajibkan
        let isLoaded = await inventoryPage.isLoaded();
        assert.ok(isLoaded, 'Gagal masuk ke halaman inventory');
        await captureVisualRegression(driver, 'positive_login_success');

        // 2. Add to Cart
        await driver.sleep(1000);
        await inventoryPage.addBackpackToCart();
        await driver.sleep(1000);
        await inventoryPage.goToCart();
        await driver.sleep(1000);
        await captureVisualRegression(driver, 'positive_add_to_cart');

        // 3. Checkout
        await checkoutPage.startCheckout();
        await checkoutPage.fillDetails('John', 'Doe', '12345');
        await captureVisualRegression(driver, 'positive_checkout_overview');
        
        //4 . Finish Checkout
        await checkoutPage.finishCheckout();
        let successMsg = await checkoutPage.getSuccessMessage();
        assert.strictEqual(successMsg, 'Thank you for your order!', 'Pesan sukses tidak muncul');
        await driver.sleep(1000);
        await captureVisualRegression(driver, 'positive_checkout_finish');

        // 5. Logout
        await driver.sleep(1000);
        await logoutPage.homepage();
        await logoutPage.burgerMenu();
        await logoutPage.logout();
        await driver.sleep(1000);
        await captureVisualRegression(driver, 'positive_logout_success');
    });

    // --- TEST CASE NEGATIVE ---
    it('Negative: Login with wrong username and password', async function() {
        await loginPage.login(process.env.SAUCE_WRONG_USERNAME, process.env.SAUCE_WRONG_PASSWORD);
        const errorText = await loginPage.getErrorMessageText();
        assert.strictEqual(errorText, 'Epic sadface: Username and password do not match any user in this service', 'Error message tidak muncul untuk login salah');
        await captureVisualRegression(driver, 'negative_login_wrong_credentials');
    });

    it('Negative: Login without filling fields', async function() {
        await loginPage.login('', '');
        const errorText = await loginPage.getErrorMessageText();
        assert.strictEqual(errorText, 'Epic sadface: Username is required', 'Error message tidak muncul untuk login tanpa mengisi field');
        await captureVisualRegression(driver, 'negative_login_empty_fields');
    });
            
}); 