const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { getText, clickElement } = require("../../lib/commands.js");


Before(async function () {
    const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
    const page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php");
    this.browser = browser;
    this.page = page;
    
  });
  
  After(async function () {
    if (this.browser) {
      await this.browser.close();
    }
  });

// Case 1
Given('user is on {string} page', async function (string) {
    return await this.page.goto(`http://qamid.tmweb.ru/client${string}.php`,{
      setTimeout: 20000,
    });
});

When('user clicked on MovieTickets', async function () {
    return await clickElement(this.page, ".movie-seances__time");
});

Then('user sees list of tickets and text MovieTime', async function () {
    const actual = await getText(this.page, ".buying__info-start");
    await expect(actual).contains("Начало сеанса");
});


// Case 2
Given('user moved to tickets page', async function () {
    return await clickElement(this.page, ".movie-seances__time");
});

When('user clicked on empty ticket and buy this', async function () {
    await clickElement(this.page, ".buying-scheme__chair_standart");
    return await clickElement(this.page, ".acceptin-button");
});

Then('check operation status is success', async function () {
    const actual = await getText(this.page, ".ticket__check-title");
    await expect(actual).contains("Вы выбрали билеты");
});

// Case 3
When('user clicked on buy button', async function () {
  return await clickElement(this.page, ".acceptin-button");
});