export class ChannelEvent {
    constructor(public stationCode: string, public channelCode: string, public eventId: string,
                public pgaValue: number, public pgvValue: number, public lowCutCorner: number,
                public highCutCorner: number) {}
}