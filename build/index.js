"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
const msg = `Welcome to my simple image processing API!
To test the API functionality, use the following URL format:
/api?image=(image name)&width=(width)&height=(height)
Available image names:
encenadaport
fjord
icelandwaterfall
palmtunnel
santamonica`;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.get("/", (req, res) => {
    res.send(msg);
});
app.get("/api", (req, res) => {
    const name = req.query.image;
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    resizeImage(name, width, height);
    res.sendFile(`${name}-${width}x${height}.jpg`, {
        root: path_1.default.join(__dirname, "../assets/cache"),
    });
});
const resizeImage = (name, width, height) => {
    (0, sharp_1.default)(`assets/original/${name}.jpg`)
        .resize(width, height)
        .toFile(`assets/cache/${name}-${width}x${height}.jpg`);
};
