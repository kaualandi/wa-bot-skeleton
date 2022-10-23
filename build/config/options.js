"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wa_automate_1 = require("@open-wa/wa-automate");
function options(headless, start) {
    const options = {
        blockCrashLogs: false,
        disableSpins: false,
        hostNotificationLang: wa_automate_1.NotificationLanguage.PTBR,
        logConsole: false,
        //popup: true,
        viewport: {
            width: 1920,
            height: 1200
        },
        popup: 3012,
        multiDevice: true,
        defaultViewport: null,
        sessionId: 'wa-bot-skeleton',
        headless: headless,
        qrTimeout: 0,
        authTimeout: 60,
        restartOnCrash: start,
        cacheEnabled: true,
        useChrome: true,
        killProcessOnBrowserClose: true,
        throwErrorOnTosBlock: true,
    };
    return options;
}
exports.default = options;
