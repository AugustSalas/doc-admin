export class ActorMdl {

    actorId: number;
    ctrlCreado: Date;
    ctrlCreadoPor: number;
    ctrlActualizado: Date;
    ctrlActualizadoPor: number;
    ctrlActivo: boolean;
    nombre: string;
    apellidoPaterno: string;
    funciones: string;
    apellidoMaterno: string;
    telefono: string;
    correoElectronico: string;
    interino: boolean;
    usuarioId: any;
    tipoActorId: any;
    tratamientoId: any;

    constructor() {

        this.actorId = null;
        this.ctrlCreado = null;
        this.ctrlCreadoPor = null;
        this.ctrlActualizado = null;
        this.ctrlActualizadoPor = null;
        this.ctrlActivo = true;
        this.nombre = null;
        this.apellidoPaterno = null;
        this.apellidoMaterno = null;
        this.telefono = null;
        this.correoElectronico = null;
        this.interino = null;
        this.usuarioId = '';
        this.tipoActorId = '';
        this.tratamientoId = '';
        this.funciones = '[]';


    }
}

export class FuncionesMdl {

    base: any[];
    adicionales: any[];

    constructor() {
        this.base = [];
        this.adicionales = [];
    }
}

export class ActorFuncionesMdl {

    grupo_organizacional_id: string;
    organizacion_id: string;

    constructor() {
        this.grupo_organizacional_id = "";
        this.organizacion_id = "";
    }
}