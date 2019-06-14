import { Component, OnInit, AfterContentChecked, DoCheck } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CommonRepository } from '../../../common/common.repository';
import { Daggegevens } from '../data/daggegevens-model';
import { KnmiRepository } from '../services/knmi.repository';
import { KnmiUtils } from '../services/knmi.utils';

@Component({
    selector: 'app-knmi-dag',
    templateUrl: './knmi-daggegevens.component.html',
    styleUrls: ['./knmi-daggegevens.component.css']
})
export class KnmiDaggegevensComponent implements OnInit, AfterContentChecked, DoCheck {
    daggegevens: Daggegevens;
    modified: boolean;
    maxModified: boolean;
    gemModified: boolean;
    minModified: boolean;
    initial = true;
 
    constructor(private httpClient: HttpClient, private repository: CommonRepository,
                private knmiRepository: KnmiRepository, private utils: KnmiUtils) {
    }

    ngOnInit() {
        console.log('Initializing KnmiComponent');
        this.initDaggegevens(this.knmiRepository.dagwaarden);
        let paramName = this.repository.currentParam;
        this.repository.imgNotifier.subscribe({
            next: () => {
                this.initial = true;
                this.setParamName('');
            }
        });

        this.knmiRepository.fetch.subscribe({
            next: (dagwaarden: Daggegevens) => {
                let portrait = document.getElementById("portrait");
                let deDagwaarden = dagwaarden;
                if (portrait instanceof HTMLImageElement) {
                    this.onFetch(deDagwaarden);
                } else {
                    setTimeout(() => {
                        this.onFetch(deDagwaarden);
                    }, 500);
                }
            },
            error: () => {
                console.log('Dit ging ronduit klote');
            }
        });
    }
    
    ngAfterContentChecked() {
        console.log('After content checked');
    }
    
    ngDoCheck() {
        console.log('Doing the Check...');
    }
    
    setParamName(paramName: string) {
        let oldElem = document.getElementById("portrait");
        console.log('Old element: ' + oldElem);
        if (oldElem instanceof HTMLImageElement) {
            let oldImageElem = <HTMLImageElement> oldElem;
            let newElem: HTMLImageElement = null;
//            if (this.initial) {
//                newElem = this.repository.imgKnmi;
//            } else {
                if (paramName == 'Chris') {
                    newElem = this.repository.imgChris;
                } else if (paramName == 'Gretel') {
                    newElem = this.repository.imgGretel;
                } else {
                    newElem = this.repository.imgKnmi;
                }
//            }
            console.log('New element: ' + newElem);
            oldImageElem.src = newElem.src;
            this.repository.currentParam = paramName;
            this.initial = false;
            console.log('Param name set to "' + paramName + '", Daggegevens: ' + this.daggegevens);
        } else {
            console.log('Could not set the source of the image element somehow...');
        }
    }
    
    onFetch(dagwaarden: Daggegevens) {
        console.log('onFetch aangeroepen: ' + dagwaarden);
        this.initDaggegevens(dagwaarden);
        let paramName = 'Chris';
        if (this.modified) {
            paramName = 'Gretel';
        }
        this.setParamName(paramName);
     }
    
    initDaggegevens(dagwaarden: Daggegevens) {
        if (dagwaarden == null) {
            return;
        }
        this.daggegevens = dagwaarden;
        this.modified = this.knmiRepository.isTempModified(dagwaarden);
        this.maxModified = this.utils.isTempModified(dagwaarden.maxTemperatuur, dagwaarden.maxTemperatuurGefuckt);
        this.gemModified = this.utils.isTempModified(dagwaarden.gemTemperatuur, dagwaarden.gemTemperatuurGefuckt);
        this.minModified = this.utils.isTempModified(dagwaarden.minTemperatuur, dagwaarden.minTemperatuurGefuckt);
    }
}