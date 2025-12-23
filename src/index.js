const { chromium } = require("playwright");
const yargs = require("yargs");
const { loadCookies, saveCookies } = require("./auth");
const scrapeCompany = require("./companyScraper");
const scrapeProfile = require("./profileScraper");

const argv = yargs
  .option("company", { type: "string", demandOption: true })
  .option("profile", { type: "string", demandOption: true })
  .argv;

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await loadCookies(context);

  await page.goto("https://www.linkedin.com/feed/");
  await page.waitForTimeout(15000); 

  await saveCookies(context);

  const companyData = await scrapeCompany(page, argv.company);
  const profileData = await scrapeProfile(page, argv.profile);

  console.log("\nCompany Employees:\n", companyData);
  console.log("\nProfile Data:\n", profileData);

  await browser.close();
})();
