import { Channel } from './channel.model';

export class Station {
    constructor(public stationCode: string, public networkCode: string, public latitude: number,
                public longitude: number, public elevation: number, public channels: Channel[]) {}
}