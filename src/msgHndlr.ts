import actions from "./actions";
import { Client, Message } from "@open-wa/wa-automate"

require('dotenv').config();

const isMaintenanceMode = process.env.MAINTENANCE_MODE === "true";

export default async function msgHandler(client: Client, message: Message) {
    try {
        const { id, from, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg } = message;
        let { body } = message;
        const { formattedTitle } = chat;
        let { pushname, verifiedName } = sender;
        pushname = pushname || verifiedName;
        const commands = caption || body || "";
        const args = commands.split(" ");

        if (!mimetype && body === "") return;

        console.log("---------------------------------------");
        console.log('DATE TIME	===>', new Date().toLocaleString('pt-br'));
        if (isGroupMsg) {
            return console.log("\x1b[1;31mMENSSAGE GROUP. IGNORING\x1b[0m");
        }

        console.log("FROM 	===>", pushname);
        console.log("FROM_ID 	===>", chat.id);
        console.log("ARGUMENTS	===>", isMedia ? `[${mimetype}]` :args);
        console.log("BODY	===>", mimetype ? `[${mimetype}]` : body);

        if (isMaintenanceMode) {
            console.log("\x1b[1;31mMAINTENANCE_MODE ON! IGNORING\x1b[0m");
            return client.sendText(from, "🚧️ *Estou em manutenção.* 🚧️\n\nEstão trabalhando para que eu fique melhor,\nou para que algum problema seja resolvido. 😁\nVolte mais tarde, e tente novamente. 😉");
        }
        
        actions.init(client, message);
    } catch (err) {
        console.log("\x1b[1;31m[ERROR]\x1b[0m", err);
    }
};
