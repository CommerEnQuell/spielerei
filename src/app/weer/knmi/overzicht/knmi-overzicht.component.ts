import { Component, OnInit } from '@angular/core';

import { Daggegevens } from '../data/daggegevens-model';
import { KnmiRepository } from '../services/knmi.repository';
import { KnmiUtils } from '../services/knmi.utils';

@Component({
  selector: 'app-knmi-overzicht',
  templateUrl: './knmi-overzicht.component.html',
  styleUrls: ['./knmi-overzicht.component.css']
})
export class KnmiOverzichtComponent {
    soort = 'Maand';
    data = 'juni 2019';
    spec = 'Dag';
    
    constructor(private repository: KnmiRepository, private utils: KnmiUtils) {}
    
    ngOnInit() {
        console.log('Initialiseren overzicht-component');
        if (this.repository.maandwaarden != null && this.repository.maandwaarden.length > 0) {
            this.onFetchMore(this.repository.maandwaarden);
        }
        this.repository.fetchMore.subscribe({
            next: (maandwaarden: Daggegevens[]) => {
                this.onFetchMore(maandwaarden);
                console.log(maandwaarden.length + ' maand- of datumwaarden binnengekregen');
            },
            error: () => {
                console.log('Ongewenste situatie bij ophalen maandwaarden...');
                alert('Eilacy arachiboter: Query verliep niet naar behoren');
            }
        });
    }
    
    onFetchMore(maandwaarden: Daggegevens[]) {
        console.log('fetchMore-event opgevangen');
        let datum = maandwaarden[0];
        if (this.repository.soortOverzicht == 3) {
            this.soort = 'Maand';
            this.data = this.utils.maandnaam[datum.maand - 1] + ' ' + datum.jaar;
            this.spec = 'Dag';
        } else {
            this.soort = 'Datum';
            this.data = datum.dag + ' ' + this.utils.maandnaam[datum.maand - 1];
            this.spec = 'Jaar';
        }
        console.log('Soort: '+ this.soort + ' - Data: ' + this.data + ' - Spec: '+ this.spec);
        
    }
    
}
