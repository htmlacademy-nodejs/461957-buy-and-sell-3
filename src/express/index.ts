const express = require(`express`);
const {SSR_PORT} = require(`../constants`);
const registerRouter = require(`./routes/register`);
const loginRouter = require(`./routes/login`);
const myRouter = require(`./routes/my`);

const app = express();

app.get(`/`, (req, res) => res.send(`Hello, Express.js!`));
app.use(`/register`, registerRouter);
app.use(`/login`, loginRouter);
app.use(`/my`, myRouter);
app.listen(SSR_PORT);
