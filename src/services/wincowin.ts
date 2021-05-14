import { CoWinApi } from '../api/cowin.service';
import TelegramService from './telegram.service';
import * as hash from 'object-hash';
import { ICentre, IMessageParameter, ISession } from 'interfaces';

export default class WinCowin {
    private messageCache: any;

    constructor(
        private readonly telegramService: TelegramService,
        private readonly ageGroup: number,
        private readonly bot: any,
        private readonly channelId: number,
    ) {
        this.messageCache = {};
    }

    async processFor({ districts, date }) {
        const districtPromise = [];
        for (const district of districts) {
            districtPromise.push(this.processDistrict(district, date));
        }
        await Promise.all(districtPromise);
    }

    clearMessageCache() {
        this.messageCache = {};
    }

    private async processDistrict(district, date) {
        console.log('processing District: ', district.name);
        const api = new CoWinApi();
        const distInfo = await api.getCalendarForDistrict(district.id, date);
        distInfo.centers = distInfo.centers || [];
        this.processCenters(distInfo.centers, district.name.toUpperCase());
    }

    private async processCenters(centers, district): Promise<void> {
        for (const centre of centers) {
            centre.sessions = centre.sessions || [];
            for (const session of centre.sessions) {
                if (session.available_capacity > 0 && session.min_age_limit === this.ageGroup) {
                    const messageParameters: IMessageParameter = this.generateMessageParameters(centre, session, district);
                    const messageHash = hash(messageParameters);
                    if (!this.messageCache[messageHash]) {
                        this.messageCache[messageHash] = messageParameters;

                        //segregate bots based on regions if needed
                        this.telegramService.sendMessageUsingBot(this.bot, this.channelId, messageParameters);
                        console.log('message sent');
                    }
                }
            }
        }
    }

    private generateMessageParameters(centre: ICentre, session: ISession, district: string): IMessageParameter {
        return {
            ageLimit: session.min_age_limit,
            capacity: session.available_capacity,
            centreName: centre.name,
            date: session.date,
            district,
            pincode: centre.pincode,
            vaccineName: session.vaccine,
        };
    }
}
