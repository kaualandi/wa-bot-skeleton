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
const steps_1 = __importDefault(require("./steps"));
const fetch_1 = require("./fetch");
const messages_1 = __importDefault(require("./modules/messages"));
require('dotenv').config();
function init(client, message) {
    return __awaiter(this, void 0, void 0, function* () {
        const { from, sender, body, mimetype } = message;
        // ? For add client.reply() add "id" in to above defragment
        let { pushname } = sender;
        // ? Submiting proccess
        const user = yield (0, fetch_1.getUser)(from);
        let step = "s0";
        if (user === false) {
            console.log("USER	===> NÃO CADASTRADO");
            const newUser = yield (0, fetch_1.submitNewUser)(from, pushname);
            if (newUser) {
                console.log("USER	===> CADASTRADO");
                step = 's0';
            }
            else {
                console.log("USER	===> FALHA AO CADASTRAR");
                step = 's0';
                yield client.sendText(from, "Desculpe, não conseguimos cadastrar você. Tente novamente mandando qualquer mensagem.");
                return console.log("Mensagem enviada");
            }
        }
        else if (user.error === true) {
            const errorNumber = process.env.RESPONSE_ERROR_NUMBER;
            errorNumber &&
                (yield client.sendText(`${errorNumber}@c.us`, `Deu merda no servidor!\n\nAtenção imediata requerida!`));
            console.log("Mensagem enviada");
            yield client.sendText(from, messages_1.default.serverError());
            return console.log("Mensagem enviada");
        }
        else {
            console.log("USER	===> JÁ CADASTRADO");
            step = user.step;
        }
        // ? Session proccess // Auto encerramento de sessão
        // const lastMessage = new Date();
        // await setLastMessage(lastMessage.getTime(), from);
        // await expireSectionCountdown(from, lastMessage.getTime(), client);
        // ? Steps proccess
        console.log('STEP	===>', step);
        if (steps_1.default[step]) {
            yield steps_1.default[step](client, message);
        }
        else {
            console.log(`PASSO INEXISTENTE`);
        }
    });
}
const actions = {
    init: (client, message) => init(client, message)
};
exports.default = actions;
function expireSectionCountdown(from, date, client) {
    return __awaiter(this, void 0, void 0, function* () {
        const expireTime = parseInt(process.env.EXPIRE_TIME || '0');
        const timeout = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            const user = yield (0, fetch_1.getUser)(from);
            if (user === false) {
                console.log("TIMEOUT	===> Usuário não encontrado");
                return;
            }
            else if (user.error === true) {
                console.log("TIMEOUT	===> ERROR");
                return;
            }
            else {
                console.log("TIMEOUT	===> Usuário encontrado");
                if (user.lastMessage == date) {
                    console.log("TIMEOUT	===> Sessão expirada");
                    yield (0, fetch_1.setNextStep)('s0', from);
                    yield client.sendText(from, messages_1.default.sessionExpired());
                    console.log("Mensagem enviada");
                }
                else {
                    console.log("TIMEOUT	===> Sessão não expirada");
                    return;
                }
            }
        }), expireTime || 120000); // ? Padrão 2 minutos
    });
}
