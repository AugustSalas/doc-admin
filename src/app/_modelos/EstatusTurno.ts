export class EstatusTurnoMdl {

estatusTurnoId:number;
ctrlCreado:Date;
ctrlCreadoPor:number;
ctrlActualizado:Date;
ctrlActualizadoPor:number;
ctrlActivo:boolean;
nombre:string;
descripcion:string;


    constructor(){

        this.estatusTurnoId = null;
        this.ctrlCreado = null;
        this.ctrlCreadoPor = null;
        this.ctrlActualizado = null;
        this.ctrlActualizadoPor = null;
        this.ctrlActivo = true;
        this.nombre = null;
        this.descripcion = null;

    }


}