import * as config from 'config';
import { format } from 'date-fns';
import * as TelegramBot from 'node-telegram-bot-api';
import TelegramService from './services/telegram.service';
import WinCowin from './services/wincowin';

const wincowinBotToken = config.get('telegram.bots.wincowin');

const wincowinBot = new TelegramBot(wincowinBotToken, { polling: true });

const wincowinChannel = config.get('telegram.channels.wincowin');

const districts = config.get('districts') || [];

let cacheClearCounter = 0;

const application = new WinCowin(new TelegramService(), 45, wincowinBot, wincowinChannel);

async function start() {
    cacheClearCounter += 1;
    const date = format(new Date(), 'dd-MM-yyyy');

    await application.processFor({ districts, date });

    if (cacheClearCounter === 36000) {
        //clear message cache after 1 hour
        application.clearMessageCache();
    }
}

async function bootstrap() {
    setInterval(start, 1000);
}

bootstrap();
