import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDinamicoData, DocumentoData } from 'src/app/_utils/interface/interfaz';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { DocumentoDestinatarioContactoModel, DocumentoChipModel, DocumentoBusquedaOrganizacion } from 'src/app/_modelos/documento';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
import { DinamicoService } from 'src/app/_utils/services/dinamico.service';
import { DropdownComponent } from 'src/app/pages/componentes-dinamicos/dropdown/dropdown.component';
import { element } from 'protractor';
import { ContactoMdl } from 'src/app/_modelos/contacto';
import { DialogDinamicoComponent } from 'src/app/pages/componentes-dinamicos/dialog/dialog.component';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-documento-dialog',
  templateUrl: './documento-dialog.component.html',
  styleUrls: ['./documento-dialog.component.scss']
})
export class DocumentoDialogComponent implements OnInit {

  destinatarios: any[] = [];          // arreglo donde se guardaran todos los destinatarios
  nombre: string;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  loading = false;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];  // mat-chip-list usa estos separadores
  tipoRegistro: string;
  dependenciaId: any = "";
  grupoOrganizacionalId: any = "";

  errorMensaje = "";

  puesto: string = "";
  Busqueda: DocumentoBusquedaOrganizacion = new DocumentoBusquedaOrganizacion();
  listaActores: any[] = [];
  listaGrupos: any[] = [];

  options: string[] = [];
  optionsPostGrupo: any = { "ruta": "/webresources/grupoenvio/list", "busqueda": [] };
  optionsPostContacto: any = { "ruta": "/webresources/contacto/list", "busqueda": { "stringBusqueda": "" } };

  busquedaPost:any={};
  multipleRegistros: boolean = false;
  leyenda: any = null;

  @ViewChild('selectGrupo', { static: false }) selectGrupo: DropdownComponent;
  @ViewChild('selectActor', { static: false }) selectActor: DropdownComponent;
  usuario: any;


  constructor(
    public dialogRef: MatDialogRef<DocumentoDialogComponent>,
    private dinamicoService: DinamicoService,   // servicio dinamico que se puede usar en cualquier endpoint
    public apiService: OpenApiService,        // servicio para comunicar con el openapi.json
    @Inject(MAT_DIALOG_DATA) public data: DocumentoData,
    public dialog: MatDialog
  ) {
    dialogRef.beforeClosed().subscribe(() => dialogRef.close(this.data));
    this.options = data.tipoDocumento;
    this.tipoRegistro = data.tipoDocumento[0];
    this.multipleRegistros = data.multiple;

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {

    this.usuario = this.apiService.getCurrentUser();
    debugger
    this.busquedaPost.dependenciaId =this.usuario.destinatarios[0].dependencia_id;
    this.busquedaPost.grupoOrganizacionalId =this.usuario.grupo_organizacional_remitente_id;
    this.busquedaPost.stringBusqueda ="%";
    this.optionsPostContacto.busqueda=this.busquedaPost;
    
    this.destinatarios = this.data.destinatarios;
    this.nombre = this.data.nombre;
  }

  removeDestinatario(destinatario: any): void { // metodo personalizado para eliminar un destinatario a los mat-chip-list
    const index = this.destinatarios.indexOf(destinatario);

    if (index >= 0) {
      this.destinatarios.splice(index, 1);
    }
  }

  dependenciaSelect(event) {
    console.log(event);
    this.dependenciaId = event.dependenciaId;
    this.selectGrupo.BusquedaGet("/webresources/grupoorganizacional/list/" + this.dependenciaId, []);
  }

  selectleyenda(event) {
    this.leyenda = event;
    this.errorMensaje = ""

  }

  grupoSelect(event) {
    console.log(event);
    this.grupoOrganizacionalId = event.grupoOrganizacionalId;

    this.Busqueda = new DocumentoBusquedaOrganizacion();
    this.Busqueda.dependenciaId = this.dependenciaId;
    this.Busqueda.grupoOrganizacionalId = this.grupoOrganizacionalId;
    this.Busqueda.stringBusqueda = "";

    if (this.data.remitenteDestinatario == "E") {
      this.selectActor.BusquedaPost("/webresources/grupoorganizacional/list/destinatario", this.Busqueda);

    } else {
      this.selectActor.BusquedaPost("/webresources/grupoorganizacional/list/remitente", this.Busqueda);

    }
  }



  BuscarActores(event) {

    this.dinamicoService.postClase("/webresources/grupoorganizacional/list", this.Busqueda).subscribe(resp => {

    });

  }

  AgregarRegistro(event) {
    debugger

    if (this.leyenda == null) {

      this.errorMensaje = "Seleccionar leyenda, antes de agregar un funcionario"
      return;
    }

    if (this.multipleRegistros == true) {

    }
    else {
      this.destinatarios.forEach(element => {

        const index = this.destinatarios.indexOf(element);

        if (index >= 0) {
          this.destinatarios.splice(index, 1);
        }
      }

      )
    }

    if (this.tipoRegistro == "Funcionario") {

      let actorObject: DocumentoChipModel = new DocumentoChipModel();
      actorObject.tipo = "Actor";
      actorObject.color = "chipActor";
      actorObject.entidad = event;
      actorObject.entidad.leyenda = this.leyenda;

      if (this.data.remitenteDestinatario == "E") {
        actorObject.nombre = event.puesto_destinatario + " : " + event.nombre_destinatario + " -" + this.leyenda.nombre;
      } else {
        actorObject.nombre = event.puesto_remitente + " : " + event.nombre_remitente + " -" + this.leyenda.nombre;
      }

      this.destinatarios.push(actorObject);

    }
    else if (this.tipoRegistro == "Contacto") {

      let contactoObject: DocumentoChipModel = new DocumentoChipModel();
      contactoObject.tipo = "Contacto";
      contactoObject.color = "chipContacto";
      contactoObject.entidad = event;
      contactoObject.entidad.leyenda = this.leyenda;


      contactoObject.nombre = event.puesto_destinatario + " : " + event.nombre_destinatario + " -" + this.leyenda.nombre;

      this.destinatarios.push(contactoObject);
    }
    else if (this.tipoRegistro == "Grupo") {
      let grupoModel: DocumentoDestinatarioContactoModel = new DocumentoDestinatarioContactoModel();


      let grupoObject: DocumentoChipModel = new DocumentoChipModel();
      grupoObject.tipo = "Grupo";
      grupoObject.color = "chipGrupo";
      grupoObject.entidad = event;
      grupoObject.nombre = event.nombre + " : " + event.descripcion + " -" + this.leyenda.nombre;
      grupoObject.entidad.leyenda = this.leyenda;

      this.destinatarios.push(grupoObject);
    }

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


  openDialogContacto(): void {

    if (this.leyenda == null) {

      this.errorMensaje = "Seleccionar leyenda, antes de agregar un funcionario"
      return;
    }

    this.loading = true;

    var contacto: ContactoMdl = new ContactoMdl();
    contacto.dependenciaId = this.usuario.organizacion_remitente_id;
    contacto.grupoOrganizacionalId = this.usuario.grupo_organizacional_remitente_id;
    // var actor: ContactoMdl = new ContactoMdl();

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
        debugger
        // this.addContacto(result);
        this.loading = false;
      }
      else {
        this.loading = false;
      }
      console.log('The dialog was closed');
    });
  }


  async addContacto(result) {
    await delay(20000);

    this.dinamicoService.postClase("/webresources/contacto/list", { stringBusqueda: "" }).subscribe(resp => {
      this.dinamicoService.postClase("/webresources/contacto/list", { stringBusqueda: "" }).subscribe(resp2 => {
        debugger
        var lista: any[] = resp2;
        var contacto = lista.find(element => element.destinatario_id = (result.respuesta.contactoId - 1));
        if (contacto) {
          this.AgregarRegistro(contacto);
          this.loading = false;
        }
        else {
          this.loading = false;
        }
      });

    }, console => {
      this.loading = false;
    }
    );

  }

}
