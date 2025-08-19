export class GrupoEnvioMdl {

    grupoEnvioId: number;
    ctrlCreado: Date;
    ctrlCreadoPor: number;
    ctrlActualizado: Date;
    ctrlActualizadoPor: number;
    ctrlActivo: boolean;
    nombre: string;
    descripcion: string;
    jsonDestinatarios: any;
    grupoOrganizacionalId: any;
    organizacionId: any;


    constructor() {
        this.grupoEnvioId = null;
        this.ctrlCreado = null;
        this.ctrlCreadoPor = null;
        this.ctrlActualizado = null;
        this.ctrlActualizadoPor = null;
        this.ctrlActivo = true;
        this.nombre = null;
        this.descripcion = null;
        this.jsonDestinatarios = null;
        this.grupoOrganizacionalId = '';
        this.organizacionId = null;
    }

}