const mineflayer = require('mineflayer');

const serverIp = 'SkyForgeWar.aternos.me';
const serverPort = 43167;
const botName = 'SkyForgeWarBot';

function createBot() {
    const bot = mineflayer.createBot({
        host: serverIp,
        port: serverPort,
        username: botName,
        version: false, // Auto-detect version
        connectTimeout: 30000 // Increase connection timeout to 30 seconds
    });

    bot.on('connect', () => {
        console.log('Attempting to connect...');
    });

    bot.on('spawn', () => {
        console.log(`Connected to Minecraft server at ${serverIp}:${serverPort}`);
        setInterval(() => {
            bot.setControlState('forward', true);
            setTimeout(() => {
                bot.setControlState('forward', false);
            }, 1000);
        }, 2000);
    });

    bot.on('end', () => {
        console.log('Disconnected from server. Retrying in 5 seconds...');
        setTimeout(createBot, 5000);
    });

    bot.on('error', (err) => {
        console.error(`Error: ${err.message}`);
        if (err.code === 'ECONNRESET') {
            console.log('Connection was reset. Retrying in 5 seconds...');
            setTimeout(createBot, 5000);
        }
    });
}

createBot();
