async function scrapeCompany(page, companyUrl) {
  await page.goto(companyUrl, { waitUntil: "networkidle" });

  const employees = [];

  await page.evaluate(async () => {
    for (let i = 0; i < 5; i++) {
      window.scrollBy(0, document.body.scrollHeight);
      await new Promise(r => setTimeout(r, 2000));
    }
  });

  const cards = await page.$$(".org-people-profile-card");

  for (let i = 0; i < Math.min(cards.length, 10); i++) {
    const card = cards[i];

    const name = await card.$eval(".artdeco-entity-lockup__title", el => el.innerText).catch(() => null);
    const title = await card.$eval(".artdeco-entity-lockup__subtitle", el => el.innerText).catch(() => null);
    const location = await card.$eval(".artdeco-entity-lockup__caption", el => el.innerText).catch(() => null);
    const profileUrl = await card.$eval("a", el => el.href).catch(() => null);

    employees.push({ name, title, location, profileUrl });
  }

  return employees;
}

module.exports = scrapeCompany;
