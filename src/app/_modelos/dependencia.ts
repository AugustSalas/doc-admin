export class DependenciaMdl{


    dependenciaId:number;
    ctrlCreado:Date;
    ctrlCreadoPor:number;
    ctrlActualizado:Date;
    ctrlActualizadoPor:number;
    ctrlActivo:boolean;
    nombre:string;
    descripcion:string;
    prefijo:string
    anho:number;
    separador:string;

        constructor() {

            this.dependenciaId = null;         
            this.ctrlCreado = null;
            this.ctrlCreadoPor = null;
            this.ctrlActualizado = null;
            this.ctrlActualizadoPor = null;
            this.ctrlActivo = true;
            this.nombre = null;
            this.descripcion = null;
            this.prefijo = null;
            this.anho = null;
            this.separador = null;
        }
}