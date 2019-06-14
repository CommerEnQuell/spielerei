import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, from as fromPromise } from 'rxjs';
import { switchMap, map, take, tap, withLatestFrom } from 'rxjs/operators';

import { QuakeQueryParams } from '../models/quake-query-params.model';
import { RawQuakeReg } from '../models/raw-quake-reg.model';
import { QuakeRepository } from './quake.repository';
import { QuakeEvent } from '../models/quake-event.model';

import * as firebase from 'firebase';

@Injectable()
export class QuakeService {
//    url = 'http://rdsa.knmi.nl/odcws/rrsm/1/peak-motion';
    url = 'https://bevinkjes.firebaseio.com/raw-quake-regs.json';
    events: QuakeEvent[];
    loggedIn = false;
    authToken = '';

    constructor(private httpClient: HttpClient, private repository: QuakeRepository) {}
    
    getQuakes(queryParams: QuakeQueryParams) {
        console.log('Attempting to get some quakes with query params: ' + queryParams);
        var i = 0;
        this.httpClient.get<RawQuakeReg[]>(this.url, {observe: 'body', params: queryParams.getAsHttpParams(), responseType: 'json'})
            .subscribe(
                result => {
                   console.log('Result: ' + result);
                   this.events = this.repository.processRegistrations(result, queryParams);
                   for (i = 0; i < this.events.length; i++) {
                       let reg = this.events[i];
                       console.log('Register #' + i + ': ' + reg.eventId + ' (' + reg.stations.length + ' station'+ 
                                   (reg.stations.length === 1 ? '' : 's') + ')');
                   }
                });
    }
    
    doLogin() {
        fromPromise(firebase.auth().signInWithEmailAndPassword('buridan59@gmail.com', 'Movag707'))
            .subscribe(
                    (response) => {
                        console.log('Logged in successfully ' + response);
                        this.loggedIn = true;
                    },
                    (error) => {
                        console.log('Login attempt went down the drain: ' + error);
                    }
            );
        
        fromPromise(firebase.auth().currentUser.getIdToken())
            .subscribe(
                    (token: string) => {
                        this.authToken = token;
                        console.log('Token obtained: ' + token);
                    }
             );
    }
    
}
