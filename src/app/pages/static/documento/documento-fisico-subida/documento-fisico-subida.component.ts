import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DocumentoChipModel, DocumentoJsonDestinatario, DocumentoFisicoMdl, DocumentoFisico64Mdl, DocumentoFisicoOriginal64Mdl } from 'src/app/_modelos/documento';
import { MatStepper } from '@angular/material/stepper';
import { DropdownComponent } from 'src/app/pages/componentes-dinamicos/dropdown/dropdown.component';
import { ThemePalette } from '@angular/material/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Anexo64Mdl, DocumentoAnexoMdl, AnexoDocumentoFisico64Mdl } from 'src/app/_modelos/anexo';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
import { DinamicoService } from 'src/app/_utils/services/dinamico.service';
import { ActorsService } from 'src/app/_utils/services/Service-Entidades/actor.service';
import { AnexoService } from 'src/app/_utils/services/Service-Entidades/anexo.service';
import { DocumentoFisicoService } from 'src/app/_utils/services/Service-Entidades/documentoFisico.service';
import { MatDialog } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { DocumentoDialogComponent } from '../documento-dialog/documento-dialog.component';
import { DialogDinamicoComponent } from 'src/app/pages/componentes-dinamicos/dialog/dialog.component';
import { ContactoMdl } from 'src/app/_modelos/contacto';
import { DialogDinamicoData, DocumentoData } from 'src/app/_utils/interface/interfaz';
import { AnexoDocumentoFisicoService } from 'src/app/_utils/services/Service-Entidades/anexoDocumentoFisico.service';
import { DocumentoBase64Component } from '../documento-base64/documento-base64.component';
import { Dropdown } from 'primeng/dropdown';


@Component({
  selector: 'app-documento-fisico-subida',
  templateUrl: './documento-fisico-subida.component.html',
  styleUrls: ['./documento-fisico-subida.component.scss']
})
export class DocumentoFisicoSubidaComponent implements OnInit, AfterViewInit {

  RemplazoFolio: string = "Folio_Reemplazo";

  animal: string;
  name: string;
  usuario: any;
  test: boolean = true;
  pathRegreso: string = "/documentofisico/lista";
  pathRegresoMensaje: string = "Ir a listado Documento Físico";
  TipoEnvio = "Destinatario";
  entradaList = [
    { label: 'Salida', value: "S" }
  ];

  viaRecepcionList = [
    { label: 'Correo electrónico', value: "Correo electronico" },
    { label: 'Entrega física', value: "Entrega fisica" }
  ];

  destinatariosList = [];
  remitentesList = [];
  destinatarioSeleccionado;
  remitenteSeleccionado;


  public documentoRelacionado: DocumentoFisicoMdl = null;

  /// ckeditor variables y configuraciones del componente
  public config = {
    language: 'es',
  };

  //  public documentoRelacionado: DocumentoMdl = null;

  @ViewChild('contenidoEditor', { static: false }) contenidoEditor: any;
  @ViewChild('instruccionesEditor', { static: false }) instruccionesEditor: any;
  @ViewChild('stepper', { static: false }) matStepper: MatStepper;
  // @ViewChild('tipoDocumento', { static: false }) tipoDocumentoSelect: DropdownComponent;
  @ViewChild('AdjuntarDocumentoFisico', { static: false }) adjuntarDocumentoFisico: DocumentoBase64Component;
  @ViewChild('destinatario', { static: false }) destinatarioSelect: Dropdown;
  @ViewChild('remitente', { static: false }) remitenteSelect: Dropdown;

  /// ckeditor variables y configuraciones del componente

  color: ThemePalette = 'accent';     // mat-slide-toggle color del componente
  disabled = false;                   // se usa para deshabilitar componentes
  isLinear = true;
  pdfFormart: any;
  pdfFinal: any;

  paso: any;

  formGroup: FormGroup;               // forma principal del documento
  edicionRegistro: DocumentoFisicoMdl;      // registro donde se actualizan los cambios del documento
  firstFormGroup: FormGroup;          // se usan en los tabs de la forma
  secondFormGroup: FormGroup;         // se usan en los tabs de la forma

  ClaseEnpoint: any;                  // clase a la que pertenece el endpoint
  endpoint;                           // objeto donde se guardan todas las variables del endpoint
  id: any;                           // id del registro documento pasado desde la url del componente
  NombreClase: string = "";           // nombre de la clase
  TipoForma: string = "Edición de ";  // mensaje que se usa para el titulo del componente
  isSave: boolean = true;
  Clase: any;

  ListadoClaseCompleto: string[] = [];
  NombreClaseSplit: any;
  ListadoContacto: any[] = [];
  ListadoContactoModificado: any[] = [];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];  // mat-chip-list usa estos separadores
  folioActivado: boolean = true;
  destinatarios: any[] = [];          // arreglo donde se guardaran todos los destinatarios
  Cpp: any[] = [];                    // arreglo donde se guardaran a quienes se envia una copia de conocimiento
  actor: any;                         // informacion del usuario que hace login en el sistema
  get f() { return this.formGroup.controls; } // se usa para aceder facilmente al formgroup principal desde el html
  ListaAnexo64: AnexoDocumentoFisico64Mdl[] = [];
  documentoFisicoOriginal: DocumentoFisicoOriginal64Mdl = new DocumentoFisicoOriginal64Mdl();

  /// variable usadas para los adjuntos
  imagenLoadingDocumentoOriginal: boolean = false;
  imagenLoadingAnexoDocumentoFisico: boolean = false;
  /// variable usadas para los adjuntos

  gruposOrganizacionales: any[] = [];
  gruposOrganizacionalesSelecionados: any[] = [];

  constructor(private route: ActivatedRoute,
    public apiService: OpenApiService,        // servicio para comunicar con el openapi.json
    private _formbuilder: FormBuilder,
    private dinamicoService: DinamicoService,   // servicio dinamico que se puede usar en cualquier endpoint
    private router: Router,
    private actorService: ActorsService,
    private anexoDocumentoFisicoService: AnexoDocumentoFisicoService,
    private docService: DocumentoFisicoService,

    public dialog: MatDialog

  ) {
    this.formGroup = this._formbuilder.group([]); // se inicializa el formgroup para evitar errores en el navegador
    this.firstFormGroup = this._formbuilder.group([]);
    this.secondFormGroup = this._formbuilder.group([]);
  }
  ngAfterViewInit(): void {
    try {
      this.destinatarioSelect.optionsToDisplay.forEach(element => {

        if (element.value.destinatario_id == this.destinatarioSeleccionado.desinatario_id) {
          this.destinatarioSelect.selectedOption = element
        }
      });
    } catch (error) {

    }

    try {
      this.remitenteSelect.optionsToDisplay.forEach(element => {

        if (element.value.remitente_id == this.remitenteSeleccionado.remitente_id) {
          this.remitenteSelect.selectedOption = element
        }
      });

    } catch (error) {

    }



  }

  ngOnInit() {

    this.usuario = this.apiService.getCurrentUser();

    this.cargarRemitenteDestinatarioToken()

    const id = this.route.snapshot.paramMap.get('id');
    this.id = id;

    this.endpoint = this.apiService.BuscarEndpointPorClase("#/components/schemas/DocumentoFisico");
    this.Clase = this.apiService.BuscarClase(this.endpoint);
    this.NombreClase = this.Clase.clase;
    this.NombreClaseSplit = this.apiService.camelCaseToTitleCase(this.NombreClase);

    let temp = this.apiService.FiltroPropiedades(this.Clase);
    this.ListadoClaseCompleto = temp.ListadoClaseCompleto;
    let ClaseVacia = temp.ClaseVacia;

    let endpointActor = this.apiService.BuscarEndpointPorClase("#/components/schemas/Actor");

    this.dinamicoService.getIndividual(endpointActor.ruta, 1).subscribe(resp => {
      this.actor = resp;
    });


    this.dinamicoService.getListado("/webresources/grupoenvio").subscribe(resp => {
      this.gruposOrganizacionales = resp;
    });


    this.dinamicoService.getListado("/webresources/contacto").subscribe(resp => {

      this.ListadoContacto = JSON.parse(JSON.stringify(resp));

      resp.forEach(element => {
        element.NombreCompleto = element.puesto + ".- " + element.nombre + " " + element.apellidoPaterno + " " + element.apellidoMaterno + ".- " + element.dependencia;
      })
      this.ListadoContactoModificado = resp;
    });

    console.log(this.ListadoClaseCompleto);

    if (id !== 'new') {
      this.isSave = false
      this.TipoForma = "Creación de "
      this.imagenLoadingAnexoDocumentoFisico = true;
      // this.imagenLoadingDocumentoOriginal = true;

      this.anexoDocumentoFisicoService.AnexoFindallByDocumento(id).subscribe(resp => {
        this.ListaAnexo64 = resp;
        this.imagenLoadingAnexoDocumentoFisico = false;
      });

      this.anexoDocumentoFisicoService.DocumentoOriginalBase64(id).subscribe(resp2 => {
        this.documentoFisicoOriginal = resp2;
        this.imagenLoadingAnexoDocumentoFisico = false;
      });

      this.dinamicoService.getIndividual(this.endpoint.ruta, id).subscribe(resp => {


        let repTemp = this.dinamicoService.formateadoDate(resp, this.Clase);
        this.edicionRegistro = repTemp;

        try {
          this.edicionRegistro.remitenteDestinatarioId.NombreCompleto = this.edicionRegistro.remitenteDestinatarioId.puesto + ".- " + this.edicionRegistro.remitenteDestinatarioId.nombre + " " + this.edicionRegistro.remitenteDestinatarioId.apellidoPaterno + " " + this.edicionRegistro.remitenteDestinatarioId.apellidoMaterno;

        } catch (error) {

        }


        this.cargaRemitenteDestinatarioJson();
        this.formGroup = this._formbuilder.group(this.edicionRegistro);
        debugger

        try {
          let temp = JSON.parse(resp.jsonDestinatarioRemitente);

          temp.grupo.forEach(element => {
            debugger

            let grupoind = this.gruposOrganizacionales.find(grupo => grupo.grupoOrganizacionalId.grupoOrganizacionalId == element.grupoOrganizacionalId.grupoOrganizacionalId);

            if (grupoind) {
              this.gruposOrganizacionalesSelecionados.push(grupoind);

            } else {
              this.gruposOrganizacionales.push(grupoind);
              this.gruposOrganizacionalesSelecionados.push(grupoind);

            }

          });

        } catch (error) {

        }


      })


    }

    else {

      let temp: DocumentoFisicoMdl = new DocumentoFisicoMdl();
      this.edicionRegistro = temp;

      //   this.edicionRegistro = ClaseVacia;
      this.edicionRegistro.contenido = null;
      this.edicionRegistro.tipoDocumentoId = null;
      this.edicionRegistro.prioridadId = null;
      this.edicionRegistro.tipoPrivacidadId = null;
      this.edicionRegistro.ctrlCreadoPor = this.usuario.usuario_id;
      this.edicionRegistro.documentoFisicoRelacionadoId = this.documentoRelacionado;

      this.edicionRegistro.grupoOrganizacionalCreadorId = this.usuario.grupo_organizacional_remitente_id; // asigna el grupo y la organizacion del usuario logeado
      this.edicionRegistro.organizacionCreadorId = this.usuario.organizacion_remitente_id;
      this.formGroup = this._formbuilder.group(this.edicionRegistro);
      this.formGroup.controls.jsonCcp.setValue("[]");
      console.log(this.edicionRegistro);
    }

    try {
      this.Clase.required.forEach(element => {
        if (this.formGroup.controls[element]) {
          this.formGroup.controls[element].setValidators(Validators.required);
        }
      });
    } catch (error) {

    }

    this.ClaseEnpoint = ClaseVacia;
  }

  tests(event) {



  }

  cargaRemitenteDestinatarioJson() {
    let ArrayCpp: any = JSON.parse(this.edicionRegistro.jsonCcp);
    let ArrayDestinatario: any = JSON.parse(this.edicionRegistro.jsonDestinatarioRemitente);

    try {
      this.remitenteSeleccionado = ArrayDestinatario.actor[0]
    } catch (error) {

    }

    try {
      this.destinatarioSeleccionado = ArrayDestinatario.actor[0]
    } catch (error) {

    }

    ArrayCpp.actor.forEach(element => {
      let actorObject: DocumentoChipModel = new DocumentoChipModel();
      actorObject.tipo = "Actor";
      actorObject.color = "chipActor";
      actorObject.entidad = element;

      if (element.puesto_destinatario != null) {
        actorObject.nombre = element.puesto_destinatario + " : " + element.nombre_destinatario;
      }
      else {
        actorObject.nombre = element.puesto_remitente + " : " + element.nombre_remitente;
      }

      if (element.leyenda) {
        actorObject.leyenda = element.leyenda;

        actorObject.nombre = actorObject.nombre + " -" + actorObject.leyenda.nombre
      }

      this.Cpp.push(actorObject);
    });

    ArrayCpp.contacto.forEach(element => {
      let contactoObject: DocumentoChipModel = new DocumentoChipModel();
      contactoObject.tipo = "Contacto";
      contactoObject.color = "chipContacto";
      contactoObject.entidad = element;
      if (element.puesto_destinatario != null) {
        contactoObject.nombre = element.puesto_destinatario + " : " + element.nombre_destinatario;
      }
      else {
        contactoObject.nombre = element.puesto_remitente + " : " + element.nombre_remitente;
      }


      if (element.leyenda) {
        contactoObject.leyenda = element.leyenda;
        contactoObject.nombre = contactoObject.nombre + " -" + contactoObject.leyenda.nombre
      }

      this.Cpp.push(contactoObject);
    });

    ArrayCpp.grupo.forEach(element => {
      let grupoObject: DocumentoChipModel = new DocumentoChipModel();
      grupoObject.tipo = "Grupo";
      grupoObject.color = "chipGrupo";
      grupoObject.entidad = element;
      grupoObject.nombre = element.nombre + " : " + element.descripcion;

      if (element.leyenda) {
        grupoObject.leyenda = element.leyenda;
        grupoObject.nombre = grupoObject.nombre + " -" + grupoObject.leyenda.nombre
      }
      this.Cpp.push(grupoObject);
    });

    ArrayDestinatario.actor.forEach(element => {
      let actorObject: DocumentoChipModel = new DocumentoChipModel();
      actorObject.tipo = "Actor";
      actorObject.color = "chipActor";
      actorObject.entidad = element;
      actorObject.nombre = element.puesto_destinatario + " : " + element.nombre_destinatario;

      if (element.puesto_destinatario != null) {
        actorObject.nombre = element.puesto_destinatario + " : " + element.nombre_destinatario;
      }
      else {
        actorObject.nombre = element.puesto_remitente + " : " + element.nombre_remitente;
      }

      if (element.leyenda) {
        actorObject.leyenda = element.leyenda;
        actorObject.nombre = actorObject.nombre + " -" + actorObject.leyenda.nombre
      }

      this.destinatarios.push(actorObject);

      this.remitentesList.forEach(remitente => {

        if (remitente.value.nombre_remitente == element.nombre_remitente) {
          this.remitenteSeleccionado = remitente;
          this.destinatarioSeleccionado = remitente;

        }

      })


    });

    ArrayDestinatario.contacto.forEach(element => {
      let contactoObject: DocumentoChipModel = new DocumentoChipModel();
      contactoObject.tipo = "Contacto";
      contactoObject.color = "chipContacto";
      contactoObject.entidad = element;
      contactoObject.nombre = element.puesto_destinatario + " : " + element.nombre_destinatario;

      if (element.leyenda) {
        contactoObject.leyenda = element.leyenda;
        contactoObject.nombre = contactoObject.nombre + " -" + contactoObject.leyenda.nombre
      }
      this.destinatarios.push(contactoObject);
    });

    ArrayDestinatario.grupo.forEach(element => {
      let grupoObject: DocumentoChipModel = new DocumentoChipModel();
      grupoObject.tipo = "Grupo";
      grupoObject.color = "chipGrupo";
      grupoObject.entidad = element;
      grupoObject.nombre = element.nombre + " : " + element.descripcion;

      if (element.leyenda) {
        grupoObject.leyenda = element.leyenda;
        grupoObject.nombre = grupoObject.nombre + " -" + grupoObject.leyenda.nombre
      }

      this.destinatarios.push(grupoObject);
    });

  }

  cargarRemitenteDestinatarioToken() {

    this.usuario.destinatarios.forEach(element => {
      this.destinatariosList.push({ label: element.puesto_destinatario + " " + element.nombre_destinatario, value: element });
    });

    this.usuario.remitentes.forEach(element => {
      this.remitentesList.push({ label: element.puesto_remitente + " " + element.nombre_remitente, value: element });
    });

  }

  entradaSalidaChange(event) {
    console.log('event :' + event);
    console.log(event.value);

    if (event.value == "E") {

    } else if (event.value == "S") {

    }

    //Actualización 12/06/2020. Folio queda desactivado para documentos de E y S
    this.folioActivado = true;

    /*
    if (event.value == "S") {
      this.folioActivado = true;
      this.formGroup.controls.cadenaFolio.setValue("");
    }
    else {
      this.folioActivado = false;
      this.formGroup.controls.cadenaFolio.setValue("");

    }*/

  }

  tipoDocumentoChange(event) {
    var destinatarioArray: any[] = [];
    var cppArray: any[] = [];

    this.destinatarios.forEach(element => {
      if (event.nombre == "Oficio" || event.nombre == "Tarjeta") {
        if (element.tipo == "Actor") {
          destinatarioArray.push(element);
        }
        if (element.tipo == "Contacto") {
          destinatarioArray.push(element);
        }
      }

      if (event.nombre == "Circular") {
        if (element.tipo == "Grupo") {
          destinatarioArray.push(element);
        }
      }
    });

    this.Cpp.forEach(element => {
      if (event.nombre == "Oficio" || event.nombre == "Tarjeta") {
        if (element.tipo == "Actor") {
          cppArray.push(element);
        }
        if (element.tipo == "Contacto") {
          cppArray.push(element);
        }
      }
      if (event.nombre == "Circular") {
        if (element.tipo == "Grupo") {
          cppArray.push(element);
        }
      }
    });

    this.destinatarios = [];
    this.Cpp = [];

    this.destinatarios = destinatarioArray;
    this.Cpp = cppArray;

    this.f['tipoDocumentoId'].setValue(event)
  }



  addDetinatario(event: MatChipInputEvent): void { // metodo personalizado para agregar un destinatario a los mat-chip-list
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      this.destinatarios.push({ name: value.trim() });
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  addCpp(event: MatChipInputEvent): void { // metodo personalizado para agregar un Cpp a los mat-chip-list
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      this.Cpp.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeDestinatario(destinatario: any): void { // metodo personalizado para eliminar un destinatario a los mat-chip-list
    const index = this.destinatarios.indexOf(destinatario);
    if (index >= 0) {
      this.destinatarios.splice(index, 1);
    }
  }

  removeCpp(cpp: any): void { // metodo personalizado para eliminar  un cpp a los mat-chip-list
    const index = this.Cpp.indexOf(cpp);
    if (index >= 0) {
      this.Cpp.splice(index, 1);
    }
  }

  Pdf() { // metodo para generar el pdf de vista previa
    this.pdfFinal = null;

    debugger
    if (this.documentoFisicoOriginal.anexo == null) {
      Swal.fire({
        title: "Error pdf",
        text: 'Debe adjuntar el documento antes de continuar',
        icon: 'error'
      })
    }

    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();

      let temp: string[] = [];
      Object.keys(this.formGroup.controls).forEach(key => {
        if (this.formGroup.controls[key].invalid) {
          temp.push(key);
        }
      });
      //Aquí va la validación del form
      console.log(temp);
      return
    }

    // si el oficio es de entrada, solo carga el pdf que se adjunta en el formulario
    this.pdfFormart = this.documentoFisicoOriginal.base64;
    this.matStepper.selectedIndex = 1;
  }


  FolioRemplazar() {
    let peticion: Observable<any>

    let temp: any = {};

    temp.base64 = this.documentoFisicoOriginal.base64;
    temp.folio = "texto prueba";
    temp.folioRemplazo = this.RemplazoFolio;

    peticion = this.dinamicoService.imprimirReporte("/webresources/documentofisico/pdfFolio", temp);

    peticion.subscribe(respPdf => { // anexa el pdf generado en el formulario, luego el componente de archivo adjunto, llama a la persistencia.
      this.pdfFormart = null;
      this.pdfFormart = respPdf;
      //this.adjuntarDocumentoFisico.agregarImagenBlobSubida(respPdf, this); // se pasa el parametro this, para que llame a la persistencia desde este componente
    }, error => {

      Swal.fire({
        title: "fail",
        text: 'Error en la peticion',
        icon: 'error'
      })

    })

  }

  cambioRemplazo(event){
    debugger
    this.RemplazoFolio=event.target.value
 
  }

  PdfFinal(doc) { // metodo genera el pdf, pero consulta antes el documento, para traer
    // el folio que se genera despues de la persistencia, debido a un trigger en la insercion

    let peticion: Observable<any>
    this.dinamicoService.getIndividual(this.endpoint.ruta, doc.documentoFisicoId).subscribe(resp => {

      let temp: any = {};

      temp.base64 = this.documentoFisicoOriginal.base64;
      temp.folio = resp.cadenaFolio;
      temp.folioRemplazo = this.RemplazoFolio;

      peticion = this.dinamicoService.imprimirReporte("/webresources/documentofisico/pdfFolio", temp);
      console.log(resp);

      try { // actualiza el folio en el formulario y el status documento
        this.formGroup.controls.cadenaFolio.setValue(resp.cadenaFolio)
        this.formGroup.controls.estatusDocumentoId.setValue(resp.estatusDocumentoId)

      } catch (error) {
        this.formGroup.controls.cadenaFolio.setValue("")
      }

      peticion.subscribe(respPdf => { // anexa el pdf generado en el formulario, luego el componente de archivo adjunto, llama a la persistencia.
        this.pdfFormart = null;
        this.adjuntarDocumentoFisico.agregarImagenBlobSubida(respPdf, this); // se pasa el parametro this, para que llame a la persistencia desde este componente
      }, error => {

        Swal.fire({
          title: "fail",
          text: 'Error en la peticion',
          icon: 'error'
        })
      })

    })
  }

  GuardarAnexo() { // metodo para persistir tanto el documento, documento original y anexos, en el mismo endpoint

    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      let temp: string[] = [];
      Object.keys(this.formGroup.controls).forEach(key => {
        if (this.formGroup.controls[key].invalid) {
          temp.push(key);
        }
      });

      //Aquí va la validación del form
      console.log(temp);
      return
    }

    if (this.documentoFisicoOriginal.anexo == null) { // valida que exista un pdf en el formulario

      Swal.fire({
        title: "oficio original",
        text: 'Debes agregar el documento original',
        icon: 'error',
      })
      return
    }
    let peticion: Observable<any>

    let temp: DocumentoFisicoMdl = this.formGroup.value;
    temp.instrucciones = this.edicionRegistro.instrucciones;
    temp.contenido = this.edicionRegistro.contenido;

    let actores: any[] = [];
    let contactos: any[] = [];
    let grupos: any[] = [];

    if (this.f.entradaSalida.value == 'S') {
      actores.push(this.remitenteSelect.selectedOption.value);
    }
    else {
      actores.push(this.destinatarioSelect.selectedOption.value);
    }

    grupos = this.gruposOrganizacionalesSelecionados

    // se crea un json con los arreglos del destinatario
    let destinatarios: DocumentoJsonDestinatario = new DocumentoJsonDestinatario();
    destinatarios.actor = actores;
    destinatarios.contacto = contactos;
    destinatarios.grupo = grupos;

    // se convierte a cadena los listados de actor, contactos y grupo
    temp.jsonDestinatarioRemitente = JSON.stringify(destinatarios);

    let actoresCpp: any[] = [];
    let contactosCpp: any[] = [];
    let gruposCpp: any[] = [];

    this.Cpp.forEach(element => {

      if (element.tipo == "Actor") {
        actoresCpp.push(element.entidad);
      }
      else if (element.tipo == "Contacto") {
        contactosCpp.push(element.entidad);

      }
      else if (element.tipo == "Grupo") {
        gruposCpp.push(element.entidad);

      }
    });

    let cpp: DocumentoJsonDestinatario = new DocumentoJsonDestinatario();
    cpp.actor = actoresCpp;
    cpp.contacto = contactosCpp;
    cpp.grupo = gruposCpp;

    temp.jsonDestinatarioRemitente = JSON.stringify(destinatarios);
    temp.jsonCcp = JSON.stringify(cpp);

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info'
    });

    Swal.showLoading()

    // se crea un objeto para adjuntar el documento, documento original y anexos.
    var doc: DocumentoFisico64Mdl = new DocumentoFisico64Mdl();
    doc.documentoFisico = temp;

    // se realiza esta busqueda, por que se modifica la entidad contactos con NombreCompleto
    // por lo que si no se elimina este atributo, no persiste por no existir esa columna en la base.
    try {
      doc.documentoFisico.remitenteDestinatarioId = this.ListadoContacto.find(element => element.contactoId == temp.remitenteDestinatarioId.contactoId);

    } catch (error) {
      doc.documentoFisico.remitenteDestinatarioId = null
    }

    doc.anexosList = this.ListaAnexo64;
    doc.documentoFisicoOriginal = this.documentoFisicoOriginal;

    // se asigna el documentoFisicoId a todos los anexos
    doc.anexosList.forEach(element => {
      element.anexoDocumentoFisico.documentoFisicoId = temp.documentoFisicoId;
    })

    peticion = this.dinamicoService.postClase(this.endpoint.ruta + "/minio", doc);

    peticion.subscribe(resp => {

      this.pdfFinal = resp.documentoFisicoOriginal.base64;
      this.matStepper.selectedIndex = 2;
      // this.Redireccionar();
      var folio = "";

      if (resp.documentoFisico.cadenaFolio != null) {
        folio = ", Folio: " + resp.documentoFisico.cadenaFolio;
      }

      this.CambEstatus();

      Swal.fire({
        title: "ok",
        text: 'Realizado correctamente' + folio,
        icon: 'success',
      })
    }, error => {
      Swal.fire({
        title: "fail",
        text: 'Error en la peticion',
        icon: 'error'
      })
    })
  }

  Guardar() { // metodo para guardar los cambios del documento al servicio java

    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      let temp: string[] = [];
      Object.keys(this.formGroup.controls).forEach(key => {
        if (this.formGroup.controls[key].invalid) {
          temp.push(key);
        }
      });
      //Aquí va la validación del form
      console.log(temp);
      return
    }

    if (this.f.entradaSalida.value == 'E') { // si es oficio de entrada, valida que exista el documento adjunto pdf
      if (this.documentoFisicoOriginal.anexo == null) {

        Swal.fire({
          title: "oficio original",
          text: 'debes agregar el documento original',
          icon: 'error',
        })
        return
      }
    }

    let peticion: Observable<any>

    let temp: DocumentoFisicoMdl = this.formGroup.value;
    temp.instrucciones = this.edicionRegistro.instrucciones;
    temp.contenido = this.edicionRegistro.contenido;

    let actores: any[] = [];
    let contactos: any[] = [];
    let grupos: any[] = [];

    this.destinatarios.forEach(element => {

      if (element.tipo == "Actor") {
        actores.push(element.entidad);
      }
      else if (element.tipo == "Contacto") {
        contactos.push(element.entidad);

      }
      else if (element.tipo == "Grupo") {
        grupos.push(element.entidad);
      }
    });

    grupos = this.gruposOrganizacionalesSelecionados

    let destinatarios: DocumentoJsonDestinatario = new DocumentoJsonDestinatario();
    destinatarios.actor = actores;
    destinatarios.contacto = contactos;
    destinatarios.grupo = grupos;


    if (this.f.entradaSalida.value == 'E') {
      actores.push(this.destinatarioSelect.selectedOption.value);
    }
    else {
      actores.push(this.remitenteSelect.selectedOption.value);
    }

    temp.jsonDestinatarioRemitente = JSON.stringify(destinatarios);


    let actoresCpp: any[] = [];
    let contactosCpp: any[] = [];
    let gruposCpp: any[] = [];

    this.Cpp.forEach(element => {

      if (element.tipo == "Actor") {
        actoresCpp.push(element.entidad);
      }
      else if (element.tipo == "Contacto") {
        contactosCpp.push(element.entidad);

      }
      else if (element.tipo == "Grupo") {
        gruposCpp.push(element.entidad);

      }
    });

    let cpp: DocumentoJsonDestinatario = new DocumentoJsonDestinatario();
    cpp.actor = actoresCpp;
    cpp.contacto = contactosCpp;
    cpp.grupo = gruposCpp;

    temp.jsonDestinatarioRemitente = JSON.stringify(destinatarios);
    temp.jsonCcp = JSON.stringify(cpp);

    try {
      temp.remitenteDestinatarioId = this.ListadoContacto.find(element => element.contactoId == temp.remitenteDestinatarioId.contactoId);

    } catch (error) {
      temp.remitenteDestinatarioId = null;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info'
    });

    Swal.showLoading()

    if (this.formGroup.controls.documentoFisicoId.value == null) {
      temp.ctrlCreadoPor = this.usuario.usuario_id;
      temp.ctrlActualizadoPor = this.usuario.usuario_id;

      peticion = this.dinamicoService.postClase(this.endpoint.ruta, temp);
    }
    else {
      peticion = this.dinamicoService.putClase(this.endpoint.ruta, temp, temp.documentoFisicoId);
    }
    peticion.subscribe(resp => {
      // se asigna el documentoFisicoId al formulario, para evitar doble persistencia.
      try {
        this.formGroup.controls.documentoFisicoId.setValue(resp.documentoFisicoId)

      } catch (error) {
        this.formGroup.controls.documentoFisicoId.setValue(null)
      }
      this.PdfFinal(resp);

    }, error => {

      Swal.fire({
        title: "fail",
        text: 'Error en la peticion',
        icon: 'error'
      })
    })
  }

  Redireccionar(): void {
    this.router.navigate(['/bucket/lista']);

  }

  RedireccionarDocF(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/documentofisico/formulario/new']));
  }

  openDialog(array: any[], nombre: string): void {

    let arreglo: any[] = [];
    if (nombre == "Destinatarios") {
      arreglo = this.destinatarios;
    } else if (nombre == "CPP") {
      arreglo = this.Cpp;
    }

    let tipoDocumento: string[] = [];
    try {

      if (nombre == "CPP") {
        tipoDocumento = ["Funcionario", "Contacto"];

      }
      else {
        if (this.formGroup.controls.tipoDocumentoId.value.nombre == "Oficio" ||
          this.formGroup.controls.tipoDocumentoId.value.nombre == "Tarjeta") {
          tipoDocumento = ["Funcionario"];
        } else if (this.formGroup.controls.tipoDocumentoId.value.nombre == "Circular") {
          tipoDocumento = ["Grupo"];
        }
        else {
          tipoDocumento = [""];
        }
      }

    }
    catch {
      tipoDocumento = [""];
    }

    if (nombre == "Destinatarios") {
      var interFaz: DocumentoData = { destinatarios: arreglo, nombre: nombre, tipoDocumento: tipoDocumento, multiple: false, remitenteDestinatario: this.f.entradaSalida.value };
    } else {
      var interFaz: DocumentoData = { destinatarios: arreglo, nombre: nombre, tipoDocumento: tipoDocumento, multiple: true, remitenteDestinatario: this.f.entradaSalida.value };
    }



    const dialogRef = this.dialog.open(DocumentoDialogComponent, {
      width: '50%',
      height: '90%',
      data: interFaz
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogContacto(): void {

    var contacto: ContactoMdl = new ContactoMdl();

    var inter: DialogDinamicoData = {
      rutaEndPoint: "#/components/schemas/Contacto",
      id: "new",
      ocultos: ["contactoId", "dependenciaId", "grupoOrganizacionalId"],
      valorEntidad: contacto,
      respuesta: null

    };

    const dialogRef = this.dialog.open(DialogDinamicoComponent, {
      width: '50%',
      data: inter
    });

    dialogRef.getState();

    dialogRef.afterClosed().subscribe(result => {

      if (result.respuesta != null) {
        result.respuesta.NombreCompleto = result.respuesta.puesto + ".- " + result.respuesta.nombre + " " + result.respuesta.apellidoPaterno + " " + result.respuesta.apellidoMaterno;
        this.formGroup.controls.remitenteDestinatarioId.setValue(result.respuesta);

        this.dinamicoService.getListado("/webresources/contacto").subscribe(resp => {
          this.ListadoContacto = JSON.parse(JSON.stringify(resp));

          resp.forEach(element => {
            element.NombreCompleto = element.puesto + ".- " + element.nombre + " " + element.apellidoPaterno + " " + element.apellidoMaterno;
          })
          this.ListadoContactoModificado = resp;
        });


      }
      else {

      }

      console.log('The dialog was closed');
    });
  }


  UpdateDocRelacionado() {//Funcion documento relacionado --UPDATE-- ccp,remitente,destinatario

    this.usuario = this.apiService.getCurrentUser();

    const id = this.route.snapshot.paramMap.get('id');
    this.id = id;

    this.endpoint = this.apiService.BuscarEndpointPorClase("#/components/schemas/DocumentoFisico");
    this.Clase = this.apiService.BuscarClase(this.endpoint);
    this.NombreClase = this.Clase.clase;
    this.NombreClaseSplit = this.apiService.camelCaseToTitleCase(this.NombreClase);

    let temp = this.apiService.FiltroPropiedades(this.Clase);
    this.ListadoClaseCompleto = temp.ListadoClaseCompleto;
    let ClaseVacia = temp.ClaseVacia;

    let endpointActor = this.apiService.BuscarEndpointPorClase("#/components/schemas/Actor");

    this.dinamicoService.getIndividual(endpointActor.ruta, 1).subscribe(resp => {
      this.actor = resp;
    });

    this.dinamicoService.getListado("/webresources/contacto").subscribe(resp => {

      this.ListadoContacto = JSON.parse(JSON.stringify(resp));

      resp.forEach(element => {
        element.NombreCompleto = element.puesto + ".- " + element.nombre + " " + element.apellidoPaterno + " " + element.apellidoMaterno;
      })
      this.ListadoContactoModificado = resp;
    });

    console.log(this.ListadoClaseCompleto);

    if (id !== 'new') {
      this.isSave = false
      this.TipoForma = "Creación de "
      this.imagenLoadingAnexoDocumentoFisico = true;
      // this.imagenLoadingDocumentoOriginal = true;

      this.anexoDocumentoFisicoService.AnexoFindallByDocumento(id).subscribe(resp => {
        this.ListaAnexo64 = resp;
        this.imagenLoadingAnexoDocumentoFisico = false;
      });

      this.anexoDocumentoFisicoService.DocumentoOriginalBase64(id).subscribe(resp2 => {
        this.documentoFisicoOriginal = resp2;
        this.imagenLoadingAnexoDocumentoFisico = false;
      });

      this.dinamicoService.getIndividual(this.endpoint.ruta, id).subscribe(resp => {


        let repTemp = this.dinamicoService.formateadoDate(resp, this.Clase);
        this.edicionRegistro = repTemp;

        this.edicionRegistro.remitenteDestinatarioId.NombreCompleto = this.edicionRegistro.remitenteDestinatarioId.puesto + ".- " + this.edicionRegistro.remitenteDestinatarioId.nombre + " " + this.edicionRegistro.remitenteDestinatarioId.apellidoPaterno + " " + this.edicionRegistro.remitenteDestinatarioId.apellidoMaterno;

        this.formGroup = this._formbuilder.group(this.edicionRegistro);
        let ArrayCpp: any = JSON.parse(this.edicionRegistro.jsonCcp);
        let ArrayDestinatario: any = JSON.parse(this.edicionRegistro.jsonDestinatarioRemitente);

        ArrayCpp.actor.forEach(element => {
          let actorObject: DocumentoChipModel = new DocumentoChipModel();
          actorObject.tipo = "Actor";
          actorObject.color = "chipActor";
          actorObject.entidad = element;

          if (element.puesto_destinatario != null) {
            actorObject.nombre = element.puesto_destinatario + " : " + element.nombre_destinatario;
          }
          else {
            actorObject.nombre = element.puesto_remitente + " : " + element.nombre_remitente;
          }

          this.Cpp.push(actorObject);
        });

        ArrayCpp.contacto.forEach(element => {
          let contactoObject: DocumentoChipModel = new DocumentoChipModel();
          contactoObject.tipo = "Contacto";
          contactoObject.color = "chipContacto";
          contactoObject.entidad = element;
          if (element.puesto_destinatario != null) {
            contactoObject.nombre = element.puesto_destinatario + " : " + element.nombre_destinatario;
          }
          else {
            contactoObject.nombre = element.puesto_remitente + " : " + element.nombre_remitente;
          }
          //      contactoObject.nombre = element.puesto_destinatario + " : " + element.nombre_destinatario;
          this.Cpp.push(contactoObject);
        });

        ArrayCpp.grupo.forEach(element => {
          let grupoObject: DocumentoChipModel = new DocumentoChipModel();
          grupoObject.tipo = "Grupo";
          grupoObject.color = "chipGrupo";
          grupoObject.entidad = element;
          grupoObject.nombre = element.nombre + " : " + element.descripcion;
          this.Cpp.push(grupoObject);
        });

        ArrayDestinatario.actor.forEach(element => {
          let actorObject: DocumentoChipModel = new DocumentoChipModel();
          actorObject.tipo = "Actor";
          actorObject.color = "chipActor";
          actorObject.entidad = element;
          actorObject.nombre = element.puesto_destinatario + " : " + element.nombre_destinatario;

          if (element.puesto_destinatario != null) {
            actorObject.nombre = element.puesto_destinatario + " : " + element.nombre_destinatario;
          }
          else {
            actorObject.nombre = element.puesto_remitente + " : " + element.nombre_remitente;
          }

          this.destinatarios.push(actorObject);
        });

        ArrayDestinatario.contacto.forEach(element => {
          let contactoObject: DocumentoChipModel = new DocumentoChipModel();
          contactoObject.tipo = "Contacto";
          contactoObject.color = "chipContacto";
          contactoObject.entidad = element;
          contactoObject.nombre = element.puesto_destinatario + " : " + element.nombre_destinatario;
          this.destinatarios.push(contactoObject);
        });

        ArrayDestinatario.grupo.forEach(element => {
          let grupoObject: DocumentoChipModel = new DocumentoChipModel();
          grupoObject.tipo = "Grupo";
          grupoObject.color = "chipGrupo";
          grupoObject.entidad = element;
          grupoObject.nombre = element.nombre + " : " + element.descripcion;
          this.destinatarios.push(grupoObject);
        });
        console.log(resp);
      })


    }

    else {

      let temp: DocumentoFisicoMdl = new DocumentoFisicoMdl();
      this.edicionRegistro = temp;

      //   this.edicionRegistro = ClaseVacia;
      this.edicionRegistro.contenido = null;
      this.edicionRegistro.tipoDocumentoId = null;
      this.edicionRegistro.prioridadId = null;
      this.edicionRegistro.tipoPrivacidadId = null;
      this.edicionRegistro.ctrlCreadoPor = this.usuario.usuario_id;
      this.edicionRegistro.documentoFisicoRelacionadoId = this.documentoRelacionado;

      this.edicionRegistro.grupoOrganizacionalCreadorId = this.usuario.grupo_organizacional_remitente_id; // asigna el grupo y la organizacion del usuario logeado
      this.edicionRegistro.organizacionCreadorId = this.usuario.organizacion_remitente_id;


      this.formGroup = this._formbuilder.group(this.edicionRegistro);
      this.formGroup.controls.jsonCcp.setValue("[]");
      // this.formGroup.controls.ctrlCreadoPor.setValue(1);

      console.log(this.edicionRegistro);
    }

    this.Clase.required.forEach(element => {
      if (this.formGroup.controls[element]) {
        this.formGroup.controls[element].setValidators(Validators.required);
      }
    });
    this.ClaseEnpoint = ClaseVacia;
  }

  CambEstatus(): void {

    let id = null
    try {
      id = this.documentoRelacionado.documentoFisicoId
    } catch (error) {
      id = null
    }

    if (id) {

      this.docService.DocumentoFind(Number(id)).subscribe((resp: DocumentoFisicoMdl) => {

        debugger
        resp.estatusDocumentoId = 6;



        let peticion: Observable<any>
        /*  Swal.fire({
           title: 'Espere',
           text: 'Guardando información',
           icon: 'info',
           allowOutsideClick: false
         })
  */
        debugger
        peticion = this.docService.AutorizarEstatus(resp.documentoFisicoId, resp)


        peticion.subscribe(resp => {


          this.ngOnInit();
          /*
                    Swal.fire({
                      title: id,
                      text: 'Realizado correctamente',
                      icon: 'success',
                    }) */
        },

          error => {
            if (error) {

            }

            Swal.fire({
              title: id,
              text: 'error cambio de status documento',
              icon: 'error',
            })
          },

        )

      })

    }

  }

  validarFolio() {

    let id: any = {}
    id.numero_documento_original = this.f.numeroDocumentoOriginal.value

    if (id) {

      this.dinamicoService.postClase("/webresources/documentofisico/buscarfolio", id).subscribe(resp => {

        if (resp.length == 0) {
          Swal.fire({
            title: "Folio disponible",
            text: 'El folio consultado, no ha sido capturado con anterioridad',
            icon: 'success',
          })
        }
        else {
          let folios = "";
          resp.forEach(element => {

            folios = folios + element.cadenaFolio + ". Dependencia orígen: " + element.remitenteDestinatarioId.dependencia + " "
          });

          Swal.fire({
            title: "Folio ya capturado",
            text: 'El folio consultado, ha sido capturado con anterioridad ' + folios,
            icon: 'error',
          })
        }

      },
        error => {
          Swal.fire({
            title: 'Error',
            text: 'Error al consultar el folio',
            icon: 'error',
          })

        });




    }

  }

}



