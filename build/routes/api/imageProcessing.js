"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var imageProcessing_1 = __importDefault(require("../../utilities/imageProcessing"));
var imageRouter = express_1.default.Router();
imageRouter.get('/api', function (req, res) {
    var inputImage = req.query.image;
    var format = req.query.format || 'jpg'; // Format is optional, if no format entered default to .jpg
    var width = parseInt(req.query.width);
    var height = parseInt(req.query.height);
    imageProcessing_1.default.processImage(inputImage, format, height, width)
        .then(function (image) {
        res.sendFile(image[0]);
    })
        .catch(function (err) {
        res.send(err.message);
    });
});
exports.default = imageRouter;
