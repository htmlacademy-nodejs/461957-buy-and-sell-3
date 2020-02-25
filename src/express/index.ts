const express = require(`express`);
const {SSR_PORT} = require(`../constants`);

const app = express();

app.get(`/`, (req, res) => res.send(`Hello, Express.js!`));
app.listen(SSR_PORT,
  () => console.log(`Listen to port ${SSR_PORT}`));
