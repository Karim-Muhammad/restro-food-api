import express, { Application } from "express";
import cookiesParser from "cookie-parser";
import morgran from "morgan";

import dotenv from "dotenv";
dotenv.config();

import config from "../config";
import connectDatabase from "../database";

// Features
import apps from "./features";

class App {
  private static app: Application;
  private static instance: App;

  private constructor() {
    App.app = express();
  }

  private setupDatabase() {
    connectDatabase();
  }

  private setupStandardMiddlewares() {
    App.app.use(express.json());
    App.app.use(express.urlencoded({ extended: true }));
    App.app.use("/static", express.static(`${config.static}`));
    App.app.use(cookiesParser());
    App.app.use(morgran("dev"));
  }
  private setupRoutesMiddlewares() {
    App.app.use("/", apps);
  }

  public static start() {
    App.self().setupDatabase();
    App.self().setupStandardMiddlewares();
    App.self().setupRoutesMiddlewares();

    return App.app;
  }

  private static self() {
    if (!App.instance) App.instance = new App();
    return App.instance;
  }
}

export default App;
