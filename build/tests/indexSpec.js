"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const fs_1 = __importDefault(require("fs"));
const imageProcessing_1 = __importDefault(require("../utilities/imageProcessing"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
describe('Test endpoint responses', () => {
    it('Get the api root endpoint', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });
    it('Get the API image processing endpoint', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });
});
describe('Test image processing functionality', () => {
    const dummyDimension = Math.floor(Math.random() * 500);
    it('Behavior if no cached image matches the request', async () => {
        const response = await imageProcessing_1.default.processImage('fjord', 'jpg', dummyDimension, dummyDimension);
        expect(response[1]).toEqual('New file has been created');
    });
    it('Behavior if a cached image matches the request', async () => {
        const response = await imageProcessing_1.default.processImage('fjord', 'jpg', dummyDimension, dummyDimension);
        expect(response[1]).toEqual('File already exists');
        fs_1.default.unlinkSync(response[0]);
    });
});
