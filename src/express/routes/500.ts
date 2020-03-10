import {IRouter} from "express";

const {Router} = require(`express`);

const error500Router: IRouter = new Router();

error500Router.get(`/`, (req, res) => {
  const pageContent = {
    isServerError: true,
    errorTitle: `500`,
    errorSubtitle: `Ошибка cервера`,
  };
  res.status(500).render(`pages/error`, pageContent);
});

export = error500Router;
