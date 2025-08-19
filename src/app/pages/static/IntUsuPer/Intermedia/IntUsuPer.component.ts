import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators, FormBuilder, Form } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IntUsuPerService } from 'src/app/_utils/services/Service-Entidades/IntUsuPer';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { UsuarioMdl } from 'src/app/_modelos/Usuario';
import { PerfilMdl } from 'src/app/_modelos/Perfil';
import { DependenciaMdl } from 'src/app/_modelos/dependencia';
import { IUsuarioPerfilMdl } from 'src/app/_modelos/IUsuarioPerfil';
import { element } from 'protractor';
import { ReplaceSource } from 'webpack-sources';


@Component({
  selector: 'app-intermedia',
  templateUrl: './IntUsuPer.component.html',
  styles: ['./IntUsuPer.component.scss']
})


export class IntermediaComponent implements OnInit {

  IusuarioPerfil: IUsuarioPerfilMdl = new IUsuarioPerfilMdl()
  ListadoIusuarioPerfil: IUsuarioPerfilMdl[] = [];

  ListadoIup: IUsuarioPerfilMdl[] = [];

  user: UsuarioMdl = null;
  usuarios: UsuarioMdl[] = []
  usuarioss: number = 0;

  usuarioDis: boolean = false;
  userLocal: boolean = true;

  password1: string = "";
  password2: string = "";

  perfil: PerfilMdl = new PerfilMdl()
  perfils: PerfilMdl[] = []
  perfilesSeleccionados: PerfilMdl[] = []

  perfilss: number = 0;

  dependencia: DependenciaMdl = new DependenciaMdl()
  dependencias: DependenciaMdl[] = []
  dependenciass: number = 0;

  areas: any[] = []


  dropdownPerfilSettings: any = {
    singleSelection: false,
    idField: 'perfilId',
    textField: 'nombre',
    selectAllText: 'Seleccionar todo',
    unSelectAllText: 'Quitar todo',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };

  selectedPerfil: PerfilMdl[] = [];
  PerfilRelacionadolist: PerfilMdl[] = []

  get f() { return this.intermediaGroupForm.controls; }
  isSave: boolean = true


  intermediaGroupForm: FormGroup;
  interGroup: FormGroup;

  constructor(
    private Iservice: IntUsuPerService,
    private route: ActivatedRoute,
    private _formbuilder: FormBuilder,

  ) {

    this.interGroup = new FormGroup({
      perfilId: new FormControl('', Validators.required)

    });

  }

  ngOnInit() {

    var local = this.route.snapshot.paramMap.get('local')

    if (local != null) {
      this.userLocal = false;
    }

    this.Iservice.GetDependencia()
      .subscribe(res => {
        this.dependencias = res

        const id = this.route.snapshot.paramMap.get('id')

        this.Iservice.GetPerfil()
          .subscribe(res => {
            this.perfils = res

            if (id !== 'new') {
              this.isSave = false

              this.Iservice.GetListPerfilByUsuarioId(Number.parseInt(id)).subscribe(resPer => {

                this.user = resPer[0].usuarioId;
                this.user.contrasenha = null;
                this.ListadoIusuarioPerfil = resPer;

                var listaPer: any[] = [];
                resPer.forEach(element => {
                  var per = this.perfils.find(perfil => perfil.perfilId == element.perfilId.perfilId)

                  if (element.ctrlActivo == true) {
                    listaPer.push(per);
                  }

                });

                var dependencia = this.dependencias.find(dependencia => dependencia.dependenciaId == this.user.dependenciaId.dependenciaId)
                this.user.dependenciaId = dependencia;

                this.Iservice.GetGrupoOrganizacionalByDependenciaId(Number.parseInt(this.user.dependenciaId.dependenciaId)).subscribe(

                  areasList => {
                    debugger
                    this.areas = areasList;

                    var area = this.areas.find(area => area.grupoOrganizacionalId == this.user.grupoOrganizacionalId)
                    this.user.grupoOrganizacionalId = area;

                    this.perfilesSeleccionados = listaPer;
                    this.intermediaGroupForm = this._formbuilder.group(this.user)
                    this.usuarioDis = true;
                    this.intermediaGroupForm.controls.usuario.disable()
                  },
                  error => {

                    this.perfilesSeleccionados = listaPer;
                    this.intermediaGroupForm = this._formbuilder.group(this.user)
                    this.intermediaGroupForm.controls.usuario.disable()
                    this.usuarioDis = true;

                  }

                )


              })
            }

            else {

              this.user = new UsuarioMdl();
              this.intermediaGroupForm = this._formbuilder.group(this.user);

            }

          })
      })



  }

  guardarUsuario() {
    debugger

    if (this.intermediaGroupForm.invalid) {
      console.log('Form no valido')
      return
    }

    let peticion: Observable<any>
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    })

    let userTemp
    userTemp = this.intermediaGroupForm.getRawValue();

    userTemp.ctrlActivo = true
    userTemp.ctrlCreadoPor = 1;
    userTemp.ctrlActualizado = new Date();
    userTemp.ctrlCreado = new Date();
    userTemp.ctrlActualizadoPor = 1;

    // this.user.dependenciaId = Number(this.user.dependenciaId)

    let IntPerUsuTem: any = userTemp;

    this.ListadoIup = [];

    this.perfilesSeleccionados.forEach(perfil => {
      var tempIsuarioPerfil: IUsuarioPerfilMdl = new IUsuarioPerfilMdl();

      tempIsuarioPerfil.ctrlActivo = true
      tempIsuarioPerfil.ctrlCreadoPor = 1;
      tempIsuarioPerfil.ctrlActualizado = new Date();
      tempIsuarioPerfil.ctrlCreado = new Date();
      tempIsuarioPerfil.ctrlActualizadoPor = 1;

      this.perfils.forEach(perf => {
        if (perf.perfilId == perfil.perfilId) {
          tempIsuarioPerfil.perfilId = perf;
        }
      })

      tempIsuarioPerfil.usuarioId = userTemp;

      debugger

      /*    try {
           tempIsuarioPerfil.usuarioId.grupoOrganizacionalId = tempIsuarioPerfil.usuarioId.grupoOrganizacionalId.grupoOrganizacionalId
         } catch (error) {
   
         }
   
         try {
           tempIsuarioPerfil.usuarioId.dependenciaId = tempIsuarioPerfil.usuarioId.dependenciaId.dependenciaId
   
         } catch (error) {
   
         } */

      var temp = this.ListadoIusuarioPerfil.find(iu => iu.perfilId.perfilId == perfil.perfilId)
      debugger
      if (temp) {
        this.ListadoIup.push(temp);
      }
      else {
        this.ListadoIup.push(tempIsuarioPerfil);
      }

    })

    this.ListadoIusuarioPerfil.forEach(element => {
      if (element.ctrlActivo == false) {
        this.ListadoIup.push(element);
      }
    })

    userTemp.dependenciaId = userTemp.dependenciaId.dependenciaId
    userTemp.grupoOrganizacionalId = userTemp.grupoOrganizacionalId.grupoOrganizacionalId

    this.ListadoIup.forEach(element => {
      element.usuarioId = userTemp

      /*    try {
           element.usuarioId.grupoOrganizacionalId = element.usuarioId.grupoOrganizacionalId.grupoOrganizacionalId
         } catch (error) {
   
         }
   
         try {
           element.usuarioId.dependenciaId = element.usuarioId.dependenciaId.dependenciaId
   
         } catch (error) {
   
         } */

    })

    Swal.showLoading()

    if (userTemp.usuarioId) {
      userTemp.ctrlCreado = userTemp.ctrlCreado
      peticion = this.Iservice.IntUsuPerCreate(this.ListadoIup)
      console.log(this.ListadoIup)
    }

    else {

      userTemp.ctrlCreado = new Date()
      console.log(userTemp)
      peticion = this.Iservice.IntUsuPerCreate(this.ListadoIup)
    }

    peticion.subscribe(resp => {
      Swal.fire({
        title: userTemp.usuario,
        text: 'Realizado correctamente',
        icon: 'success',
      })
    },

      error => {
        if (error.error) {
          Swal.fire({
            title: this.user.usuario,
            text: error.error.message,
            icon: 'error',
          })
        }
        else {
          Swal.fire({
            title: this.user.usuario,
            text: 'error',
            icon: 'error',
          })

        }


      },

    )

  }

  onDependenciaSelect(e: any) {
    debugger

    e.value.dependenciaId
    this.Iservice.GetGrupoOrganizacionalByDependenciaId(Number.parseInt(e.value.dependenciaId)).subscribe(resPer => {
      this.areas = resPer;
      debugger

    })

  }

  onUserEdit(e: any) {
    this.intermediaGroupForm.controls.usuario.setValue(e);
  }

  onUserChange(e: any) {

    debugger

    let nombre: string = "";
    let apellidoPaterno: string = "";
    let apellidoMaterno: string = "";

    try {
      nombre = this.intermediaGroupForm.controls.nombre.value
      nombre = nombre.substr(0, 1);
    } catch (error) {
      nombre = "";
    }

    try {
      apellidoPaterno = this.intermediaGroupForm.controls.apellidoPaterno.value

    } catch (error) {
      apellidoPaterno = "";

    }

    try {
      apellidoMaterno = this.intermediaGroupForm.controls.apellidoMaterno.value
      apellidoMaterno = apellidoMaterno.substr(0, 1);

    } catch (error) {
      apellidoMaterno = "";

    }


    if (this.intermediaGroupForm.controls.usuario.value == null) {
      if (nombre == null) {
        nombre = "";
      }

      if (apellidoPaterno == null) {
        apellidoPaterno = "";
      }

      if (apellidoMaterno == null) {
        apellidoMaterno = "";
      }
      debugger
      let temp = nombre.toLocaleLowerCase() + apellidoPaterno.toLocaleLowerCase() + apellidoMaterno.toLocaleLowerCase();

      if (nombre != "" && apellidoPaterno != "" && apellidoMaterno != "") {

        temp = temp
          .replace('á', 'a')
          .replace('é', 'e')
          .replace('í', 'i')
          .replace('ó', 'o')
          .replace('ú', 'u');
        this.intermediaGroupForm.controls.usuario.setValue(temp);
        this.user.usuario = temp;
      }

    }

  }


  onPerfilSelect(e: any) {

  }


  onPerfilDeSelect(e: any) {

    var temp = this.ListadoIusuarioPerfil.findIndex(iu => iu.perfilId.perfilId == e.perfilId)
    debugger
    try {
      this.ListadoIusuarioPerfil[temp].ctrlActivo = false;
    } catch (error) {

    }
    /* if (temp) {
      this.ListadoIusuarioPerfil[temp].ctrlActivo = false;
    }
    else {

    }
 */
    debugger
  }


  guardarInversion() {
    console.log('Guardar')
  }

  cambiarPassword() {

    this.password1.length
    if (this.password1 == this.password2 && this.password2 != "" && this.password2 != null && this.password1.length > 7) {
      this.intermediaGroupForm.controls.contrasenha.setValue(this.password1);
      this.guardarUsuario()
    }
  }

}














