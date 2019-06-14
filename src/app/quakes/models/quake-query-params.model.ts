import { HttpParams }  from '@angular/common/http';

export class QuakeQueryParams {
   
    eventId: string;
    station: string;
    dateFrom: string;
    dateTo: string;
    minMagnitude: number;

    constructor() {
        this.eventId = null;
        this.station = null;
        this.dateFrom = null;
        this.dateTo = null;
        this.minMagnitude = 0;
    }
    
    setEventId(eventId: string) {
        this.eventId = eventId;
    }
    
    setStation(station: string) {
        this.station = station;
    }
    
    setDateFrom(dateFrom: string) {
        this.dateFrom = dateFrom;
    }
    
    setDateTo(dateTo: string) {
        this.dateTo = dateTo;
    }
    
    setMinMagnitude(minMagnitude: number) {
        this.minMagnitude = minMagnitude
    }
    
    getAsHttpParams() {
        var httpParams = new HttpParams();
        if (this.eventId !== null && this.eventId !== '') {
            httpParams = httpParams.append('eventid', this.eventId);
            console.log('To Http params: eventId = ' + this.eventId + ", params = " + httpParams);
        }
        if (this.station !== null && this.station !== '') {
            httpParams = httpParams.append('station', this.station);
        }
        if (this.dateFrom !== null) {
            console.log('Date from: ' + this.dateFrom);
            httpParams = httpParams.append('starttime', this.dateFrom + "T00.00.00.000Z");
        }
        if (this.dateTo !== null) {
            httpParams = httpParams.append('endtime', this.dateTo + "T00.00.00.000Z");
        }
        if (this.minMagnitude > 0) {
            httpParams = httpParams.append('minmagnitude', '' + this.minMagnitude);
        }
        console.log('Http params: ' + httpParams);
        return httpParams;
    }
    
    getAsDate(dateStr: string) {
        var retval: Date = null;
        if (dateStr === null || dateStr === '') {
            return retval;
        }
        var dateArray = dateStr.split("-");
        if (dateArray === null || dateArray.length !== 3)  {
            return retval;
        }
        let year = parseInt(dateArray[0]);
        let month = parseInt(dateArray[1]);
        let day = parseInt(dateArray[2]);
        retval = new Date(year, month, day);
        return retval;
        
    
    }
    
    toString() {
        var retval = '{';
        let first = true;
        if (this.eventId !== null && this.eventId !== '') {
            retval = retval + 'eventId="' + this.eventId + '"';
            first = false;
        }
        if (this.station !== null && this.station !== '') {
            if (!first) {
                retval = retval +', ';
            }
            retval = retval + 'station="' + this.station + '"';
            first = false;
        }
        if (this.dateFrom !== null) {
            if (!first) {
                retval = retval +', ';
            }
            retval = retval + 'dateFrom="' + this.dateFrom + '"';
            first = false;
        }
        if (this.dateTo !== null) {
            if (!first) {
                retval = retval +', ';
            }
            retval = retval + 'dateTo="' + this.dateTo + '"';
            first = false;
        }
        if (this.minMagnitude > 0) {
            if (!first) {
                retval = retval +', ';
            }
            retval = retval + "minMagnitude=" + this.minMagnitude;
            first = false;
        }
        retval = retval + '}';
        return retval;
    }
}