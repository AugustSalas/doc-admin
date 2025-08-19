
export class UsuarioMdl {
    usuarioId : number;
    ctrlCreado : Date;
    ctrlCreadoPor : number;
    ctrlActualizado :Date;
    ctrlActualizadoPor :number;
    ctrlActivo :boolean;
    usuario :string;
    contrasenha :string;
    nombre :string;
    apellidoPaterno :string;
    apellidoMaterno :string;
    dependenciaId :any;
    grupoOrganizacionalId :any;
    
    


        constructor(){
            this.usuarioId = null;
            this.ctrlCreado = null;
            this.ctrlCreadoPor = null;
            this.ctrlActualizado = null;
            this.ctrlActualizadoPor = null;
            this.ctrlActivo = true;
            this.usuario = null;
            this.contrasenha = null;
            this.nombre = null;
            this.apellidoPaterno = null;
            this.apellidoMaterno = null;
            this.dependenciaId = null;
            this.grupoOrganizacionalId = null;
            
        }
}