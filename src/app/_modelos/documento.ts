import { AnexoDocumentoFisico64Mdl } from './anexo'

export class DocumentoDestinatarioActorModel {

    destinatario_id: number
    nombre_destinatario: string
    organizacion_destinatario_id: number
    organizacion_destinatario: string
    puesto_destinatario: string
    grupo_organizacional_destinatario_id: number
    grupo_organizacional_destinatario: string

}

export class DocumentoDestinatarioContactoModel {

    contacto_id: number
    nombre_destinatario: string
    organizacion_destinatario: string
    puesto_destinatario: string
    documento_id: number

}

export class DocumentoChipModel {

    tipo: string
    color: string
    entidad: any
    nombre: string
    leyenda: any

}

export class DocumentoBusquedaOrganizacion {

    grupoOrganizacionalId: any
    dependenciaId: any
    stringBusqueda: string

}

export class DocumentoJsonDestinatario {

    actor: any[];
    contacto: any[];
    grupo: any[];

}
export class DocumentoMdl {
    documentoId: any
    remitenteId: number
    documentoRelacionadoId: any
    estatusDocumentoId: any
    grupoOrganizacionalRemitenteId: any
    organizacionRemitenteId: any
    prioridadId: any
    tipoDocumentoId: any
    tipoPrivacidadId: any
    requiereRespuesta: boolean
    // electronico: boolean
    nombreRemitente: any
    organizacionRemitente: any
    puestoRemitente: any
    grupoOrganizacionalRemitente: any
    jsonDestinatario: string
    asunto: string
    contenido: string
    jsonCcp: string
    fechaEmision: Date;
    cadenaFolio: any
    instrucciones: string
    fechaLimiteRespuesta: string
    fechaAtencion: string
    jsonTrazaExterna: string
    jsonTrazaInterna: string
    ctrlCreado: Date
    ctrlActualizado: Date
    firmado: boolean;
    ctrlCreadoPor: number;
    ctrlActualizadoPor: number
    fechaRecepcion: Date;

    constructor() {
        this.documentoId = null
        this.remitenteId = 1;
        this.documentoRelacionadoId = null
        this.estatusDocumentoId = 1;
        this.grupoOrganizacionalRemitenteId = null
        this.organizacionRemitenteId = null
        this.prioridadId = null
        this.tipoDocumentoId = null;
        this.tipoPrivacidadId = null
        this.requiereRespuesta = false;
        //   this.electronico=true;
        this.nombreRemitente = null
        this.organizacionRemitente = null
        this.puestoRemitente = null;
        this.grupoOrganizacionalRemitente = null;
        this.jsonDestinatario = "[]";
        this.asunto = "";
        this.contenido = "";
        this.jsonCcp = "";
        this.fechaEmision = new Date();
        this.fechaRecepcion = new Date();
        this.cadenaFolio = null;
        this.instrucciones = "";
        this.fechaLimiteRespuesta = "";
        this.fechaAtencion = "";
        this.jsonTrazaExterna = "";
        this.jsonTrazaInterna = "";
        this.ctrlCreado = new Date();
        this.ctrlActualizado = new Date();
        this.firmado = false;
    }
}


export class DocumentoFisicoReporteMdl {
    listadoDocumentos: any[]
    fechaInicial: any;
    fechaFinal: any;

    constructor(listadoDocumentos, fechaInicial, fechaFinal) {
        this.listadoDocumentos = listadoDocumentos
        this.fechaInicial = fechaInicial
        this.fechaFinal = fechaFinal

    }
}

export class DocumentoFisicoTrazaReporteMdl {
    listadotraza: any[]
    fechaInicial: any;
    fechaFinal: any;

    constructor(listadoDocumentos, fechaInicial, fechaFinal) {
        this.listadotraza = listadoDocumentos
        this.fechaInicial = fechaInicial
        this.fechaFinal = fechaFinal

    }
}


export class DocumentoFisicoMdl {

    documentoFisicoId: number;
    ctrlCreadoPor: number;
    ctrlActualizadoPor: number;
    ctrlCreado: Date
    ctrlActualizado: Date
    ctrlActivo: boolean;
    asunto: string
    contenido: string
    jsonCcp: string
    fechaEmision: Date;
    fechaDocumentoOriginal: Date;
    cadenaFolio: any
    instrucciones: string
    fechaLimiteRespuesta: Date;
    fechaAtencion: Date;
    requiereRespuesta: boolean
    entradaSalida: string
    jsonDestinatarioRemitente: string
    numeroDocumentoOriginal: string
    remitenteDestinatarioId: any
    estatusDocumentoId: any
    prioridadId: any
    tipoDocumentoId: any
    tipoPrivacidadId: any
    viaRecepcion: string
    documentoFisicoRelacionadoId: any
    fechaRecepcion: Date;
    grupoOrganizacionalCreadorId: any
    organizacionCreadorId: any
    elaboradoPor: string;
    observacionesCierre:string;
    salidaPersonalizado: boolean;
    configuraciones: string;
    organizacionDestinoId: any
    
    constructor() {

        this.documentoFisicoId = null
        this.ctrlCreado = new Date();
        this.ctrlCreadoPor = null
        this.ctrlActualizadoPor = null
        this.ctrlActualizado = new Date();
        this.ctrlActivo = true;
        this.asunto = null;
        this.contenido = null;
        this.jsonCcp = "[]";
        this.fechaEmision = new Date();
        this.fechaDocumentoOriginal = new Date();
        this.cadenaFolio = null;
        this.instrucciones = "";
        this.fechaLimiteRespuesta = new Date();
        this.fechaRecepcion = new Date();
        this.fechaAtencion = new Date();
        this.requiereRespuesta = false;
        this.entradaSalida = "S";
        this.jsonDestinatarioRemitente = "[]";
        this.remitenteDestinatarioId = null;
        this.estatusDocumentoId = 1;
        this.prioridadId = null
        this.tipoDocumentoId = null;
        this.tipoPrivacidadId = null;
        this.documentoFisicoRelacionadoId = null;
        this.numeroDocumentoOriginal = "";
        this.viaRecepcion = "Entrega fisica";
        this.grupoOrganizacionalCreadorId = null;
        this.organizacionCreadorId = null;
        this.elaboradoPor = "";
        this.observacionesCierre = "";
        this.salidaPersonalizado = false;
        this.configuraciones = "[]";
        this.organizacionDestinoId = null;

    }
}


export class DocumentoFisicoOriginalMdl {

    documentoFisicoOriginalId: number;
    ctrlCreado: Date;
    ctrlCreadoPor: number;
    ctrlActualizado: Date;
    ctrlActualizadoPor: number;
    ctrlActivo: boolean;
    nombre: string;
    descripcion: string;
    minioId: string;
    url: string;
    nombreArchivoOriginal: string;
    mime: string;
    documentoFisicoId: any;

    constructor() {

        this.documentoFisicoOriginalId = null;
        this.ctrlCreado = new Date();
        this.ctrlCreadoPor = null;
        this.ctrlActualizado = new Date();
        this.ctrlActualizadoPor = null;
        this.ctrlActivo = true;
        this.nombre = null;
        this.descripcion = null;
        this.minioId = "";
        this.url = "_";
        this.nombreArchivoOriginal = null;
        this.mime = null;
        this.documentoFisicoId = null;

    }

}

export class DocumentoFisicoOriginal64Mdl {
    anexo: DocumentoFisicoOriginalMdl;
    base64: string;

    constructor() {

        this.anexo = null;
        this.base64 = "";

    }
}

export class DocumentoFisico64Mdl {
    documentoFisico: DocumentoFisicoMdl;
    documentoFisicoOriginal: DocumentoFisicoOriginal64Mdl;
    anexosList: AnexoDocumentoFisico64Mdl[] = [];
}