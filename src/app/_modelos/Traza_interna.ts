import { OrganizacionMdl } from './organizacion';
//titulos

export class TrazaInternaMdl {

    trazaInternaId:number;
    ctrlCreado:Date;
    ctrlCreadoPor:number;
    ctrlActualizado:Date;
    ctrlActualizadoPor:number;
    ctrlActivo:boolean;
    agrupador:number;
    mensaje:string;
    instrucciones:any;
    observacionesCierre:any;
    documentoId:any;
    documentoFisicoId:any;
    estatusTurnoId:any;
    grupoOrganizacionalIdOrigen:any;
    grupoOrganizacionalIdDestino:any;
    organizacionIdDestino:any;
    organizacionIdOrigen:any;


            constructor(){

                this.trazaInternaId = null;
                this.ctrlCreado = new Date();
                this.ctrlCreadoPor = null;
                this.ctrlCreado = null;
                this.ctrlCreadoPor = null;
                this.ctrlActivo = true;
                this.documentoId = null;
                this.instrucciones = '';
                this.documentoFisicoId = '';
                this.estatusTurnoId = '';
                this.grupoOrganizacionalIdOrigen = '';
                this.grupoOrganizacionalIdDestino = '';
                this.organizacionIdOrigen = null;
                this.organizacionIdDestino = null;
                this.agrupador = null;
                this.mensaje = '';
                this.observacionesCierre = '';

            }
}