import {IRouter} from "express";

const {Router} = require(`express`);

const error404Router: IRouter = new Router();

error404Router.get(`/`, (req, res) => {
  const pageContent = {
    is404Error: true,
    errorTitle: `404`,
    errorSubtitle: `Страница не найдена`,
  };
  res.status(404).render(`pages/error`, pageContent);
});

export = error404Router;
