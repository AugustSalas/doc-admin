import { DocumentoMdl } from './documento';

export class MembreteMdl {

    membreteId:number;
    ctrlCreado:Date;
    ctrlCreadoPor:number;
    ctrlActualizado:Date;
    ctrlActualizadoPor:number;
    ctrlActivo:boolean;
    nombre:string;
    descripcion:string;
    minioId:string;
    url:string;
    nombreArchivoOriginal:string;
    mime:string;


    constructor(){

        this.membreteId = null;
        this.ctrlCreado = new Date();
        this.ctrlCreadoPor = null;
        this.ctrlActualizado = new Date();
        this.ctrlActualizadoPor = null;
        this.ctrlActivo = true;
        this.nombre = null;
        this.descripcion = null;
        this.minioId = "";
        this.url = "_";
        this.nombreArchivoOriginal = null;
        this.mime = null;
    }
    
}

export class MembreteMdl64Mdl {

    membrete:MembreteMdl;
    base64:string;

    
    constructor(){

        this.membrete = new MembreteMdl() ;
        this.base64 = "";
       
    }
    

}
