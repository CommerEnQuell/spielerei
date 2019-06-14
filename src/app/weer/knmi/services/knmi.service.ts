import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Daggegevens } from '../data/daggegevens-model';
import { Metadata } from '../data/metadata-model';
import { KnmiRepository } from './knmi.repository';

@Injectable()
export class KnmiService {
    queryUrl = 'http://localhost:1854/v1/api/knmi';
    dagenPerMaand = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    constructor(private httpClient: HttpClient, private repository: KnmiRepository) {}
    
    getDaggegevens(station: number, numDatum: number) {
        console.log('station=' + station + ', numDatum = ' + numDatum);
        let strStation = station.toString();
        let strDatum: string  = numDatum.toString();
        console.log('strDatum = ' + strDatum);
        let theUrl = this.queryUrl + '/' + strStation + '/' + strDatum;
        console.log('Attempt to query ' + theUrl);
        this.httpClient.get<Daggegevens>(theUrl, {observe: 'body', responseType: 'json'}).
            subscribe(result => {
               this.repository.setDagwaarden(result);
            }
        );
        
    }
    
    getMaandOfDatumgegevens(station: number, maand: number, dagOfJaar: number) {
        console.log('station=' + station + ', maand=' + maand + ', dagOfJaar=' + dagOfJaar);
        let strStation = station.toString();
        let theUrl = this.queryUrl + '/' + strStation + '/' + maand + '/' + dagOfJaar;
        console.log('Attempt to query ' + theUrl);
        this.httpClient.get<Daggegevens[]>(theUrl, {observe: 'body', responseType: 'json'}).
            subscribe(result => {
               this.repository.soortOverzicht = (dagOfJaar > 31 ? 3 : 2);
               this.repository.setMaandwaarden(result);
            }
        );
        
    }
  
    getMetadata() {
        let theUrl = this.queryUrl + '/metadata';
        console.log('Querying '+ theUrl + ' for metadata');
        this.httpClient.get<Metadata[]>(theUrl, {observe: 'body', responseType: 'json'}).
            subscribe(result => {
                console.log('Subscription on metadata performed');
                this.repository.setMetadata(result);
                console.log('Metadata of ' + result.length + ' stations have been retrieved');
            }
        );
    }
    
    isValid(station: number, dag: number, maand: number, jaar: number) {
        var metadatum: Metadata;
        for (let i = 0; i < this.repository.metadata.length; i++) {
            console.log('Metadatum: ' + this.repository.metadata[i]);
            if (this.repository.metadata[i].station == station) {
                metadatum = this.repository.metadata[i];
                console.log('Metadatum gevonden voor station ' + station);
                break;
            }
        }
        if (jaar == null || jaar == 0) {
            return this.datumGeldig(dag, maand, 2000);
        }
        let datumNum = 10000 * jaar + 100 * maand + 1 * dag;
        if (datumNum < metadatum.datumVan || datumNum > metadatum.datumTot) {
            console.log('Datum (' + datumNum + ') valt buiten bereik ['  + metadatum.datumVan + '-' + metadatum.datumTot + ']');
            return false;
        }
        if (!this.datumGeldig(dag, maand, jaar)) {
            console.log('Datum ongeldig');
            return false;
        }
        console.log('Invoer succesvol gevalideerd');
        return true;
    }
    
    datumGeldig(dag: number, maand: number, jaar: number) {
        let schrikkeljaar = (jaar % 4 == 0);
        if (maand < 1 || maand > 12) {
            return false;
        }
        let idx = maand - 1;
        if (maand == 2) {
            if (schrikkeljaar) {
                this.dagenPerMaand[idx] = 29;
            } else {
                this.dagenPerMaand[idx] = 28;
            }
        }
        if (dag < 0 || dag > this.dagenPerMaand[idx]) {
            return false;
        }
        if (dag == 0 && jaar == 0) {
            return false;
        }
        return true;
    }
    
}