export class TrazaExternaMdl {

    trazaExternaId: Number;
    ctrlCreado: Date;
    ctrlCreadoPor:Number;
    ctrlActualizado:Date;
    ctrlActualizadoPor:Number;
    ctrlActivo:boolean;
    agrupador:Number;
    documentoId:any;
    documentoOrigenId:any;
    
    
        constructor(){

            this.trazaExternaId = null;
            this.ctrlCreado = null;
            this.ctrlCreadoPor = null;
            this.ctrlActualizado = null;
            this.ctrlActualizadoPor = null;
            this.ctrlActivo = true;
            this.agrupador = null;
            this.documentoId = '';
            this.documentoOrigenId = '';

        }
}