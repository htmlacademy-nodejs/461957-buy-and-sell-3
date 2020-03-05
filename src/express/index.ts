import {Express} from "express";

const express = require(`express`);
const {SSR_PORT} = require(`../constants`);
const registerRouter = require(`./routes/register`);
const mainPageRouter = require(`./routes/main-page`);
const loginRouter = require(`./routes/login`);
const myRouter = require(`./routes/my`);
const searchRouter = require(`./routes/search`);
const offersRouter = require(`./routes/offers`);
const error500Router = require(`./routes/500`);
const signUpRouter = require(`./routes/sign-up`);

const STATIC_DIR = `src/express/static`;
const app: Express = express();

app.set(`views`, `src/express/templates`);
app.set(`view engine`, `pug`);
app.use(express.static(STATIC_DIR));

app.use(`/`, mainPageRouter);
app.use(`/register`, registerRouter);
app.use(`/login`, loginRouter);
app.use(`/my`, myRouter);
app.use(`/search`, searchRouter);
app.use(`/offers`, offersRouter);
app.use(`/500`, error500Router);
app.use(`/sign-up`, signUpRouter);

app.use((req, res) => {
  const pageContent = {
    errorTitle: `404`,
    errorSubtitle: `Ошибка cервера`
  };
  res.status(404).render(`pages/error`, pageContent);
});
app.listen(SSR_PORT);
