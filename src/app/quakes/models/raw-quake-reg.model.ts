import { SensorChannel } from './sensor-channel.model';

export class RawQuakeReg {
    eventId: string;
    eventTime: string;
    eventMagnitude: number;
    magnitudeType: string;
    eventDepth: number;
    eventLatitude: number;
    eventLongitude: number;
    networkCode: string;
    stationCode: string;
    locationCode: string;
    stationLatitude: number;
    stationLongitude: number;
    stationElevation: number;
    epicentralDistance: number;
    eventLocationReference: string;
    eventMagnitudeReference: string;
    reviewType: string;
    sensorChannels: SensorChannel[];

    constructor(eventId: string, eventTime: string, eventMagnitude: number, magnitudeType: string,
                eventDepth: number, eventLatitude: number, eventLongitude: number, networkCode: string,
                stationCode: string, locationCode: string, stationLatitude: number, stationLongitude: number, stationElevation: number,
                epicentralDistance: number, eventLocationReference: string, eventMagnitudeReference: string,
                reviewType: string, sensorChannels: SensorChannel[]) {
        this.eventId = eventId;
        this.eventTime = eventTime;
        this.eventMagnitude = eventMagnitude;
        this.magnitudeType = magnitudeType;
        this.eventDepth = eventDepth;
        this.eventLatitude = eventLatitude;
        this.eventLongitude = eventLongitude;
        this.networkCode = networkCode;
        this.stationCode = stationCode;
        this.locationCode = locationCode;
        this.stationLatitude = stationLatitude;
        this.stationLongitude = stationLongitude;
        this.stationElevation = stationElevation;
        this.epicentralDistance = epicentralDistance;
        this.eventLocationReference = eventLocationReference;
        this.eventMagnitudeReference = eventMagnitudeReference;
        this.reviewType = reviewType;
        this.sensorChannels = sensorChannels;
    }

}