"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sharp_1 = __importDefault(require("sharp"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var IsValidRequestParameters = function (name, format, height, width) {
    var availableImages = fs_1.default
        .readdirSync(path_1.default.resolve('assets', 'original'))
        .map(function (file) { return path_1.default.parse(file).name; });
    var acceptableFormats = [
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
    var err = '';
    if (!availableImages.includes(name)) {
        err = 'Error: The image requested is not available! </br>';
    }
    if (!acceptableFormats.includes(format)) {
        err = "".concat(err, "The format requested is not supported! </br>");
    }
    if (height == null) {
        err = "".concat(err, "Image height is required. Enter a value greater than zero. </br>");
    }
    else if (height <= 0) {
        err = "".concat(err, "Image height must be greater than zero. </br>");
    }
    if (width == null) {
        err = "".concat(err, "Image width is required. Enter a value greater than zero. </br>");
    }
    else if (width <= 0) {
        err = "".concat(err, "Image width must be greater than zero. </br>");
    }
    return err;
};
var processImage = function (name, format, height, width) { return __awaiter(void 0, void 0, void 0, function () {
    var outputImage, outputImagePath, inputImage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(IsValidRequestParameters(name, format, height, width) == '')) return [3 /*break*/, 4];
                outputImage = "".concat(name, "-").concat(width, "x").concat(height, ".").concat(format);
                outputImagePath = path_1.default.resolve('assets', 'cache', outputImage);
                if (!!fs_1.default.existsSync(outputImagePath)) return [3 /*break*/, 2];
                inputImage = fs_1.default.readdirSync(path_1.default.resolve('assets', 'original')).find(function (image) {
                    if (image.includes(name))
                        return image;
                });
                return [4 /*yield*/, (0, sharp_1.default)(path_1.default.resolve('assets', 'original', inputImage))
                        .resize(width, height)
                        .toFormat(format)
                        .toFile("assets/cache/".concat(outputImage))];
            case 1:
                _a.sent();
                return [2 /*return*/, [outputImagePath, "New file has been created"]];
            case 2: return [2 /*return*/, [outputImagePath, "File already exists"]];
            case 3: return [3 /*break*/, 5];
            case 4: throw new Error(IsValidRequestParameters(name, format, height, width));
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.default = { processImage: processImage };
