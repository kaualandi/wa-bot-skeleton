import { Client, Message } from "@open-wa/wa-automate"

const s0 = require('./modules/step0');

interface Step {
    [key: string]: (client: Client, message: Message) => Promise<void>;
}

const steps: Step = {
    s0: (client, message) => s0(client, message)
}
export default steps;