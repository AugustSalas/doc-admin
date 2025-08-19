export class PerfilMdl {

    perfilId : number;
    ctrlCreado : Date;
    ctrlCreadoPor : number;
    ctrlActualizado : Date;
    ctrlActualizadoPor : number;
    ctrlActivo : boolean;
    nombre : string;
    descripcion : string;
    derechos : string;
   // funciones : string;


        constructor(){

            this.perfilId = null;
            this.ctrlCreado = null;
            this.ctrlCreadoPor = null;
            this.ctrlActualizado = null;
            this.ctrlActualizadoPor = null;
            this.ctrlActivo = null;
            this.nombre = null;
            this.descripcion = null;
            this.derechos = null;
         //   this.funciones = null;
        }




}

export class MenuPerfil {
    constructor() {
        this.metodo =[];
        this.ruta  =[];     
    }
    metodo: any;
    ruta: any;
}


