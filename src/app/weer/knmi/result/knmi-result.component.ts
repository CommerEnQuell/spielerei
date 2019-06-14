import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CommonRepository } from '../../../common/common.repository';
import { Daggegevens } from '../data/daggegevens-model';
import { KnmiRepository } from '../services/knmi.repository';

@Component({
    selector: 'app-knmi-result',
    templateUrl: './knmi-result.component.html',
    styleUrls: ['./knmi-result.component.css']
})
export class KnmiResultComponent {
    overzicht = false;
    
    constructor(private repository: CommonRepository, private knmiRepository: KnmiRepository) {}

   ngOnInit() {
       this.knmiRepository.fetch.subscribe({
           next: () => {
               this.overzicht = false;
               console.log('Flag \'overzicht\' set to false');
           }
       });
       this.knmiRepository.fetchMore.subscribe({
           next: () => {
               this.overzicht = true;
               console.log('Flag \'overzicht\' set to true');
           }
       });
   }
}