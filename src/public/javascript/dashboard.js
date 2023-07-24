import Nav from "./nav.js";
import NewsApi from "./newsApi.js";
import Repos from "./repos.js";

/**
 * @class Dashboard
 * @description Initializes the dashboard
 * @method constructor - Initializes the NewsApi and Repos classes
 * @property {NewsApi} newsApi - The NewsApi class
 * @property {Repos} repos - The Repos class
 */
class Dashboard {
  constructor() {
    new Nav();
    new NewsApi();
    new Repos();
  }
}

export default Dashboard;
