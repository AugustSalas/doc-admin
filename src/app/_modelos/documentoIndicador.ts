export class DocumentoIndicadorMdl {

    ctrlCreado: Date;
    ctrlCreadoPor: number;
    ctrlActualizado: Date;
    ctrlActualizadoPor: number;
    ctrlActivo: boolean;
    dependencia: any;
    area: any;
    preguntas: any;


    constructor() {
        this.ctrlCreado = new Date();
        this.ctrlCreadoPor = 1;
        this.ctrlActualizado = new Date();
        this.ctrlActualizadoPor = 1;
        this.ctrlActivo = true;
        this.dependencia = [];
        this.area = [];
        this.preguntas = [];

        
    }
}
