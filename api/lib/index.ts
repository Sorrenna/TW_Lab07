import App from './app';
import IndexController from "./controllers/index.controller";
import DataController from "./controllers/DataController";

const app: App = new App([]);
const io = app.getIo();

const controllers = [
   new IndexController(io),
   new DataController()
];

controllers.forEach((controller) => {
   app.app.use("/", controller.router);
});

app.listen();
