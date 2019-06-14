import { Component, OnInit, Input } from '@angular/core';

import { QuakeEvent } from '../../models/quake-event.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @Input() registration: QuakeEvent;

  constructor() { }

  ngOnInit() {
      console.log('Reg component initialized');
  }

}
