import {IRouter} from "express";

const {Router} = require(`express`);

const error500Router: IRouter = new Router();

error500Router.get(`/`, (req, res) => {
  res.render(`pages/errors/500`);
});

export = error500Router;
