import { Injectable } from '@angular/core';

@Injectable()
export class KnmiUtils {
    weekdag: string[] =
        ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag',
         'vrijdag', 'zaterdag'];
    maandnaam: string[] = 
        ['januari', 'februari', 'maart', 'april', 'mei', 'juni',
         'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
    windstreek: string[] =
        ['N', 'NNO', 'NO', 'ONO', 'O', 'OZO', 'ZO', 'ZZO',
         'Z', 'ZZW', 'ZW', 'WZW', 'W', 'WNW', 'NW', 'NNW'];

    
    constructor() {}
    
    
    datumStr(julDatum:number, dag: number, maand: number, jaar:  number) {
        let idx = (julDatum + 1) % 7;
        console.log('Jul. Datum = ' + julDatum + ', Index = ' + idx);
        let retval = this.weekdag[idx] + ' '
                   + dag + ' '
                   + this.maandnaam[maand - 1] + ' '
                   + jaar;
        return retval;
    }
    
    windrichting(richting: number) {
        let retval = '';
        if (richting == 0) {
            retval = 'var';
        } else {
            var richting = richting % 360;
            var workNum = 2 * (richting + 11) / 45;
            let idx = parseInt(''+ workNum) % 16;
            retval = richting + '° (' + this.windstreek[idx] + ')';
        }
        return retval;
    }
    
    neerslagsom(value: number) {
        let retval = '' + value;
        if (value < 0) {
            retval = '<0.05';
        }
        return retval;
    }
    
    isTempModified(tempGemeten: number, tempGefuckt: number) {
        if (tempGefuckt == null || tempGefuckt == tempGemeten) {
            return false;
        }
        return true;
    }

}