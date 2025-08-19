import { DocumentoMdl } from './documento';

export class AnexoMdl {

    anexoId: number;
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

        this.anexoId = null;
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


export class AnexoDocumentoFisicoMdl {

    anexoDocumentoFisicoId: number;
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

        this.anexoDocumentoFisicoId = null;
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


export class Anexo64Mdl {

    anexo: AnexoMdl;
    base64: string;

}


export class DocumentoAnexoMdl {

    documento: DocumentoMdl;
    anexosList: Anexo64Mdl[] = [];

}

export class AnexoDocumentoFisico64Mdl {
    anexoDocumentoFisico: AnexoDocumentoFisicoMdl;
    base64: string;
}
