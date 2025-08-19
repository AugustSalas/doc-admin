import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DependenciaMdl } from 'src/app/_modelos/dependencia';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
import { Observable } from 'rxjs';
import { GrupoOrganizacionalMdl, GrupoOrganizacionalMembreteMdl } from 'src/app/_modelos/grupoOrganizacional';
import { Anexo64Mdl, AnexoMdl } from 'src/app/_modelos/anexo';
import { MembreteMdl, MembreteMdl64Mdl } from 'src/app/_modelos/membrete';
import { GrupoOrganizacionalService } from 'src/app/_utils/services/Service-Entidades/grupoOrganizacional.service';
import { ActorMdl } from 'src/app/_modelos/actor';
import { DinamicoService } from 'src/app/_utils/services/dinamico.service';

@Component({
  selector: 'app-grupo-organizacional-formulario',
  templateUrl: './grupo-organizacional-formulario.component.html',
  styleUrls: ['./grupo-organizacional-formulario.component.scss']
})
export class GrupoOrganizacionalFormularioComponent implements OnInit {

  gpOrg: GrupoOrganizacionalMdl = null;
  gO:any;
  gos: GrupoOrganizacionalMdl[] = []
 

  dependencia: DependenciaMdl = new DependenciaMdl()
  dependencias: DependenciaMdl[] = []
  dependenciass: number = 0;

  actor: ActorMdl = new ActorMdl()
  actors: ActorMdl[] = []
  actorss: number = 0;



  formGroup: FormGroup;

  get f() { return this.formGroup.controls; }
  isSave: boolean = true


  /// variable usadas para los adjuntos
  selectedFile: File = null;
  imagenGroupForm: FormGroup;
  imagenGroupForm2: FormGroup;
  labelImage: string = 'Seleccionar Imagen';
  inputImage: any = [];
  membrete64: MembreteMdl64Mdl = new MembreteMdl64Mdl();
  imagenLoading: boolean = false;
  /// variable usadas para los adjuntos


  constructor(
    private _formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private GOservice: GrupoOrganizacionalService,  
    private dinamicoService: DinamicoService,
    public apiService: OpenApiService,

  ) {

  }

  ngOnInit() {

    this.GOservice.GOFindall()
      .subscribe(res => {

        this.gos = res
      })

    this.GOservice.GetDependencia()
      .subscribe(res => {

        this.dependencias = res

        //obtengo el parametro en la ruta GET
        const id = this.route.snapshot.paramMap.get('id')
        if (id !== 'new') {
          this.isSave = false
          //Editar

          this.GOservice.GOFindMembrete(Number(id)).subscribe((resp: GrupoOrganizacionalMembreteMdl) => {

              this.gpOrg = resp.grupoOrganizacional;
              this.membrete64.membrete = resp.grupoOrganizacional.membrete;
              this.membrete64.base64 = resp.base64;
              this.formGroup = this._formbuilder.group(this.gpOrg);

            })
          this.GOservice.GOFind(Number(id)).subscribe((resp :GrupoOrganizacionalMdl) => { 

            this.dinamicoService.getListado("/webresources/actor").subscribe(respActores => {

              respActores.forEach(element => {
                element.NombreCompleto = element.nombre + " " + element.apellidoPaterno + " " + element.apellidoMaterno;
              })
  
              this.actors = respActores;
  
              debugger
              this.gpOrg = resp
  
            
             let endpointActor = this.apiService.BuscarEndpointPorClase("#/components/schemas/Actor");

              debugger
              if(this.gpOrg.titularGrupoOrganizacional != null){

              this.actor = this.actors.find(a => a.actorId == this.gpOrg.titularGrupoOrganizacional.actorId)
              this.gpOrg.titularGrupoOrganizacional = this.actor

              }

              if(this.gpOrg.grupoOrganizacionalPadre != null) {

              this.gpOrg.grupoOrganizacionalPadre = this.gpOrg.grupoOrganizacionalPadre.grupoOrganizacionalId

              }
              
              this.formGroup = this._formbuilder.group(this.gpOrg);
  
            })
          })
          
        } else {

          this.dinamicoService.getListado("/webresources/actor").subscribe(respActores => {

            respActores.forEach(element => {
              element.NombreCompleto = element.nombre + " " + element.apellidoPaterno + " " + element.apellidoMaterno;
            })
            this.actors = respActores;
          })

          this.gpOrg = new GrupoOrganizacionalMdl();
          this.formGroup = this._formbuilder.group(this.gpOrg);
        }

      })

      
  }

  onSelectOrg(id: number) {
    debugger
    this.GOservice.GOFindall()
      .subscribe(res => {
        this.gO = res
      })
  }


  //guardarDependencia(form: NgForm){
  guardarGrupOrganizacional() {

    debugger

    if (this.formGroup.invalid) {
      //Aquí va la validación del form
      console.log(this.formGroup)
      console.log('Form no valido')
      return
    }

    if (this.membrete64.base64 == "") {
      //Aquí va la validación del form
      Swal.fire({
        title: 'Seleccionar imagen',
        text: 'Se require una imágen para el membrete del Área de adscripción',
        icon: 'info',
        allowOutsideClick: false
      })
      return
    }

    let peticion: Observable<any>
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    })

    debugger

    let tempgpOrg = this.formGroup.value;
    tempgpOrg.ctrlActivo = true;
    tempgpOrg.ctrlCreadoPor = 1;
    tempgpOrg.ctrlActualizado = new Date();
    tempgpOrg.ctrlActualizadoPor = 1;
    tempgpOrg.titularGrupoOrganizacional = Number(tempgpOrg.titularGrupoOrganizacional.actorId);

    if(tempgpOrg.grupoOrganizacionalPadre == null){

    tempgpOrg.grupoOrganizacionalPadre = Number(tempgpOrg.grupoOrganizacionalId);
    tempgpOrg.grupoOrganizacionalId = null;

    } 

    if(tempgpOrg.grupoOrganizacionalPadre == 0) {

      tempgpOrg.grupoOrganizacionalPadre = null;
      //tempgpOrg.grupoOrganizacionalId = null;

    }

    var grupoMembrete: GrupoOrganizacionalMembreteMdl = new GrupoOrganizacionalMembreteMdl();
    grupoMembrete.base64 = this.membrete64.base64;
    grupoMembrete.grupoOrganizacional = tempgpOrg;
    grupoMembrete.grupoOrganizacional.membrete = this.membrete64.membrete;

     Swal.showLoading()

    peticion = this.GOservice.GOCreateMembrete(grupoMembrete)

    peticion.subscribe(resp => {
      Swal.fire({
        title: this.gpOrg.nombre,
        text: 'Realizado correctamente',
        icon: 'success',
      })
    },

      error => {
        if (error) {

        }

        Swal.fire({
          title: this.gpOrg.nombre,
          text: 'error',
          icon: 'error',
        })
      },

    )


  }

  onDependencia(event: any) {
    this.dependencia = this.dependencias.find(dep => dep.dependenciaId === event)
  }

  downloadFile(file, nombre) {
    const linkSource = file;
    const downloadLink = document.createElement("a");
    const fileName = nombre;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  onSelectFile(event) {  // se usa cuando se adjunta un documento
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var temp: any = [];
        temp.archivo = event.target.files[i];
        this.agregarImagen(temp)
      }
    }
    this.inputImage = [];
  }

  agregarImagen(imagen) { // se usa cuando se adjunta un documento

    var reader = new FileReader();

    reader.readAsDataURL(imagen.archivo);
    reader.onload = (event: any) => {
      imagen.imagen = event.target.result

      var membrete: MembreteMdl = new MembreteMdl();

      membrete.nombreArchivoOriginal = imagen.archivo.name;
      membrete.mime = imagen.archivo.type;
      membrete.nombre = imagen.archivo.name;
      membrete.descripcion = imagen.archivo.name;

      var membrete64: MembreteMdl64Mdl = new MembreteMdl64Mdl();

      membrete64.membrete = membrete;

      membrete64.base64 = event.target.result;


      if (this.membrete64.membrete.minioId != "") {
        membrete64.membrete.minioId = this.membrete64.membrete.minioId;

        membrete.nombreArchivoOriginal = imagen.archivo.name;
        membrete.mime = imagen.archivo.type;
        membrete.nombre = imagen.archivo.name;
        membrete.descripcion = imagen.archivo.name;

        this.membrete64 = membrete64;

      }
      else {
        this.membrete64 = membrete64;

      }

      console.log(this.membrete64);
      //  this.urls.push(imagen);
    }
  }

  eliminarImagen(file) { // cuando se eliminar un adjunto
    file.membrete.ctrlActivo = false;
  }
}
