export class Metadata {
    public station:       number;
    public naam:          string;
    public datumVan:      number;
    public datumTot:      number;

    constructor (
        station:   number,
        naam:      string,
        datumVan:  number,
        datumTot:  number
    ) {
        this.station  = station;
        this.naam     = naam;
        this.datumVan = datumVan;
        this.datumTot = datumTot;
    }
}