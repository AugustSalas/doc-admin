import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
import { DinamicoService } from 'src/app/_utils/services/dinamico.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ThemePalette } from '@angular/material/core';
import { DocumentoChipModel, DocumentoJsonDestinatario, DocumentoMdl } from 'src/app/_modelos/documento';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'
import { MatDialog } from '@angular/material/dialog';
import { DocumentoDialogComponent } from '../documento-dialog/documento-dialog.component';
import { MatStepper } from '@angular/material/stepper';
import { ActorsService } from 'src/app/_utils/services/Service-Entidades/actor.service';
import { DropdownComponent } from 'src/app/pages/componentes-dinamicos/dropdown/dropdown.component';
import { AnexoMdl, Anexo64Mdl, DocumentoAnexoMdl } from 'src/app/_modelos/anexo';
import { element } from 'protractor';
import { AnexoService } from 'src/app/_utils/services/Service-Entidades/anexo.service';

@Component({
  selector: 'app-documento-formulario',
  templateUrl: './documento-formulario.component.html',
  styleUrls: ['./documento-formulario.component.scss']
})
export class DocumentoFormularioComponent implements OnInit {

  animal: string;
  name: string;

  usuario: any;

  test: boolean = true;

  pathRegreso: string = "/documento/lista";
  pathRegresoMensaje: string = "Ir a listado Documento";


  /// ckeditor variables y configuraciones del componente
  public config = {
    language: 'es',

  };

  public documentoRelacionado: DocumentoMdl = null;


  @ViewChild('contenidoEditor', { static: false }) contenidoEditor: any;
  @ViewChild('instruccionesEditor', { static: false }) instruccionesEditor: any;
  @ViewChild('stepper', { static: false }) matStepper: MatStepper;
  @ViewChild('tipoDocumento', { static: false }) tipoDocumentoSelect: DropdownComponent;

  /// ckeditor variables y configuraciones del componente

  color: ThemePalette = 'accent';     // mat-slide-toggle color del componente
  disabled = false;                   // se usa para deshabilitar componentes 
  isLinear = false;
  pdfFormart: any;
  pdfFinal: any;

  paso: any;

  formGroup: FormGroup;               // forma principal del documento
  edicionRegistro: DocumentoMdl;      // registro donde se actualizan los cambios del documento   
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

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];  // mat-chip-list usa estos separadores

  destinatarios: any[] = [];          // arreglo donde se guardaran todos los destinatarios
  Cpp: any[] = [];                    // arreglo donde se guardaran a quienes se envia una copia de conocimiento
  actor: any;                         // informacion del usuario que hace login en el sistema
  get f() { return this.formGroup.controls; } // se usa para aceder facilmente al formgroup principal desde el html
  ListaAnexo64: Anexo64Mdl[] = [];

  /// variable usadas para los adjuntos
  imagenLoading: boolean = false;
  /// variable usadas para los adjuntos


  constructor(private route: ActivatedRoute,
    public apiService: OpenApiService,        // servicio para comunicar con el openapi.json
    private _formbuilder: FormBuilder,
    private dinamicoService: DinamicoService,   // servicio dinamico que se puede usar en cualquier endpoint
    private router: Router,
    private actorService: ActorsService,
    private anexoService: AnexoService,

    public dialog: MatDialog

  ) {
    this.formGroup = this._formbuilder.group([]); // se inicializa el formgroup para evitar errores en el navegador
  }

  ngOnInit() {

    this.usuario = this.apiService.getCurrentUser();

    this.firstFormGroup = this._formbuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formbuilder.group({
      secondCtrl: ['', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');
    this.id = id;

    this.endpoint = this.apiService.BuscarEndpointPorClase("#/components/schemas/Documento");
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

    console.log(this.ListadoClaseCompleto);

    if (id !== 'new') {
      this.isSave = false
      this.TipoForma = "Creación de "
      this.imagenLoading = true;

      this.anexoService.AnexoFindallByDocumento(id).subscribe(resp => {
        this.ListaAnexo64 = resp;
        this.imagenLoading = false;
      });

      this.dinamicoService.getIndividual(this.endpoint.ruta, id).subscribe(resp => {

        let repTemp = this.dinamicoService.formateadoDate(resp, this.Clase);
        this.edicionRegistro = repTemp;

        this.formGroup = this._formbuilder.group(this.edicionRegistro);

        let ArrayDestinatario: any = JSON.parse(this.edicionRegistro.jsonDestinatario);
        let ArrayCpp: any = JSON.parse(this.edicionRegistro.jsonCcp);

        ArrayDestinatario.actor.forEach(element => {

          let actorObject: DocumentoChipModel = new DocumentoChipModel();
          actorObject.tipo = "Actor";
          actorObject.color = "chipActor";
          actorObject.entidad = element;
          actorObject.nombre = element.puesto_destinatario + " : " + element.nombre_destinatario;

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

        ArrayCpp.actor.forEach(element => {
          let actorObject: DocumentoChipModel = new DocumentoChipModel();
          actorObject.tipo = "Actor";
          actorObject.color = "chipActor";
          actorObject.entidad = element;
          actorObject.nombre = element.puesto_destinatario + " : " + element.nombre_destinatario;

          this.Cpp.push(actorObject);
        });

        ArrayCpp.contacto.forEach(element => {
          let contactoObject: DocumentoChipModel = new DocumentoChipModel();
          contactoObject.tipo = "Contacto";
          contactoObject.color = "chipContacto";
          contactoObject.entidad = element;
          contactoObject.nombre = element.puesto_destinatario + " : " + element.nombre_destinatario;
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

        console.log(resp);
      })

    }
    else {

      let temp: DocumentoMdl = new DocumentoMdl();
      this.edicionRegistro = ClaseVacia;
      this.edicionRegistro.contenido = " ";
      this.edicionRegistro.tipoDocumentoId = null;
      this.edicionRegistro.prioridadId = null;
      this.edicionRegistro.tipoPrivacidadId = null;
      this.edicionRegistro.documentoRelacionadoId = this.documentoRelacionado;

      this.formGroup = this._formbuilder.group(temp);
      this.formGroup.controls.jsonTrazaExterna.setValue("[]");
      this.formGroup.controls.jsonTrazaInterna.setValue("[]");
      this.formGroup.controls.jsonCcp.setValue("[]");
      this.formGroup.controls.jsonDestinatario.setValue("[]");
      this.formGroup.controls.firmado.setValue(false);
      this.formGroup.controls.grupoOrganizacionalRemitenteId.setValue(1); // verificar del usuario logueado
      console.log(this.edicionRegistro);
    }

    this.Clase.required.forEach(element => {
      if (this.formGroup.controls[element]) {
        this.formGroup.controls[element].setValidators(Validators.required);
      }
    });
    this.ClaseEnpoint = ClaseVacia;
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

  Pdf() { // metodo para guardar los cambios del documento al servicio java

    if (this.isSave) {
      this.formGroup.controls.nombreRemitente.setValue("_");
      this.formGroup.controls.puestoRemitente.setValue("_");
      this.formGroup.controls.grupoOrganizacionalRemitente.setValue("_");
    }
    else {

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

    let peticion: Observable<any>

    let temp: DocumentoMdl = this.formGroup.value;
    temp.instrucciones = this.edicionRegistro.instrucciones;
    temp.contenido = this.edicionRegistro.contenido;

    if (this.documentoRelacionado != null) {
      temp.documentoRelacionadoId = this.documentoRelacionado;
    }


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


    let destinatarios: DocumentoJsonDestinatario = new DocumentoJsonDestinatario();
    destinatarios.actor = actores;
    destinatarios.contacto = contactos;
    destinatarios.grupo = grupos;

    temp.jsonDestinatario = JSON.stringify(destinatarios);


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

    temp.jsonDestinatario = JSON.stringify(destinatarios);
    temp.jsonCcp = JSON.stringify(cpp);

    if (this.isSave) {
      temp.nombreRemitente = this.usuario.nombre;
      temp.remitenteId = this.usuario.usuario_id;
      temp.ctrlCreadoPor = this.usuario.usuario_id;
      temp.ctrlActualizadoPor = this.usuario.usuario_id;

    }
    else {

    }


    this.edicionRegistro.instrucciones
    Swal.fire({
      title: 'Espere',
      text: 'Generando el PDF',
      icon: 'info'
    });

    Swal.showLoading()

    peticion = this.dinamicoService.imprimirReporte("/webresources/documento/reporte", temp);


    peticion.subscribe(resp => {
      this.pdfFormart = resp;
      this.matStepper.selectedIndex = 1;
      Swal.fire({
        title: "ok",
        text: 'Realizado correctamente',
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

  PdfFinal(doc) { // metodo para guardar los cambios del documento al servicio java


    let peticion: Observable<any>


    Swal.fire({
      title: 'Espere',
      text: 'Generando el PDF',
      icon: 'info'
    });

    Swal.showLoading()

    this.dinamicoService.getIndividual(this.endpoint.ruta, doc).subscribe(resp => {

      peticion = this.dinamicoService.imprimirReporte("/webresources/documento/reporte", resp);
      console.log(resp);

      peticion.subscribe(resp => {
        this.pdfFormart = null;
        this.pdfFinal = resp;
        this.matStepper.selectedIndex = 2;
        Swal.fire({
          title: "ok",
          text: 'Realizado correctamente',
          icon: 'success',
        })
      }, error => {
        Swal.fire({
          title: "fail",
          text: 'Error en la peticion',
          icon: 'error'
        })
      })
    })
    // peticion = this.dinamicoService.imprimirReporte("/webresources/documento/reporte", doc);


  }

  GuardarAnexo() { // metodo para guardar los cambios del documento al servicio java
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
    let peticion: Observable<any>

    let temp: DocumentoMdl = this.formGroup.value;
    temp.instrucciones = this.edicionRegistro.instrucciones;
    temp.contenido = this.edicionRegistro.contenido;

    if (this.documentoRelacionado != null) {
      temp.documentoRelacionadoId = this.documentoRelacionado;
    }


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


    let destinatarios: DocumentoJsonDestinatario = new DocumentoJsonDestinatario();
    destinatarios.actor = actores;
    destinatarios.contacto = contactos;
    destinatarios.grupo = grupos;

    temp.jsonDestinatario = JSON.stringify(destinatarios);


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

    temp.jsonDestinatario = JSON.stringify(destinatarios);
    temp.jsonCcp = JSON.stringify(cpp);

    temp.nombreRemitente = this.usuario.nombre;
    temp.remitenteId = this.usuario.usuario_id;

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info'
    });

    Swal.showLoading()

    var doc: DocumentoAnexoMdl = new DocumentoAnexoMdl();
    doc.documento = temp;

    doc.anexosList = this.ListaAnexo64;

    doc.anexosList.forEach(element => {
      element.anexo.documentoId = temp.documentoId;
    })

    peticion = this.dinamicoService.postClase(this.endpoint.ruta + "/minio", doc);

    peticion.subscribe(resp => {

      this.PdfFinal(resp.documento.documentoId);

      Swal.fire({
        title: "ok",
        text: 'Realizado correctamente',
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
    let peticion: Observable<any>

    let temp: DocumentoMdl = this.formGroup.value;
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

    let destinatarios: DocumentoJsonDestinatario = new DocumentoJsonDestinatario();
    destinatarios.actor = actores;
    destinatarios.contacto = contactos;
    destinatarios.grupo = grupos;

    temp.jsonDestinatario = JSON.stringify(destinatarios);


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

    temp.jsonDestinatario = JSON.stringify(destinatarios);
    temp.jsonCcp = JSON.stringify(cpp);

    temp.nombreRemitente = this.usuario.nombre;
    temp.remitenteId = this.usuario.usuario_id;

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info'
    });

    Swal.showLoading()

    if (this.isSave) {
      temp.ctrlCreadoPor = this.usuario.usuario_id;
      temp.ctrlActualizadoPor = this.usuario.usuario_id;

      peticion = this.dinamicoService.postClase(this.endpoint.ruta, temp);
    }
    else {
      peticion = this.dinamicoService.putClase(this.endpoint.ruta, temp, this.id);
    }

    peticion.subscribe(resp => {
      this.PdfFinal(resp);

      Swal.fire({
        title: "ok",
        text: 'Realizado correctamente',
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

  openDialog(array: any[], nombre: string): void {

    let arreglo: any[] = [];
    if (nombre == "Destinatarios") {
      arreglo = this.destinatarios;
    } else if (nombre == "CPP") {
      arreglo = this.Cpp;
    }

    let tipoDocumento: string[] = [];
    try {
      if (this.formGroup.controls.tipoDocumentoId.value.nombre == "Oficio" ||
        this.formGroup.controls.tipoDocumentoId.value.nombre == "Tarjeta") {
        tipoDocumento = ["Funcionario", "Contacto"];
      } else if (this.formGroup.controls.tipoDocumentoId.value.nombre == "Circular") {
        tipoDocumento = ["Grupo"];
      }
      else {
        tipoDocumento = [""];
      }
    }
    catch{
      tipoDocumento = [""];
    }

    const dialogRef = this.dialog.open(DocumentoDialogComponent, {
      width: '50%',
      data: { destinatarios: arreglo, nombre: nombre, tipoDocumento: tipoDocumento, multiple: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}