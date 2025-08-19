export class BucketEntradaMdl {

    bucketEntradaId:number;
    ctrlCreado:Date;
    ctrlCreadoPor:number;
    ctrlActualizado:Date;
    ctrlActualizadoPor:number;
    ctrlActivo:boolean;
    folioEntrada:string;
    fechaEntrada:Date;
    ccp:string;
    documentoId:any;
    documentoFisicoId:any;
    grupoOrganizacionalId:any;
    organizacionId:any;


            constructor(){

                this.bucketEntradaId= null;
                this.ctrlCreado = null;
                this.ctrlCreadoPor = null;
                this.ctrlCreado = null;
                this.ctrlCreadoPor = null;
                this.ctrlActivo = true;
                this.folioEntrada = null;
                this.fechaEntrada = null;
                this.ccp = null;
                this.documentoId = '';
                this.documentoFisicoId = '';
                this.grupoOrganizacionalId = '';
                this.organizacionId = '';

            }
}