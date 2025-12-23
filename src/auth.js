const fs = require("fs");

const loadCookies = async (context) => {
  if (!fs.existsSync("cookies.json")) return;

  const raw = fs.readFileSync("cookies.json", "utf-8").trim();
  if (!raw) return; // prevents JSON.parse crash

  const cookies = JSON.parse(raw);
  await context.addCookies(cookies);
};

const saveCookies = async (context) => {
  const cookies = await context.cookies();
  fs.writeFileSync("cookies.json", JSON.stringify(cookies, null, 2));
};

module.exports = {
  loadCookies,
  saveCookies
};
