export class DocPorFirmarMdl {

    documentosPorFirmarId:number;
    ctrlCreado:Date;
    ctrlCreadoPor:number;
    ctrlActualizado:Date;
    ctrlActualizadoPor:number;
    ctrlActivo:boolean;
    folioSalida:string;
    fechaSalida:Date;
    documentoId:any;
    documentoFisicoId:any;
    grupoOrganizacionalId:any;
    organizacionId:any;


            constructor()   {

                this.documentosPorFirmarId = null;
                this.ctrlCreado = null;
                this.ctrlCreadoPor = null;
                this.ctrlActualizado = null;
                this.ctrlActualizadoPor = null;
                this.ctrlActivo = null;
                this.folioSalida = null;
                this.fechaSalida = null;
                this.documentoId ='';
                this.documentoFisicoId ='';
                this.grupoOrganizacionalId =''
                this.organizacionId ='';
            }


}