import { DocumentoMdl } from './documento';

export class GrupoOrganizacionalMdl {

    grupoOrganizacionalId:number;
    ctrlCreado:Date;
    ctrlCreadoPor:number;
    ctrlActualizado:Date;
    ctrlActualizadoPor:number;
    ctrlActivo:boolean;
    nombre:string;
    descripcion:string;
    dependenciaId:any;
    folioEntradaGrupoOrganizacional:number;
    folioSalidaGrupoOrganizacional:number;
    grupoOrganizacionalPadre:any;
    membrete:any;
    puesto:string;
    jsonNotificaciones:any;
    titularGrupoOrganizacional:any;
    prefijo:string;
    piePaginaDocumentoFisico:any;

    constructor(){

        this.grupoOrganizacionalId = null;
        this.ctrlCreado = new Date();
        this.ctrlCreadoPor = null;
        this.ctrlActualizado = new Date();
        this.ctrlActualizadoPor = null;
        this.ctrlActivo = true;
        this.nombre = null;
        this.descripcion = null;
        this.dependenciaId = null;
        this.folioEntradaGrupoOrganizacional = 0;
        this.folioSalidaGrupoOrganizacional = 0;
        this.grupoOrganizacionalPadre = null;
        this.membrete = null;
        this.puesto = null;
        this.jsonNotificaciones = null;
        this.titularGrupoOrganizacional = '';
        this.prefijo ="";
        this.piePaginaDocumentoFisico = null;
    }
    
}

export class GrupoOrganizacionalMembreteMdl {
    grupoOrganizacional:GrupoOrganizacionalMdl;
    base64:string;  
    
}


