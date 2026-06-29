const fs = require('fs');

async function captureVisualRegression(driver, testName) {
    const screenshot = await driver.takeScreenshot();
    const dir = './screenshots';
    
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    
    fs.writeFileSync(`${dir}/${testName}.png`, screenshot, 'base64');
    // Di tahap advance, tambahkan logic komparasi gambar baseline vs aktual di sini
}

module.exports = { captureVisualRegression };