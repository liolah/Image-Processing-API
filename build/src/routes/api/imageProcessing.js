"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageProcessing_1 = __importDefault(require("../../../utilities/imageProcessing"));
const imageRouter = express_1.default.Router();
imageRouter.get('/api', (req, res) => {
    const inputImage = req.query.image;
    const format = req.query.format || 'jpg'; // Format is optional, if no format entered default to .jpg
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    imageProcessing_1.default.processImage(inputImage, format, height, width)
        .then((image) => {
        res.sendFile(image);
    })
        .catch((err) => {
        res.send(err.message);
    });
});
exports.default = imageRouter;
