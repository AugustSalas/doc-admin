export interface DialogData {
    animal: string;
    name: string;
  }

  export interface DocumentoData {

    destinatarios: any[];    
    nombre:string;
    tipoDocumento: string[]; 
    multiple:boolean   
    remitenteDestinatario:string;        // respuesta del guardado

  }

  export interface DialogDinamicoData {
    rutaEndPoint: string;  //ruta del endpoint en el openApi
    id:string;             //id del registro en la base de datos
    ocultos: string[];      // campos para ocultar
    valorEntidad: any;    // valor asignable a la entidad
    respuesta:any;        // respuesta del guardado


  }

  export interface DialogDinamicoAdjuntos {
    id:string;             //id del registro en la base de datos
    respuesta:any;        // respuesta del guardado
    tipoDocumento:string;  //tipo documento 
    modal : any;
  }