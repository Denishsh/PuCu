const { getText, clickElement } = require("./lib/commands");

let page;

beforeEach(async () => {
    page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
  });
  
afterEach(() => {
  page.close();
});

describe("бронирование билетов", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php");
  });

  test("Load main page", async () => {
    const actual = await getText(page, "h1");
    await expect(actual).toContain("Идёмвкино");
  });

  test("Get list of tickets", async () => {
    await clickElement(page, ".movie-seances__time");
    const actual = await getText(page, ".buying__info-start");
    await expect(actual).toContain("Начало сеанса");
  });

  test("Buy ticket", async () =>{
    await clickElement(page, ".movie-seances__time");
    await clickElement(page, ".buying-scheme__chair_standart");
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".ticket__check-title");
    await expect(actual).toContain("Вы выбрали билеты");
  });

  test("Neg. Disabled button before select ticket", async () => {
    await clickElement(page, ".movie-seances__time");
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".buying__info-start");
    await expect(actual).toContain("Начало сеанса");
  });

});