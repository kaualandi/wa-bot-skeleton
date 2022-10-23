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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = __importDefault(require("./actions"));
require('dotenv').config();
const isMaintenanceMode = process.env.MAINTENANCE_MODE === "true";
function msgHandler(client, message) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, from, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg } = message;
            let { body } = message;
            const { formattedTitle } = chat;
            let { pushname, verifiedName } = sender;
            pushname = pushname || verifiedName;
            const commands = caption || body || "";
            const args = commands.split(" ");
            if (!mimetype && body === "")
                return;
            console.log("---------------------------------------");
            console.log('DATE TIME	===>', new Date().toLocaleString('pt-br'));
            if (isGroupMsg) {
                return console.log("\x1b[1;31mMENSSAGE GROUP. IGNORING\x1b[0m");
            }
            console.log("FROM 	===>", pushname);
            console.log("FROM_ID 	===>", chat.id);
            console.log("ARGUMENTS	===>", isMedia ? `[${mimetype}]` : args);
            console.log("BODY	===>", mimetype ? `[${mimetype}]` : body);
            if (isMaintenanceMode) {
                console.log("\x1b[1;31mMAINTENANCE_MODE ON! IGNORING\x1b[0m");
                return client.sendText(from, "🚧️ *Estou em manutenção.* 🚧️\n\nEstão trabalhando para que eu fique melhor,\nou para que algum problema seja resolvido. 😁\nVolte mais tarde, e tente novamente. 😉");
            }
            actions_1.default.init(client, message);
        }
        catch (err) {
            console.log("\x1b[1;31m[ERROR]\x1b[0m", err);
        }
    });
}
exports.default = msgHandler;
;
