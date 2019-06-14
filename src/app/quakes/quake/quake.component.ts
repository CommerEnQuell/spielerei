import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as firebase from 'firebase';

import { QuakeQueryParams } from '../models/quake-query-params.model';
import { QuakeService } from '../services/quake.service';

@Component({
  selector: 'app-quake',
  templateUrl: './quake.component.html',
  styleUrls: ['./quake.component.css']
})
export class QuakeComponent implements OnInit {
    isClear: boolean;
    quakesQueryForm = new FormGroup({
        'eventId': new FormControl(''),
        'station': new FormControl(''),
        'dateFrom': new FormControl(''),
        'dateTo': new FormControl(''),
        'minMagnitude': new FormControl('')
     });


  constructor(private quakeService: QuakeService) { }

  ngOnInit() {
/*      
      firebase.initializeApp({
          apiKey: "AIzaSyCw8cJaxgr57reukIjzxeAX6RCH_c7-9bY",
          authDomain: "bevinkjes.firebaseapp.com"
      });

     console.log('Logging in...');
      this.quakeService.doLogin();
*/
  }
  
  onClear() {
      this.quakesQueryForm.reset();
      console.log('Form cleared, at least I hope so...');
  }
  
  onQuery() {
      let queryParams = new QuakeQueryParams();
      if (!this.quakesQueryForm.get('eventId').pristine) {
          queryParams.setEventId(this.quakesQueryForm.get('eventId').value);
          console.log('Event id set to ' + this.quakesQueryForm.get('eventId').value);
      }
      if (!this.quakesQueryForm.get('station').pristine) {
          queryParams.setStation(this.quakesQueryForm.get('station').value);
      }
      if (!this.quakesQueryForm.get('dateFrom').pristine) {
          queryParams.setDateFrom(this.quakesQueryForm.get('dateFrom').value);
      }
      if (!this.quakesQueryForm.get('dateTo').pristine) {
          queryParams.setDateTo(this.quakesQueryForm.get('dateTo').value);
      }
      if (!this.quakesQueryForm.get('minMagnitude').pristine) {
          queryParams.setMinMagnitude(parseFloat(this.quakesQueryForm.get('minMagnitude').value));
      }
    
      console.log('Query params: eventId=' + queryParams.eventId);
      this.quakeService.getQuakes(queryParams);
      
      
      console.log('Query is under construction...');
  }

}
