import { Injectable, EventEmitter, Output } from '@angular/core';

import { Daggegevens } from '../data/daggegevens-model';
import { Metadata } from '../data/metadata-model';

@Injectable()
export class KnmiRepository {
    
    dagwaarden: Daggegevens;
    maandwaarden: Daggegevens[];
    metadata:   Metadata[] = [];
    soortOverzicht: number;
    @Output() fetch: EventEmitter<Daggegevens> = new EventEmitter<Daggegevens>();
    @Output() fetchMore: EventEmitter<Daggegevens[]> = new EventEmitter<Daggegevens[]>();
    @Output() meta: EventEmitter<Metadata[]> = new EventEmitter<Metadata[]>();
  
    constructor() {}
    
    setDagwaarden(dagwaarden: Daggegevens) {
        this.dagwaarden = dagwaarden;
        this.soortOverzicht = 1;
        console.log('Dagwaarden: ' + dagwaarden);
        this.fetch.emit(dagwaarden);
    }
    
    setMaandwaarden(maandwaarden: Daggegevens[]) {
        this.maandwaarden = maandwaarden;
        console.log('Maandwaarden: ' + maandwaarden.length + ' dagwaarden');
        this.fetchMore.emit(maandwaarden);
    }
    
    setMetadata(metadata: Metadata[]) {
        if (this.metadata.length > 0) {
            this.metadata.splice(0, this.metadata.length);
        }
        this.metadata = metadata;
        console.log(metadata.length + ' elements added to metadata in repository');
        this.meta.emit(metadata);
    }

    isTempModified(dagwaarden: Daggegevens): boolean {
        var retval = false;
        retval = (retval || dagwaarden.maxTemperatuur != this.nvl(dagwaarden.maxTemperatuurGefuckt, dagwaarden.maxTemperatuur));
        retval = (retval || dagwaarden.gemTemperatuur != this.nvl(dagwaarden.gemTemperatuurGefuckt, dagwaarden.gemTemperatuur));
        retval = (retval || dagwaarden.minTemperatuur != this.nvl(dagwaarden.minTemperatuurGefuckt, dagwaarden.minTemperatuur));
        return retval;
    }    
    
    nvl(value: number, valueIfNull: number): number {
        let retval = value;
        if (retval == null) {
            retval = valueIfNull;
        }
        return retval;
    }

}