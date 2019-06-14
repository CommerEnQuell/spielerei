import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Metadata } from '../data/metadata-model';
import { KnmiRepository } from '../services/knmi.repository';
import { KnmiService } from '../services/knmi.service';

@Component({
  selector: 'app-knmi-query',
  templateUrl: './knmi-query.component.html',
  styleUrls: ['./knmi-query.component.css']
})
export class KnmiQueryComponent implements OnInit {
    queryUrl = 'http://localhost:1854/v1/api/knmi/';
    station: number;
    dag: number;
    maand: number;
    jaar: number;
    metadata: Metadata[];
    
    weerForm = new FormGroup({
        'station': new FormControl(this.station, Validators.required),
        'dag': new FormControl(this.dag, Validators.required),
        'maand': new FormControl(this.maand, Validators.required),
        'jaar': new FormControl(this.jaar, [Validators.required, Validators.min(1901), Validators.max(2099)])      
    });
      
    constructor(private knmiService: KnmiService, private repository: KnmiRepository) {
    }
    
    ngOnInit() {
        this.repository.meta.subscribe({
            next: (metadata: Metadata[]) => {
                this.onMeta(metadata);
            }
        });
        this.knmiService.getMetadata();
    }
 
    onSubmit() {
        console.log('Submission is still under construction. Just wait, laddie...');
        this.station = this.weerForm.get('station').value;
        if (!this.weerForm.get('dag').pristine) {
            this.dag = this.weerForm.get('dag').value;
        }
        if (!this.weerForm.get('maand').pristine) {
            this.maand = this.weerForm.get('maand').value;
        }
        if (!this.weerForm.get('jaar').pristine) {
            this.jaar = this.weerForm.get('jaar').value;
        }
        // Dag met 1 vermenigvuldigen, anders wordt deze als alfa beschouwd,
        // ook al is dag als number gedefinieerd.
        let numDatum =  (1 * this.dag) + (100 * this.maand) + (10000 * this.jaar);
        console.log('Dag: ' + this.dag + ', Maand: ' + this.maand + ', Jaar: ' + this.jaar + '. Query for '+ numDatum + '.');
        if (this.knmiService.isValid(this.station, this.dag, this.maand, this.jaar)) {
            if (this.dag > 0 && this.jaar > 0) {
                this.knmiService.getDaggegevens(this.station, numDatum);
            } else if (this.dag > 0) {
                this.knmiService.getMaandOfDatumgegevens(this.station, this.maand, this.dag);
            } else if (this.jaar > 0) {
                this.knmiService.getMaandOfDatumgegevens(this.station, this.maand, this.jaar);
            }
        } else {
            alert('Datum ongeldig');
        }
    }
    
    onMeta(metadata: Metadata[]) {
        console.log('onMeta invoked passing '+ metadata.length + ' metadata');
        for (let i = 0; i < metadata.length; i++) {
            console.log(this.metaToString(metadata[i]));
        }
        this.metadata = metadata;
        console.log('Metadata for combobox: ' + this.metadata.length);
     }
    
    metaToString(metadata: Metadata) {
        let retval = metadata.naam + ' (van ';
        retval = retval + this.datumToString(metadata.datumVan);
        retval = retval + ' t/m ' + this.datumToString(metadata.datumTot) + ')';
        
        return retval;
    }
    
    datumToString(datumYYMD: number) {
        let datumStr = '' + datumYYMD;
        let retval = datumStr.slice(6, 8) + '.' + datumStr.slice(4,6) + '.' +
                     datumStr.slice(0, 4);

        return retval;
        
    }

}
