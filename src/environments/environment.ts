// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  /**** TEST ****/
 apiURL: "http://10.1.40.149:8080/SiagedREST-web",

  /*** TEST QA***/
  //apiURL: "http://201.147.64.60:8080/SiagedREST-web",
  //apiURL: "http://gevtestqaapp.veracruz.gob.mx:8080/SiagedREST-web",

  /*** PRODUCCIÓN ***/
 // apiURL:"http://201.147.64.142:8080/SiagedREST-web",
  //apiURL:"http://gevdesapp.veracruz.gob.mx:8080/SiagedREST-web/",


  //apiURL:"http://10.1.60.129:8080/SiagedREST-web",
  //apiURL: "http://127.0.0.1:8080/SiagedREST-web",
 
  //apiURLSeguro: "http://201.147.64.60:8080/SiagedREST-web",
  //apiURLSeguro: "http:201.147.64.142:8080/Agenda2030JavaRest-web/webresources",

  openApiFiltro: [
    "actor",
    "contacto",
    "dependencia",
    "direcciondependencia",
    "estado",
    "estatusdocumento",
    "estatusturno",
    "grupoenvio",
    "localidad",
    "mensajespreestablecidos",
    "municipio",
    "perfil",
    "prioridad",
    "tipoactor",
    "tipoasentamiento",
    "tipocontacto",
    "tipodocumento",
    "tipoprivacidad",
    "tipovialidad",
    "tratamiento",
    "usuario",
    "indicador",
   
  ],

  openApiFiltroPermisos: [
    "actor",
    "anexo",
    "bucketentrada",
    "bucketsalida",
    "contacto",
    "dependencia",
    "direcciondependencia",
    "documentoescaneado",
    "documento",
    "documentofisico",
    "documentofisicooriginal",
    "documentosporfirmar",
    "estado",
    "estatusdocumento",
    "estatusturno",
    "grupoenvio",
    "grupoenvioorganizacional",
    "grupoorganizacional",
    "organizacion",
    "leyendacpp",
    "localidad",
    "membrete",
    "mensajespreestablecidos",
    "municipio",
    "perfil",
    "prioridad",
    "tipoactor",
    "tipoasentamiento",
    "tipocontacto",
    "tipodocumento",
    "tipoprivacidad",
    "tipovialidad",
    "tratamiento",
    "trazainterna",
    "usuario",
    "indicador",


  ],

  apiEntidadesCambioNombre: [
    {
      entidad: "Tratamiento", campo: "tratamiento", nombre: "Grado académico"

    },

  ]

};

/*
//export const URL_API = 'http://10.1.40.149:8080/Agenda2030JavaRest-web/webresources'
export const URL_API = 'http://127.0.0.1:8080/Agenda2030JavaRest-web/webresources'

 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
