import { IMessageParameter } from 'interfaces';
import * as TelegramBot from 'node-telegram-bot-api';

export default class TelegramService {
    constructor() {}

    sendMessageUsingBot(bot: TelegramBot, id: number, params: IMessageParameter) {
        if (!bot || !id || !params) {
            return;
        }
        bot.sendMessage(id, this.createMessage(params));
    }

    private createMessage(params: IMessageParameter): string {
        return `
    [${params.district} - ${params.pincode}]
    Age: ${params.ageLimit}
    Total ${params.capacity} slots available in ${params.centreName} 
    Vaccine ${params.vaccineName}
    Date - ${params.date}
    https://selfregistration.cowin.gov.in/`;
    }
}
