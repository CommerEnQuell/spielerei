import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
      today: Date = new Date();
      latText: string = '';
      latitude: string = '';
      longText: string = '';
      longitude: string = '';

  constructor() {
      this.today = new Date();
  }

  ngOnInit() {
      console.log('Today is ' + this.today);
      setTimeout(() => {
         this.latText = document.getElementById('latText').innerHTML;
         this.latitude = document.getElementById('latitude').innerHTML;
         this.longText = document.getElementById('longText').innerHTML;
         this.longitude = document.getElementById('longitude').innerHTML;
         console.log('Location fetched after 5 seconds: ' +
                 this.latText + ' ' + this.latitude + ', ' + this.longText + ' ' + this.longitude);
      }, 5000);
  }
  
  doUpdate() {
      this.today.setTime(Date.now());
  }
}
