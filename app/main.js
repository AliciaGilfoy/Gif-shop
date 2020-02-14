import GifsController from "./Controllers/GifsController.js";

class App {
  gifsController = new GifsController();
}

window["app"] = new App();
