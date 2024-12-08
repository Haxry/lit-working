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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signRepo = signRepo;
var litaction_1 = require("./litaction");
var gitlink_1 = require("./utils/gitlink");
var fs = require("fs");
function signRepo(repo_1) {
    return __awaiter(this, arguments, void 0, function (repo, branch) {
        var _a, url, name, response, resp, respArrayBuffer, repoCommit, _b, base64BufferArray;
        if (branch === void 0) { branch = "main"; }
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = (0, gitlink_1.getGitZipLink)(repo, branch), url = _a[0], name = _a[1];
                    return [4 /*yield*/, (0, litaction_1.litSignRepo)(url)];
                case 1:
                    response = _c.sent();
                    console.log("response:", response);
                    return [4 /*yield*/, fetch(url).then(function (response) { return response; })];
                case 2:
                    resp = _c.sent();
                    return [4 /*yield*/, resp.arrayBuffer()];
                case 3:
                    respArrayBuffer = _c.sent();
                    _b = Uint8Array.bind;
                    return [4 /*yield*/, crypto.subtle.digest("SHA-256", respArrayBuffer)];
                case 4:
                    repoCommit = new (_b.apply(Uint8Array, [void 0, _c.sent()]))();
                    base64BufferArray = Buffer.from(respArrayBuffer).toString("base64");
                    console.log("repoCommit:", repoCommit);
                    //@ts-ignore
                    response.signatures.timestamp = response.response.valueOf()["timestamp"];
                    response.signatures.repoUrl = url;
                    return [2 /*return*/, { signature: response.signatures, bufferArray: base64BufferArray }];
            }
        });
    });
}
exports.default = signRepo;
// signRepo("https://github.com/zkfriendly/lit-lab");
