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
var zksync = require("zksync-web3");
var ethers = require("ethers");
var dotenv = require("dotenv");
dotenv.config();
// Load PRIVATE_KEY in .env file
var privateKey = process.env.PRIVATE_KEY;
if (!privateKey) {
    throw new Error('Private key is not defined in the .env file.');
}
var provider = new zksync.Provider("https://testnet.era.zksync.dev");
var wallet = new zksync.Wallet(privateKey).connect(provider);
// Receive Address:
var receiverWallet = "0x8fD344b274Db0F5da89822E41DCAC9F342aD8aa6";
// Token Address:
var _JOS = "0xfb525657e563369CB299E705d6129D1Cc3a63082";
function l2transfer() {
    return __awaiter(this, void 0, void 0, function () {
        var amount, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, transfer, transferReceipt, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        return __generator(this, function (_w) {
            switch (_w.label) {
                case 0:
                    amount = ethers.utils.parseUnits("1000", 18);
                    _b = (_a = console).log;
                    _c = "FROM this L2 wallet: \"".concat;
                    _e = (_d = ethers.utils).formatUnits;
                    return [4 /*yield*/, provider.getBalance(wallet.address, "latest", _JOS)];
                case 1:
                    _b.apply(_a, [_c.apply("FROM this L2 wallet: \"", [_e.apply(_d, [_w.sent(), 18]), "\" JOSE"])]);
                    _g = (_f = console).log;
                    _h = "TO receiver account: \"".concat;
                    _k = (_j = ethers.utils).formatUnits;
                    return [4 /*yield*/, provider.getBalance(receiverWallet, "latest", _JOS)];
                case 2:
                    _g.apply(_f, [_h.apply("TO receiver account: \"", [_k.apply(_j, [_w.sent(), 18]), "\" JOSE"])]);
                    return [4 /*yield*/, wallet.transfer({
                            to: receiverWallet,
                            token: _JOS,
                            amount: amount,
                        })];
                case 3:
                    transfer = _w.sent();
                    return [4 /*yield*/, transfer.wait()];
                case 4:
                    transferReceipt = _w.sent();
                    console.log("Tx transfer hash for JOSE: ".concat(transferReceipt.blockHash));
                    _m = (_l = console).log;
                    _o = "FROM this L2 wallet: \"".concat;
                    _q = (_p = ethers.utils).formatUnits;
                    return [4 /*yield*/, provider.getBalance(wallet.address, "latest", _JOS)];
                case 5:
                    _m.apply(_l, [_o.apply("FROM this L2 wallet: \"", [_q.apply(_p, [_w.sent(), 18]), "\" JOSE"])]);
                    _s = (_r = console).log;
                    _t = "TO receiver wallet: \"".concat;
                    _v = (_u = ethers.utils).formatUnits;
                    return [4 /*yield*/, provider.getBalance(receiverWallet, "latest", _JOS)];
                case 6:
                    _s.apply(_r, [_t.apply("TO receiver wallet: \"", [_v.apply(_u, [_w.sent(), 18]), "\" JOSE"])]);
                    return [2 /*return*/];
            }
        });
    });
}
l2transfer().catch(function (error) { return console.error(error); });
// npx ts-node transfer-l2.ts
// Compile TypeScript to java= npx tsc transfer-l2.ts
