"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEthSig = verifyEthSig;
var ethers_1 = require("ethers");
function verifyEthSig(sig, toSign, publicKey) {
    var recovered = ethers_1.ethers.utils.verifyMessage(toSign, sig);
    console.log("✅ recovered:", recovered);
    return recovered === publicKey;
}
