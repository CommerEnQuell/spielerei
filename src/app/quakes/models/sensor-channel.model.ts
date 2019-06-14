export class SensorChannel {
	public channelCode: string;
	public pgaValue: number;
	public pgvValue: number;
	public sensorAzimuth: number;
	public sensorDip: number;
	public sensorDepth: number;
	public lowCutCorner: number;
	public highCutCorner: number;
	
	constructor(channelCode: string, pgaValue: number, pgvValue: number, sensorAzimuth: number,
				sensorDip: number, sensorDepth: number, lowCutCorner: number, highCutCorner: number) {
		this.channelCode = channelCode;
		this.pgaValue = pgaValue;
		this.pgvValue = pgvValue;
		this.sensorAzimuth = sensorAzimuth;
		this.sensorDip = sensorDip;
		this.sensorDepth = sensorDepth;
		this.lowCutCorner = lowCutCorner;
		this.highCutCorner = highCutCorner;
	}
}
