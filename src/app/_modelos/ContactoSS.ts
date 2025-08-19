export class ContactoSMdl {

    contactoId:number;
    ctrlCreado:Date;
    ctrlCreadoPor:number;
    ctrlActualizado:Date;
    ctrlActualizadoPor:number;
    ctrlActivo:boolean;
    nombre: string;
    apellidoMaterno: string;
    apellidoPaterno: string;
    telefono: string;
    correoElectronico: string;
    rfc: string;
    curp: string;
    puesto: string;
    dependencia:string;
    grupoOrganizacional:string;
    organizacion:string;
    dependenciaId:any;
    grupoOrganizacionalId:any;
    tipoContactoId:any;
    tratamientoId:any;
   
  
   

    constructor() {

        this.contactoId = null;
        this.ctrlCreado  = new Date();
        this.ctrlCreadoPor = 1;
        this.ctrlCreado = new Date();
        this.ctrlCreadoPor = 1;
        this.ctrlActivo = true;
        this.nombre = '';
        this.apellidoMaterno = '';
        this.apellidoPaterno = '';
        this.telefono = '';
        this.correoElectronico = '';
        this.rfc = '';
        this.curp = '';
        this.puesto = '';
        this.dependencia ='';
        this.grupoOrganizacional = '';
        this.organizacion = '';
        this.dependenciaId = null;
        this.grupoOrganizacionalId = null;
        this.tipoContactoId = null;
        this.tratamientoId = null;
        
    }
}













