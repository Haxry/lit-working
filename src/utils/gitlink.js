"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGitZipLink = getGitZipLink;
function getGitZipLink(str, branch) {
    if (branch === void 0) { branch = "main"; }
    if (!str) {
        return ["", ""];
    }
    var parts = str.split("/");
    var repo = parts[parts.length - 1];
    var usr = parts[parts.length - 2];
    return [
        "https://github.com/".concat(usr, "/").concat(repo, "/archive/refs/heads/").concat(branch, ".zip"),
        "".concat(usr, "-").concat(repo),
    ];
}
