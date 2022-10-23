import { Client, Message } from "@open-wa/wa-automate"
const { setNextStep, getUser } = require('../fetch');
import messages from './messages';

module.exports = async (client: Client, message: Message) => {
    const { from } = message;

    await client.sendText(from, messages.hi());
    await setNextStep('s0', from);
    console.log("Mensagem enviada");
}