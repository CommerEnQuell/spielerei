import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';

import { CommonRepository } from '../common/common.repository';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
      trigger('theState', [state('initial', style({
          color: 'red',
          opacity: 0,
          transform: 'translateX(400px)'
      })), state('loaded', style({
          color: 'black',
          opacity: 1,
          transform: 'translateX(0)'
         
      })), 
      transition('void => *', [
            animate(8000, keyframes([
                style({
                    color: 'red',
                    opacity: 0,
                    transform: 'translateX(400px)',
                    offset: 0
                }),
                style({
                    opacity: 0.4,
                    offset: 0.28
                }),
                style({
                    color: 'orange',
                    opacity: 0.5,
                    transform: 'translateX(320px)',
                    offset: 0.4
                }),
                style({
                    color: 'yellow',
                    opacity: 0.6,
                    transform: 'translateX(240px)',
                    offset: 0.52
                }),
                style({
                    color: 'green',
                    opacity: 0.7,
                    transform: 'translateX(160px)',
                    offset: 0.64
                }),
                style({
                    color: 'blue',
                    opacity: 0.8,
                    transform: 'translateX(80px)',
                    offset: 0.76
                 }),
                 style({
                    color: 'purple',
                    opacity: 0.9,
                    transform: 'translateX(0)',
                    offset: 0.88
                 }),
                 style({
                    color: 'black',
                    opacity: 1,
                    offset: 1
                   })]
          ),)
  ],
),
],)]})
export class HomeComponent implements OnInit {

  constructor(repository: CommonRepository) { }

  ngOnInit() {
  }

}
