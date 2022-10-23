import { Client, Message, ChatId } from "@open-wa/wa-automate";
import steps from "./steps";
import { getUser, submitNewUser, setNextStep, setLastMessage } from "./fetch";
import messages from "./modules/messages";
require('dotenv').config();

async function init(client: Client, message: Message) {
    const { from, sender, body, mimetype } = message;
    // ? For add client.reply() add "id" in to above defragment
    let { pushname } = sender;

    // ? Submiting proccess
    const user = await getUser(from);
    let step = "s0";
    if (user === false) {
        console.log("USER	===> NÃO CADASTRADO");
        const newUser = await submitNewUser(from, pushname);
        if (newUser) {
            console.log("USER	===> CADASTRADO");
            step = 's0';
        } else {
            console.log("USER	===> FALHA AO CADASTRAR");
            step = 's0';
            await client.sendText(from, "Desculpe, não conseguimos cadastrar você. Tente novamente mandando qualquer mensagem.");
            return console.log("Mensagem enviada");
        }
    } else if (user.error === true) {
        const errorNumber = process.env.RESPONSE_ERROR_NUMBER;
        errorNumber &&
        await client.sendText(`${errorNumber}@c.us` as ChatId, `Deu merda no servidor!\n\nAtenção imediata requerida!`);
        console.log("Mensagem enviada");

        await client.sendText(from, messages.serverError());
        return console.log("Mensagem enviada");
    } else {
        console.log("USER	===> JÁ CADASTRADO");
        step = user.step;
    }

    // ? Session proccess // Auto encerramento de sessão
    // const lastMessage = new Date();
    // await setLastMessage(lastMessage.getTime(), from);
    // await expireSectionCountdown(from, lastMessage.getTime(), client);
    
    // ? Steps proccess
    console.log('STEP	===>', step);
    if (steps[step]) {
        await steps[step](client, message);
    } else {
        console.log(`PASSO INEXISTENTE`);
    }
}

const actions = {
    init: (client: Client, message: Message) => init(client, message)
}

export default actions;

async function expireSectionCountdown(from: ChatId, date: number, client: Client) {
    const expireTime = parseInt(process.env.EXPIRE_TIME || '0');
    const timeout = setTimeout(async () => {
        const user = await getUser(from);
        if (user === false) {
            console.log("TIMEOUT	===> Usuário não encontrado");
            return
        } else if (user.error === true) {
            console.log("TIMEOUT	===> ERROR");
            return
        } else {
            console.log("TIMEOUT	===> Usuário encontrado");
            if (user.lastMessage == date) {
                console.log("TIMEOUT	===> Sessão expirada");
                await setNextStep('s0', from);
                await client.sendText(from, messages.sessionExpired());
                console.log("Mensagem enviada");
            } else {
                console.log("TIMEOUT	===> Sessão não expirada");
                return;
            }
        }
    }, expireTime || 120000); // ? Padrão 2 minutos
}