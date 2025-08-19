export class IUsuarioPerfilMdl{

    iusuarioPerfilId:number;
    ctrlCreado:Date;
    ctrlCreadoPor:number;
    ctrlActualizado:Date;
    ctrlActualizadoPor:number;
    ctrlActivo:boolean;
    perfilId:any;
    usuarioId:any;

        constructor(){
            this.iusuarioPerfilId = null;
            this.ctrlCreado = null;
            this.ctrlCreadoPor = null;
            this.ctrlActualizado = null;
            this.ctrlActualizadoPor = null;
            this.ctrlActivo = true;
            this.perfilId = null;
            this.usuarioId = '';
        }
}