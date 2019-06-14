import { ChannelEvent } from './channel-event.model';

export class StationEvent {
    
    channelEvents: ChannelEvent[] = [];
    
    constructor(public stationCode: string, public eventId: string, public epicentralDistance: number,
                public locationRef: string, public magnitudeRef: string, public reviewType: string) {}
    
    addChannelEvent(ce: ChannelEvent) {
        if (ce.stationCode !== this.stationCode) {
            console.log('Attempt to add a channel event for station ' + ce.stationCode +
                        ' to station '+ this.stationCode + ' rejected.');
            return;
        }
        if (ce.eventId !== this.eventId) {
            console.log('Attempt to add a channel registration of event ' + ce.eventId +
                        ' to a registration of event ' + this.eventId + ' rejected.');
            return;
        }
        let found = false;
        for (let i = 0; i < this.channelEvents.length; i++) {
            let otherEvent = this.channelEvents[i];
            if (otherEvent.channelCode === ce.channelCode) {
                console.log('Attempt to add the registration for channel ' +
                            ce.channelCode + ' more than once is rejected.');
                return;
            }
        }
        
        let index = this.channelEvents.length;
        this.channelEvents.push();
        this.channelEvents[index] = ce;
    }
}