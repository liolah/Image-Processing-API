"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const IsValidRequestParameters = (name, format, height, width) => {
    const availableImages = fs_1.default
        .readdirSync(path_1.default.join(__dirname, '../../assets/original'))
        .map((file) => path_1.default.parse(file).name);
    const acceptableFormats = [
        'heic',
        'heif',
        'avif',
        'jpeg',
        'jpg',
        'png',
        'raw',
        'tiff',
        'tif',
        'webp',
        'gif',
        'jp2',
        'jpx',
        'j2k',
        'j2c',
    ];
    let err = '';
    if (!availableImages.includes(name)) {
        err = 'Error: The image requested is not available! </br>';
    }
    if (!acceptableFormats.includes(format)) {
        err = `${err}The format requested is not supported! </br>`;
    }
    if (height == null) {
        err = `${err}Image height is required. Enter a value greater than zero. </br>`;
    }
    else if (height <= 0) {
        err = `${err}Image height must be greater than zero. </br>`;
    }
    if (width == null) {
        err = `${err}Image width is required. Enter a value greater than zero. </br>`;
    }
    else if (width <= 0) {
        err = `${err}Image width must be greater than zero. </br>`;
    }
    return err;
};
const processImage = async (name, format, height, width) => {
    if (IsValidRequestParameters(name, format, height, width) == '') {
        const outputImage = `${name}-${width}x${height}.${format}`;
        const outputImagePath = path_1.default.join(__dirname, '../../assets/cache', outputImage);
        if (!fs_1.default.existsSync(outputImagePath)) {
            const inputImage = fs_1.default.readdirSync(path_1.default.join(__dirname, '../../assets/original')).find((image) => {
                if (image.includes(name))
                    return image;
            });
            await (0, sharp_1.default)(path_1.default.join(__dirname, '../../assets/original', inputImage))
                .resize(width, height)
                .toFormat(format)
                .toFile(`assets/cache/${outputImage}`);
            return [outputImagePath, "New file has been created"];
        }
        else {
            return [outputImagePath, "File already exists"];
        }
    }
    else {
        throw new Error(IsValidRequestParameters(name, format, height, width));
    }
};
exports.default = { processImage };
