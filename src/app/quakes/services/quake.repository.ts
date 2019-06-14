
import { Channel } from '../models/channel.model';
import { QuakeEvent } from '../models/quake-event.model';
import { QuakeQueryParams } from '../models/quake-query-params.model';
import { RawQuakeReg } from '../models/raw-quake-reg.model';
import { SensorChannel } from '../models/sensor-channel.model';
import { Station } from '../models/station.model';
import { StationEvent } from '../models/station-event.model';
import { ChannelEvent } from '../models/channel-event.model';

export class QuakeRepository {
    events: QuakeEvent[] = [];
    stations: Station[] = [];

    constructor() {}
    
    processRegistrations(registrations: RawQuakeReg[], queryParams: QuakeQueryParams) {
        console.log(registrations.length + ' registrations found:');
        this.events = [];
        this.stations = [];
        var filteredRegs: RawQuakeReg[] = [];
        var idx = 0;
        var quakeIdx = 0;
         for (let i = 0; i < registrations.length; i++) {
            var reg = registrations[i];
            if (!this.passesTheFilter(reg, queryParams)) {
                continue;
            }
            filteredRegs.push();
            filteredRegs[idx] = reg;
            idx++;
            
            let theIndex = this.getEventIndex(reg.eventId);
            if (theIndex < 0) {
                theIndex = this.events.length;
                this.events.push();
                var quakeEvent = new QuakeEvent(
                        reg.eventId,
                        new Date(reg.eventTime),
                        reg.eventMagnitude,
                        reg.magnitudeType,
                        reg.eventDepth,
                        reg.eventLatitude,
                        reg.eventLongitude
                    );
                this.events[theIndex] = quakeEvent;
                console.log('Event added');
            }
            var theEvent: QuakeEvent = this.events[theIndex];
            console.log('Event: ' + this.events[theIndex].eventId);
            
            theIndex = this.getStationIndex(reg.stationCode);
            if (theIndex < 0) {
                var sensorChannels: SensorChannel[] = reg.sensorChannels;
                let channels: Channel[] = [];
                for (let k = 0; k < sensorChannels.length; k++) {
                      channels.push();
                      var c = new Channel(
                                  reg.stationCode,
                                  sensorChannels[k].channelCode, 
                                  sensorChannels[k].sensorAzimuth,
                                  sensorChannels[k].sensorDip,
                                  sensorChannels[k].sensorDepth
                              );
                      channels[k] = c;
                }
                var station = new Station(
                       reg.stationCode,
                       reg.networkCode,
                       reg.stationLatitude,
                       reg.stationLongitude,
                       reg.stationElevation,
                       channels
                    );
                console.log('Station ' + station.stationCode + ' instantiated with '+ channels.length + ' channels');
                theIndex = this.stations.length;
                this.stations.push();
                this.stations[theIndex] = station;
            }
            var theStation: Station = this.stations[theIndex];
            var theStationEvent = new StationEvent(
                   reg.stationCode,
                   reg.eventId,
                   reg.epicentralDistance,
                   reg.eventLocationReference,
                   reg.eventMagnitudeReference,
                   reg.reviewType
            );
            for (let k = 0; k < reg.sensorChannels.length; k++) {
                var ce = new ChannelEvent(
                        reg.stationCode,
                        reg.sensorChannels[k].channelCode,
                        reg.eventId,
                        reg.sensorChannels[k].pgaValue,
                        reg.sensorChannels[k].pgvValue,
                        reg.sensorChannels[k].lowCutCorner,
                        reg.sensorChannels[k].highCutCorner
                    );
                theStationEvent.addChannelEvent(ce);
            }
            theEvent.addStationWithEvent(theStation, theStationEvent);
           
        }
        console.log(this.events.length + ' events registered');
        console.log(this.stations.length + 'stations registered');
        return this.events;
    }
    
    private getEventIndex(eventId: string) {
        var theIndex = -1;
        for (let i = 0; i < this.events.length; i++) {
            let anEvent = this.events[i];
            if (anEvent.eventId === eventId) {
                theIndex = i;
                break;
            }
        }
        return theIndex;
   }
    
    private getStationIndex(stationCode: string) {
        var theIndex = -1;
        for (let i = 0; i < this.stations.length; i++) {
            let aStation = this.stations[i];
            if (aStation.stationCode === stationCode) {
                theIndex = i;
            }
        }
        return theIndex;
    }
    
    private passesTheFilter(reg: RawQuakeReg, queryParams: QuakeQueryParams): boolean {
        if (queryParams.eventId !== null && queryParams.eventId !== '') {
            if (reg.eventId !== queryParams.eventId) {
                return false;
            }
        }
        if (queryParams.station != null && queryParams.station !== '') {
            var stations = queryParams.station.split(",");
            var found = false;
            for (let i = 0; i < stations.length; i++) {
                if (stations[i].trim() === reg.stationCode) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                return false;
            }
        }
        let theDateFrom = queryParams.getAsDate(queryParams.dateFrom);
        let theDateTo = queryParams.getAsDate(queryParams.dateTo);
        if (theDateFrom != null && (new Date(reg.eventTime)).getTime() < theDateFrom.getTime()) {
            return false;
        }
        if (theDateTo != null && (new Date(reg.eventTime)).getTime() > theDateTo.getTime()) {
            return false;
        }
        if (queryParams.minMagnitude != null && queryParams.minMagnitude > 0) {
            if (reg.eventMagnitude < queryParams.minMagnitude) {
                return false;
            }
        }
       
        return true;
    }
    
}