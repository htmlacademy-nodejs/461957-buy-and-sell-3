const express = require(`express`);
const {SSR_PORT} = require(`../constants`);
const registerRouter = require(`./routes/register`);

const app = express();

app.get(`/`, (req, res) => res.send(`Hello, Express.js!`));
app.use(`/register`, registerRouter);
app.listen(SSR_PORT);
