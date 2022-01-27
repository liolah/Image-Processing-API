"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var imageProcessing_1 = __importDefault(require("./api/imageProcessing"));
var routes = express_1.default.Router();
routes.use("/", imageProcessing_1.default);
routes.get('/', function (req, res) {
    res.sendFile(path_1.default.resolve('public', 'index.html'));
});
exports.default = routes;
