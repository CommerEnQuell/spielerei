import { Station } from './station.model';
import { StationEvent } from './station-event.model';

export class QuakeEvent {
    stations: Station[] = [];
    stationEvents: StationEvent[] = [];

    constructor(public eventId: string, public eventTime: Date, public magnitude: number,
                public magnitudeType: string, public depth: number, public latitude: number,
                public longitude: number) {}
    
    addStationWithEvent(station: Station, stationEvent: StationEvent) {
        if (this.stationAlreadyPresent(station.stationCode)) {
            return;
        }
        
        let theIndex = this.stations.length;
        this.stations.push();
        this.stationEvents.push();
        this.stations[theIndex] = station;
        this.stationEvents[theIndex] = stationEvent;
    }
    
    private stationAlreadyPresent(stationCode: string) {
        let found = false;
        for (let i = 0; i < this.stations.length; i++) {
            if (this.stations[i].stationCode === stationCode) {
                found = true;
                break;
            }
        }
        return found;
    }
}