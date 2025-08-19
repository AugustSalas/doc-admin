export class OrganizacionMdl {

    organizacionId:number;
    ctrlCreado: Date;
    ctrlCreadoPor:number;
    ctrlActualizado:Date;
    ctrlActualizadoPor:number;
    ctrlActivo:boolean;
    nombre:string;
    descripcion:string;
    prefijo:string;
    folioEntradaOrganizacion:number;
    folioSalidaOrganizacion:number;
    puesto:string;
    jsonNotificaciones:any;
    titularOrganizacion:any;
    membrete:any;
    grupoOrganizacionalId:any;
    organizacionIdPadre:any;

            constructor(){


                this.organizacionId = null;
                this.ctrlCreado = null;
                this.ctrlCreadoPor = null;
                this.ctrlActualizado = null;
                this.ctrlActualizadoPor = null;
                this.ctrlActivo = true;
                this.nombre = null;
                this.descripcion = null;
                this.prefijo = null;
                this.folioEntradaOrganizacion = 0;
                this.folioSalidaOrganizacion = 0;
                this.puesto = null;
                this.jsonNotificaciones = null;
                this.grupoOrganizacionalId ='';
                this.organizacionIdPadre ='';
                this.titularOrganizacion = '';
                this.membrete = 1;


            }


}