export default {
    hi: () => `${goodDay() || "Olá!"}\nCrie novos arquivos de etapas (_steps_) conforme em \`\`\`modules/step0.ts\`\`\`.`,
    serverError: () => "Desculpe, estamos com problemas no servidor. Tente novamente mais tarde.",
    sessionExpired: () => "Sua sessão expirou por inatividade, mas você pode retornar o contato a qualquer momento.",
}

function goodDay() {
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 0 && hour < 12) {
        return 'Bom dia!';
    }
    if (hour >= 12 && hour < 18) {
        return 'Boa tarde!';
    }
    if (hour >= 18 && hour < 24) {
        return 'Boa noite!';
    }
    return false;
}