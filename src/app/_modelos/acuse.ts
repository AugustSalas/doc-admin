import { DocumentoMdl } from './documento';

export class AcuseMdl {

    acuseId: number;
    ctrlCreado: Date;
    ctrlCreadoPor: number;
    ctrlActualizado: Date;
    ctrlActualizadoPor: number;
    ctrlActivo: boolean;
    nombre: string;
    descripcion: string;
    minioId: string;
    url: string;
    nombreArchivoOriginal: string;
    mime: string;
    documentoId: any;

    constructor() {

        this.acuseId = null;
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
        this.documentoId = null;
    }

}


export class AcuseDocumentoFisicoMdl {

    acuseDocumentoFisicoId: number;
    ctrlCreado: Date;
    ctrlCreadoPor: number;
    ctrlActualizado: Date;
    ctrlActualizadoPor: number;
    ctrlActivo: boolean;
    nombre: string;
    descripcion: string;
    minioId: string;
    url: string;
    nombreArchivoOriginal: string;
    mime: string;
    documentoFisicoId: any;

    constructor() {

        this.acuseDocumentoFisicoId = null;
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
        this.documentoFisicoId = null;
    }

}

export class Acuse64Mdl {
    acuse: AcuseMdl;
    base64: string;
}

export class DocumentoAnexoMdl {

    documento: DocumentoMdl;
    anexosList: Acuse64Mdl[] = [];

}

export class AcuseDocumentoFisico64Mdl {
    acuseDocumentoFisico: AcuseDocumentoFisicoMdl;
    base64: string;
}
