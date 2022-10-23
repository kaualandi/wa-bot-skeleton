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
const wa_automate_1 = require("@open-wa/wa-automate");
const msgHndlr_1 = __importDefault(require("./msgHndlr"));
const options_1 = __importDefault(require("./config/options"));
require('dotenv').config();
const start = (client) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('\x1b[1;32m✓ USING:', process.env.USING, '\x1b[0m');
    console.log('\x1b[1;32m✓ NUMBER:', yield client.getHostNumber(), '\x1b[0m');
    console.log('\x1b[1;32m[SERVER] Servidor iniciado!\x1b[0m');
    client.onStateChanged((state) => {
        console.log('[Status do cliente]', state);
        if (state === 'CONFLICT' || state === 'UNLAUNCHED')
            client.forceRefocus();
    });
    // Message Listener
    client.onMessage(((message) => __awaiter(void 0, void 0, void 0, function* () {
        client.getAmountOfLoadedMessages()
            .then((msg) => {
            if (msg >= 3000) {
                client.cutMsgCache();
            }
        });
        (0, msgHndlr_1.default)(client, message);
    })));
    return client;
});
(0, wa_automate_1.create)((0, options_1.default)(true, start))
    .then(client => start(client))
    .catch(error => console.log(error));
