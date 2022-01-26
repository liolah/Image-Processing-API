"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageProcessing_1 = __importDefault(require("./api/imageProcessing"));
const routes = express_1.default.Router();
routes.use("/", imageProcessing_1.default);
const msg = `<h1>
  Welcome to my simple image processing API!
</h1>
<div>
  To test the API functionality, use the following URL format: <br>
  /api?image="image name"&width="width"&height="height" <br>
Available image names: 
<ul>
  <li>encenadaport</li>
  <li>fjord</li>
  <li>icelandwaterfall</li>
  <li>palmtunnel</li>
  <li>santamonica</li>
</ul>
</div>`;
routes.get('/', (req, res) => {
    res.send(msg);
});
exports.default = routes;
