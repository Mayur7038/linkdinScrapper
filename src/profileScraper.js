async function scrapeProfile(page, profileUrl) {
  await page.goto(profileUrl, { waitUntil: "networkidle" });

  return {
    name: await page.$eval("h1", el => el.innerText).catch(() => null),
    headline: await page.$eval(".text-body-medium", el => el.innerText).catch(() => null),
    location: await page.$eval(".text-body-small", el => el.innerText).catch(() => null)
  };
}

module.exports = scrapeProfile;
