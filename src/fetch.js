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
var lit_node_client_1 = require("@lit-protocol/lit-node-client");
var constants_1 = require("@lit-protocol/constants");
var auth_helpers_1 = require("@lit-protocol/auth-helpers");
var types_1 = require("@lit-protocol/types");
var ethers_1 = require("ethers");
var contracts_sdk_1 = require("@lit-protocol/contracts-sdk");
var constants_2 = require("@lit-protocol/constants");
require("dotenv").config();
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var litNodeClient, privateKey, formattedPrivateKey, wallet, latestBlockhash, litContracts, sessionSigs, pkpPublicKey, pkp, executeJsRes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("🔥 LET'S GO!");
                litNodeClient = new lit_node_client_1.LitNodeClient({
                    litNetwork: constants_1.LitNetwork.Cayenne,
                    debug: true,
                });
                console.log("Connecting to LitNode...");
                return [4 /*yield*/, litNodeClient.connect()];
            case 1:
                _a.sent();
                console.log(litNodeClient.config);
                console.log("Connected nodes:", litNodeClient.connectedNodes);
                privateKey = process.env.PRIVATE_KEY;
                if (!privateKey) {
                    throw new Error("PRIVATE_KEY not found in environment variables");
                }
                formattedPrivateKey = privateKey.startsWith('0x') ? privateKey : "0x".concat(privateKey);
                wallet = new ethers_1.ethers.Wallet(formattedPrivateKey, new ethers_1.ethers.providers.JsonRpcProvider(constants_2.LIT_CHAIN_RPC_URL));
                return [4 /*yield*/, litNodeClient.getLatestBlockhash()];
            case 2:
                latestBlockhash = _a.sent();
                console.log("latestBlockhash:", latestBlockhash);
                litContracts = new contracts_sdk_1.LitContracts({
                    signer: wallet,
                    debug: false,
                    network: constants_1.LitNetwork.Cayenne,
                });
                return [4 /*yield*/, litContracts.connect()];
            case 3:
                _a.sent();
                return [4 /*yield*/, litNodeClient.getSessionSigs({
                        resourceAbilityRequests: [
                            {
                                resource: new auth_helpers_1.LitPKPResource("*"),
                                ability: types_1.LitAbility.PKPSigning,
                            },
                            {
                                resource: new auth_helpers_1.LitActionResource("*"),
                                ability: types_1.LitAbility.LitActionExecution,
                            },
                        ],
                        authNeededCallback: function (params) { return __awaiter(void 0, void 0, void 0, function () {
                            var toSign, authSig;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!params.uri) {
                                            throw new Error("uri is required");
                                        }
                                        if (!params.expiration) {
                                            throw new Error("expiration is required");
                                        }
                                        if (!params.resourceAbilityRequests) {
                                            throw new Error("resourceAbilityRequests is required");
                                        }
                                        return [4 /*yield*/, (0, auth_helpers_1.createSiweMessageWithRecaps)({
                                                uri: params.uri,
                                                expiration: params.expiration,
                                                resources: params.resourceAbilityRequests,
                                                walletAddress: wallet.address,
                                                nonce: latestBlockhash,
                                                litNodeClient: litNodeClient,
                                            })];
                                    case 1:
                                        toSign = _a.sent();
                                        return [4 /*yield*/, (0, auth_helpers_1.generateAuthSig)({
                                                signer: wallet,
                                                toSign: toSign,
                                            })];
                                    case 2:
                                        authSig = _a.sent();
                                        return [2 /*return*/, authSig];
                                }
                            });
                        }); },
                    })];
            case 4:
                sessionSigs = _a.sent();
                console.log("✅ sessionSigs:", sessionSigs);
                pkpPublicKey = process.env.PKPPUBLIC_KEY;
                if (!pkpPublicKey) {
                    throw new Error("PKPPUBLIC_KEY not found in environment variables");
                }
                pkp = {
                    publicKey: pkpPublicKey,
                };
                return [4 /*yield*/, litNodeClient.executeJs({
                        code: "(async () => {\n      const url = \"https://github.com/zkfriendly/lit-lab/archive/refs/heads/main.zip\";\n      const resp = await fetch(url).then((response) => response);\n      const respBuffer = await resp;\n      const respArrayBuffer = await resp.arrayBuffer();\n      const repoCommit = new Uint8Array(\n        await crypto.subtle.digest('SHA-256', respArrayBuffer)\n      );\n      console.log(\"repoCommit:\", repoCommit);\n      console.log(\"respArrayBuffer:\", respArrayBuffer);\n      const sigShare = await LitActions.signEcdsa({\n        toSign: repoCommit,\n        publicKey,\n        sigName: \"sig\",\n      });\n      LitActions.setResponse({\n        response: JSON.stringify({ timestamp: Date.now().toString()}),\n      });\n    })();",
                        sessionSigs: sessionSigs,
                        jsParams: {
                            dataToSign: Array.from(ethers_1.ethers.utils.arrayify(ethers_1.ethers.utils.keccak256("0x" + Array.from([1, 2, 3, 4, 5]).map(function (b) { return b.toString(16).padStart(2, '0'); }).join('')))),
                            publicKey: pkp.publicKey,
                        },
                    })];
            case 5:
                executeJsRes = _a.sent();
                console.log("✅ executeJsRes:", executeJsRes);
                return [2 /*return*/];
        }
    });
}); })();
