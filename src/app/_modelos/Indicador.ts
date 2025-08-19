export class IndicadorMdl{

    indicadorId:number;
    ctrlCreado: Date;
    ctrlCreadoPor: number;
    ctrlActualizado: Date;
    ctrlActualizadoPor: number;
    ctrlActivo: boolean;
    nombre:string;
    descripcion:string;
    grupoOrganizacionalId:any;
    organizacionId:any;


        constructor(){

            this.indicadorId = null;
            this.ctrlCreado = null;
            this.ctrlCreadoPor = null;
            this.ctrlActualizado = null;
            this.ctrlActualizadoPor = null;
            this.ctrlActivo = true;
            this.nombre = null;
            this.descripcion = null;
            this.grupoOrganizacionalId ='';
            this.organizacionId = '';
        }
}