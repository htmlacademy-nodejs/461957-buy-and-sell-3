const express = require(`express`);
const {SSR_PORT} = require(`../constants`);
const registerRouter = require(`./routes/register`);
const loginRouter = require(`./routes/login`);
const myRouter = require(`./routes/my`);
const searchRouter = require(`./routes/search`);
const offersRouter = require(`./routes/offers`);

const app = express();

app.get(`/`, (req, res) => res.send(`Hello, Express.js!`));
app.use(`/register`, registerRouter);
app.use(`/login`, loginRouter);
app.use(`/my`, myRouter);
app.use(`/search`, searchRouter);
app.use(`/offers`, offersRouter);
app.listen(SSR_PORT);
