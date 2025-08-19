import { DocumentoMdl } from './documento';

export class PiePaginaDocumentoFisicoMdl {

    piePaginaDocumentoFisicoId:number;
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

        this.piePaginaDocumentoFisicoId = null;
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


export class MembretePieMdl64Mdl {

    membrete:PiePaginaDocumentoFisicoMdl;
    base64:string;

    
    constructor(){
        this.membrete = new PiePaginaDocumentoFisicoMdl() ;
        this.base64 = "";
      
    }
    

}
