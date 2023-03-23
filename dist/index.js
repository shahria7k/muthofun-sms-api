"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
class SMSNotifier {
    constructor(options) {
        this.authToken = options.authToken;
        this.apiUrl = options.apiUrl;
    }
    sendSMSNotification(msg, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify({
                receiver: phone,
                message: msg,
                remove_duplicate: true,
            });
            const options = {
                hostname: this.apiUrl,
                port: 443,
                path: "/api/v1/send-sms",
                method: "POST",
                headers: {
                    Authorization: `Token ${this.authToken}`,
                    "Content-Type": "application/json",
                    "Content-Length": Buffer.byteLength(data),
                },
            };
            return new Promise((resolve, reject) => {
                const req = http.request(options, (res) => {
                    let responseData = "";
                    res.setEncoding("utf8");
                    res.on("data", (chunk) => {
                        responseData += chunk;
                    });
                    res.on("end", () => {
                        try {
                            const parsedData = JSON.parse(responseData);
                            console.log(parsedData);
                            resolve();
                        }
                        catch (e) {
                            console.error(`Error parsing response data: ${e.message}`);
                            reject(e);
                        }
                    });
                });
                req.on("error", (e) => {
                    console.error(`Request error: ${e.message}`);
                    reject(e);
                });
                req.write(data);
                req.end();
            });
        });
    }
}
exports.default = SMSNotifier;
