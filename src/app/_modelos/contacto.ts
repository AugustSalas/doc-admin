export class ContactoMdl {
    ctrlCreado:Date;
    ctrlCreadoPor:number;
    ctrlActualizado:Date;
    ctrlActualizadoPor:number;
    ctrlActivo:boolean;

    apellidoMaterno: string;
    apellidoPaterno: string;
    correoElectronico: string;
    curp: string;
    nombre: string;
    puesto: string;
    rfc: string;
    telefono: string;
    tipoContactoId: any;
    tratamientoId: any;
    dependenciaId: any;
    contactoId: any;
    grupoOrganizacional: string;
    grupoOrganizacionalId :number;
    organizacion: number;

    constructor() {

        this.apellidoMaterno = '';
        this.apellidoPaterno = '';
        this.correoElectronico = '';
        this.nombre = '';
        this.puesto = '';
        this.rfc = '';
        this.curp = '';
        this.telefono = '';
        this.curp = '';

        this.tratamientoId = null;
        this.tipoContactoId = null;
        this.dependenciaId = null;
        this.contactoId = null;
        this.dependenciaId = null;

        this.grupoOrganizacionalId = 1;
        this.organizacion = 1;

        this.ctrlCreado  = new Date();
        this.ctrlCreadoPor = 1;
        this.ctrlCreado = new Date();
        this.ctrlCreadoPor = 1;
        this.ctrlActivo = true;
        
    }
}













