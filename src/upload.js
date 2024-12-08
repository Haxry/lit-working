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
exports.uploadFromRepoUrl = uploadFromRepoUrl;
var sdk_1 = require("@lighthouse-web3/sdk");
var url_1 = require("url");
require("dotenv").config();
var main_1 = require("./main");
// upload a file to Lighthouse and return metadata
function upload(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var apiKey, dealParams;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiKey = process.env.LIGHTHOUSE_API_KEY;
                    dealParams = {
                        num_copies: 2,
                        repair_threshold: 28800,
                        deal_duration: 518400,
                        renew_threshold: 240,
                        miner: ["t017840"],
                        network: "calibration",
                        add_mock_data: 2,
                    };
                    return [4 /*yield*/, sdk_1.default.upload(filePath, apiKey, false, dealParams)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function uploadFromRepoUrl(repoUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var signedRepoData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, main_1.signRepo)(repoUrl)];
                case 1:
                    signedRepoData = _a.sent();
                    return [4 /*yield*/, uploadFromBuffer(Buffer.from(JSON.stringify(signedRepoData)))];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function uploadFromBuffer(buffer) {
    return __awaiter(this, void 0, void 0, function () {
        var apiKey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiKey = process.env.LIGHTHOUSE_API_KEY;
                    return [4 /*yield*/, sdk_1.default.uploadBuffer(buffer, apiKey)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function sampleUpload() {
    return __awaiter(this, void 0, void 0, function () {
        var uploadReceipt, cid, status, proofResponse, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, uploadFromRepoUrl("https://github.com/zkfriendly/lit-lab")];
                case 1:
                    uploadReceipt = _d.sent();
                    cid = uploadReceipt.data.Hash;
                    return [4 /*yield*/, sdk_1.default.dealStatus(cid)];
                case 2:
                    status = _d.sent();
                    return [4 /*yield*/, fetch("https://api.lighthouse.storage/api/lighthouse/get_proof" +
                            new url_1.URLSearchParams({ cid: cid, network: "testnet" }))];
                case 3:
                    proofResponse = _d.sent();
                    console.log(proofResponse.status);
                    console.log("🚀 File uploaded to Lighthouse!");
                    console.log("🔗 IPFS CID:", cid);
                    console.log("📦 Filecoin Deal Status:", status);
                    _b = (_a = console).log;
                    _c = ["my uploads:"];
                    return [4 /*yield*/, sdk_1.default.getUploads(process.env.LIGHTHOUSE_API_KEY)];
                case 4:
                    _b.apply(_a, _c.concat([_d.sent()]));
                    return [2 /*return*/];
            }
        });
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/];
}); }); })();
