export class DocumentoIndicadorMdl {

    indicadorDocumentoId: any;
    ctrlCreado: Date;
    ctrlCreadoPor: number;
    ctrlActualizado: Date;
    ctrlActualizadoPor: number;
    ctrlActivo: boolean;
    documentoId: any;
    documentoFisicoId: any;
    indicadorId: any;
    indicador: boolean;

    constructor() {
        this.indicadorDocumentoId =null;
        this.ctrlCreado = new Date();
        this.ctrlCreadoPor = 1;
        this.ctrlActualizado = new Date();
        this.ctrlActualizadoPor = 1;
        this.ctrlActivo = true;
        this.documentoId =null;
        this.documentoFisicoId =null;
        this.indicadorId =null;
        this.indicador = false;
    }
}
