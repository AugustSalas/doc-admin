export class BucketSalidaMdl {

    bucketSalidaId:number;
    ctrlCreado:Date;
    ctrlCreadoPor:number;
    ctrlActualizado:Date;
    ctrlActualizadoPor:number;
    ctrlActivo:boolean;
    folioEntrada:string;
    fechaEntrada:Date;
    jsonCcp:string;
    grupoOrganizacionalId:any;
    documentoId:any;
    documentoFisicoId:any;
    organizacionId:any;


            constructor(){

                this.bucketSalidaId= null;
                this.ctrlCreado = null;
                this.ctrlCreadoPor = null;
                this.ctrlCreado = null;
                this.ctrlCreadoPor = null;
                this.ctrlActivo = true;
                this.folioEntrada = null;
                this.fechaEntrada = null;
                this.jsonCcp = null;
                this.grupoOrganizacionalId = '';
                this.documentoId = '';
                this.documentoFisicoId = '';
                this.organizacionId = '';

            }
}