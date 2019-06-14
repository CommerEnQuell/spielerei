export class Daggegevens {
    public station:                number;
    public jaar:                   number;
    public maand:                  number;
    public dag:                    number;
    public julDatum:               number;
    public windrichting:           number;
    public gemWindsnelheid:        number;
    public maxWindsnelheid:        number;
    public maxWindsnelheidUur:     number;
    public minWindsnelheid:        number;
    public minWindsnelheidUur:     number;
    public maxWindstoot:           number;
    public maxWindstootUur:        number;
    public gemTemperatuur:         number;
    public gemTemperatuurGefuckt:  number;
    public minTemperatuur:         number;
    public minTemperatuurGefuckt:  number;
    public minTemperatuurUur:      number;
    public maxTemperatuur:         number;
    public maxTemperatuurGefuckt:  number;
    public maxTemperatuurUur:      number;
    public minGrondTemperatuur:    number;
    public minGrondTemperatuurUur: number;
    public duurZon:                number;
    public percZon:                number;
    public straling:               number;
    public duurNeerslag:           number;
    public somNeerslag:            number;
    public maxUursomNeerslag:      number;
    public uurMaxNeerslag:         number;
    public gemLuchtdrukZeeniveau:  number;
    public maxLuchtdrukZeeniveau:  number;
    public maxLuchtdrukUur:        number;
    public minLuchtdrukZeeniveau:  number;
    public minLuchtdrukUur:        number;
    public minZicht:               string;
    public minZichtUur:            number;
    public maxZicht:               string;
    public maxZichtUur:            number;
    public bewolking:              number;
    public gemRelVocht:            number;
    public maxRelVocht:            number;
    public maxRelVochtUur:         number;
    public minRelVocht:            number;
    public minRelVochtUur:         number;
 
    constructor(
        station:                number,
        jaar:                   number,
        maand:                  number,
        dag:                    number,
        julDatum:               number,
        windrichting:           number,
        gemWindsnelheid:        number,
        maxWindsnelheid:        number,
        maxWindsnelheidUur:     number,
        minWindsnelheid:        number,
        minWindsnelheidUur:     number,
        maxWindstoot:           number,
        maxWindstootUur:        number,
        gemTemperatuur:         number,
        gemTemperatuurGefuckt:  number,
        minTemperatuur:         number,
        minTemperatuurGefuckt:  number,
        minTemperatuurUur:      number,
        maxTemperatuur:         number,
        maxTemperatuurGefuckt:  number,
        maxTemperatuurUur:      number,
        minGrondTemperatuur:    number,
        minGrondTemperatuurUur: number,
        duurZon:                number,
        percZon:                number,
        straling:               number,
        duurNeerslag:           number,
        somNeerslag:            number,
        maxUursomNeerslag:      number,
        uurMaxNeerslag:         number,
        gemLuchtdrukZeeniveau:  number,
        maxLuchtdrukZeeniveau:  number,
        maxLuchtdrukUur:        number,
        minLuchtdrukZeeniveau:  number,
        minLuchtdrukUur:        number,
        minZicht:               string,
        minZichtUur:            number,
        maxZicht:               string,
        maxZichtUur:            number,
        bewolking:              number,
        gemRelVocht:            number,
        maxRelVocht:            number,
        maxRelVochtUur:         number,
        minRelVocht:            number,
        minRelVochtUur:         number
    ) {
        this.station                = station;
        this.jaar                   = jaar;
        this.maand                  = maand;
        this.dag                    = dag;
        this.julDatum               = julDatum;
        this.windrichting           = windrichting;
        this.gemWindsnelheid        = gemWindsnelheid;
        this.maxWindsnelheid        = maxWindsnelheid;
        this.maxWindsnelheidUur     = maxWindsnelheidUur;
        this.minWindsnelheid        = minWindsnelheid;
        this.minWindsnelheidUur     = minWindsnelheidUur;
        this.maxWindstoot           = maxWindstoot;
        this.maxWindstootUur        = maxWindstootUur;
        this.gemTemperatuur         = gemTemperatuur;
        this.gemTemperatuurGefuckt  = gemTemperatuurGefuckt;
        this.minTemperatuur         = minTemperatuur;
        this.minTemperatuurGefuckt  = minTemperatuurGefuckt;
        this.minTemperatuurUur      = minTemperatuurUur;
        this.maxTemperatuur         = maxTemperatuur;
        this.maxTemperatuurGefuckt  = maxTemperatuurGefuckt;
        this.maxTemperatuurUur      = maxTemperatuurUur;
        this.minGrondTemperatuur    = minGrondTemperatuur;
        this.minGrondTemperatuurUur = minGrondTemperatuurUur;
        this.duurZon                = duurZon;
        this.percZon                = percZon;
        this.straling               = straling;
        this.duurNeerslag           = duurNeerslag;
        this.somNeerslag            = somNeerslag;
        this.maxUursomNeerslag      = maxUursomNeerslag;
        this.uurMaxNeerslag         = uurMaxNeerslag;
        this.gemLuchtdrukZeeniveau  = gemLuchtdrukZeeniveau;
        this.maxLuchtdrukZeeniveau  = maxLuchtdrukZeeniveau;
        this.maxLuchtdrukUur        = maxLuchtdrukUur;
        this.minLuchtdrukZeeniveau  = minLuchtdrukZeeniveau;
        this.minLuchtdrukUur        = minLuchtdrukUur;
        this.minZicht               = minZicht;
        this.minZichtUur            = minZichtUur;
        this.maxZicht               = maxZicht;
        this.maxZichtUur            = maxZichtUur;
        this.bewolking              = bewolking;
        this.gemRelVocht            = gemRelVocht;
        this.maxRelVocht            = maxRelVocht;
        this.maxRelVochtUur         = maxRelVochtUur;
        this.minRelVocht            = minRelVocht;
        this.minRelVochtUur         = minRelVochtUur;
    }
    
}