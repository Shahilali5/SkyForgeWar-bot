const mineflayer = require('mineflayer');

const serverIp = 'SkyForgeWar.aternos.me';
const serverPort = 43167;
const botName = 'SkyForgeWarBot';

function createBot() {
    const bot = mineflayer.createBot({
        host: serverIp,
        port: serverPort,
        username: botName,
        version: '1.20.1'
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
        console.log(`Error: ${err.message}`);
    });
}

createBot()
