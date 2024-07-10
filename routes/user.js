const route = require("express").Router();
const bcrypt = require("bcrypt");

const users = [];

route.get("/", async (req, res) => {
  res.send("Hello User");
});

route.post("/signup", async (req, res) => {
  const [authType, authString] = req.headers.authorization.split(" ");
  const [username, password] = Buffer.from(authString, "base64")
    .toString("utf-8")
    .split(":");
  const hashedPassword = await bcrypt.hash(password, 0);
  users.push({ username, hashedPassword });

  res.send("Account Created!");
});

route.post("/login", async (req, res) => {
  const [authType, authString] = req.headers.authorization.split(" ");
  const [username, password] = Buffer.from(authString, "base64")
    .toString("utf-8")
    .split(":");

  const user = users.find((user) => user.username === username);
  if (user) {
    const authResult = await bcrypt.compare(password, user.password);
    res.send("Logged in!");
  } else {
    res.send("Incorrect Login information...");
  }
});

module.exports = route;
