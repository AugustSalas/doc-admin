import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators, FormBuilder, Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TrazaInternaService } from 'src/app/_utils/services/Service-Entidades/TrazaInternaService';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { TrazaInternaMdl } from 'src/app/_modelos/Traza_interna';
import { DocumentoMdl } from 'src/app/_modelos/documento';
import { EstatusTurnoMdl } from 'src/app/_modelos/EstatusTurno';
import { GrupoOrganizacionalMdl } from 'src/app/_modelos/grupoOrganizacional';
import { OrganizacionMdl } from 'src/app/_modelos/organizacion';
import { DinamicoService } from 'src/app/_utils/services/dinamico.service';



@Component({
  selector: 'app-turno',
  templateUrl: './TurnoER-Responder.component.html',
  
})


export class TurnoRespuestaERComponent implements OnInit {



  TI: TrazaInternaMdl = new TrazaInternaMdl()

  documento: DocumentoMdl = new DocumentoMdl()
  documentos: DocumentoMdl[] = []
  documentoss: number = 0;

  ET: EstatusTurnoMdl = new EstatusTurnoMdl()
  ETs: EstatusTurnoMdl[] = []
  ETss: number = 0;

  GO: GrupoOrganizacionalMdl = new GrupoOrganizacionalMdl()
  GOs: GrupoOrganizacionalMdl[] = []
  GOss: number = 0;

  //  organizacion: OrganizacionMdl = new OrganizacionMdl()
  organizacions: OrganizacionMdl[] = []
  organizacionss: number = 0;

  ListadoContacto: any[] = [];
  grupo: any = null;


  ListadoOrganizacion: any[] = [];


  formGroup: FormGroup;
  usuario: any;


  get f() { return this.formGroup.controls; }
  isSave: boolean = true

  constructor(
    private _formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dinamicoService: DinamicoService,
    private TIservice: TrazaInternaService,
    public apiService: OpenApiService,) {

    this.formGroup = this._formbuilder.group(this.TI);
    //this.formGroup.controls.grupoOrganizacionalId.setValue(this.TI.grupoOrganizacionalIdOrigen);

  }

  ngOnInit() {

    this.grupo = this.apiService.getUsuarioToken();
    this.usuario = this.apiService.getCurrentUser();


    debugger

    const id = this.route.snapshot.paramMap.get('id')
    if (id !== 'new') {
      this.isSave = false
      debugger
      //Editar

      this.TIservice.TrazaInternaFind(Number(id)).subscribe((resp: TrazaInternaMdl) => {

        let endpointActor = this.apiService.BuscarEndpointPorClase("#/components/schemas/Actor");

     //   this.dinamicoService.getListado("/webresources/grupoorganizacional/listgoo/").subscribe(respGrupos => {
     //Nuevo endpont para obtener listado   
     this.dinamicoService.getListado("/webresources/destinatarios/responder").subscribe(respGrupos => {
          debugger

          this.ListadoOrganizacion = respGrupos;
          
          respGrupos.forEach(element => {
            if (element.organizacion_destinatario_id == null) {
              element.NombreCompleto = element.nombre_destinatario + " - " + element.grupo_organizacional_destinatario;
            } else {
              element.NombreCompleto = element.nombre_destinatario + " - " + element.organizacion_destinatario;
            }
          })


        /*  respGrupos.forEach(element => {

            if (element.grupo_organizacional_actor == null) {

              element.NombreCompleto = element.organizacion_actor + " - " + element.nombre_actor;
              
            } else {

              element.NombreCompleto = element.grupo_organizacional_actor + " - " + element.nombre_actor;

            } 

          }) */
          this.ListadoContacto = respGrupos;


          //debugger

          var trazaInterna: TrazaInternaMdl = new TrazaInternaMdl();
          trazaInterna.documentoFisicoId = resp.documentoFisicoId;
          
          debugger
        
          //Valida si el turno proviene de un grupo organizacional busca el elemento organizacion origen nulo
          if (resp.organizacionIdOrigen == null) { //validar despues correcto elemento org = null --- porque habrá inconsistencias si hay mas de 1 GO en el grupo
            let grupoOrgDestino = this.ListadoContacto.find(element => element.organizacion_destinatario_id == null);            
            //let grupoOrgOrigen = this.ListadoContacto.find(element => element.grupo_organizacional_destinatario_id == this.usuario.grupo_organizacional_remitente_id)
            let grupoOrgOrigen = this.ListadoContacto.find(element => element.grupo_organizacional_destinatario_id == this.usuario.grupo_organizacional_remitente_id);
            
            trazaInterna.grupoOrganizacionalIdOrigen = this.usuario.grupo_organizacional_remitente_id;
            trazaInterna.organizacionIdDestino = grupoOrgDestino;
            trazaInterna.organizacionIdOrigen = grupoOrgOrigen;
            trazaInterna.mensaje = "";
            this.formGroup = this._formbuilder.group(trazaInterna);

          } else { //Si el turno proviene de una organización
            let orgDestino = this.ListadoContacto.find(element => element.organizacion_destinatario_id == resp.organizacionIdOrigen.organizacionId);
           // let orgOrigen = this.ListadoContacto.find(element => element.organizacion_destinatario_id == this.usuario.organizacion_remitente_id)
            let orgOrigen = this.usuario.organizacion_remitente_id;

            trazaInterna.organizacionIdDestino = orgDestino;
            trazaInterna.organizacionIdOrigen = orgOrigen;
            trazaInterna.grupoOrganizacionalIdOrigen = resp.grupoOrganizacionalIdOrigen
            trazaInterna.mensaje = "";
            this.formGroup = this._formbuilder.group(trazaInterna);
          }



        });


        debugger

      })
    }
  }

  CambRespRER():void {

    debugger
    const id = this.route.snapshot.paramMap.get('id')
    if (id !== 'new') {
      this.isSave = false
      debugger
      //Editar
  
  
        this.TIservice.TrazaInternaFind(Number(id)).subscribe((resp: TrazaInternaMdl) => {
  
          debugger
          //resp.estatusTurnoId = 2;
          resp.estatusTurnoId = 6;
  
          
  
          let peticion: Observable<any>
          Swal.fire({
            title: 'Espere',
            text: 'Guardando información',
            icon: 'info',
            allowOutsideClick: false
          })
  
          debugger
          peticion = this.TIservice.AutorizarEstatus(resp.trazaInternaId, resp)
         
  
          peticion.subscribe(resp => {
  
  
            this.ngOnInit();
  
            Swal.fire({
              title: id,
              text: 'Realizado correctamente',
              icon: 'success',
            })
          },
  
            error => {
              if (error) {
  
              }
  
              Swal.fire({
                title:id,
                text: 'error',
                icon: 'error',
              })
            },
  
          )

          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/turnos/listaRespuestas']);
          
        }); 
  
          })
        
      }
    }

  guardarTurnoERR() {

    if (this.formGroup.invalid) {
      let temp: string[] = [];
      //Aquí va la validación del form
      console.log(this.formGroup)
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

    debugger

    let temp: TrazaInternaMdl = this.formGroup.value;



    // temp.organizacionIdDestino = this.TI.organizacionIdOrigen
    temp.organizacionIdOrigen = temp.organizacionIdOrigen;


    temp.trazaInternaId = null;

    debugger


    temp.ctrlActivo = true;
    temp.ctrlCreadoPor = 1;
    temp.ctrlActualizado = new Date();
    temp.ctrlActualizadoPor = 1;
    temp.estatusTurnoId = 2;
    //temp.estatusTurnoId = 6;
    temp.agrupador = 1
    temp.documentoId = null;
    temp.ctrlCreado = new Date();



    // temp.organizacionIdDestino = Number(this.organizacion.organizacionId)

    // var test:OrganizacionMdl=temp.organizacionIdDestino;
    //  temp.organizacionIdDestino=test;
    debugger

    //temp.organizacionIdDestino=this.ListadoOrganizacion.find(element=>element.organizacionId=temp.organizacionIdDestino.organizacionId)
    //var temp2=this.ListadoOrganizacion.find(element=>element.organizacionId=temp.organizacionIdDestino.organizacionId)





   /* Validaciones para identificar si el destinarario es GO - ORG  y el origen */
     
   // Si trae no datos organización_destino, asigna los valores seleccionados a GO destino y nullea organización_destino
     //Respuesta a un GO
    if (temp.organizacionIdDestino.organizacion_destinatario_id == null){
      //Valida si eres go u org
        if (this.usuario.organizacion_remitente_id == null){ //ORIGEN GO
          temp.grupoOrganizacionalIdDestino= temp.organizacionIdDestino.grupo_organizacional_destinatario_id;
          temp.organizacionIdDestino = null;
        }
        else { //ORIGEN ORG
          temp.grupoOrganizacionalIdDestino= temp.organizacionIdDestino.grupo_organizacional_destinatario_id;
          temp.organizacionIdDestino = null;
          temp.organizacionIdOrigen = this.usuario.organizacion_remitente_id;

        }
      }
      else {//Si no, la respuesta es a una organización  y origen organización
         temp.organizacionIdDestino=temp.organizacionIdDestino.organizacion_destinatario_id;
         temp.grupoOrganizacionalIdDestino=temp.grupoOrganizacionalIdOrigen.grupoOrganizacionalId
         temp.organizacionIdOrigen= this.usuario.organizacion_remitente_id; 
      
        }
  
    debugger


    Swal.showLoading()

    this.TI.ctrlCreado = new Date()
    console.log(this.TI)
    peticion = this.TIservice.TrazaInternaCreate(temp)


    peticion.subscribe(resp => {
      
    

      Swal.fire({
        title: this.TI.trazaInternaId,
        text: 'Realizado correctamente',
        icon: 'success',
      })
      this.CambRespRER();
      
    },

    

      error => {
        if (error) {

        }

        Swal.fire({
          title: this.TI.trazaInternaId,
          text: 'error',
          icon: 'error',
        })
      },

    )
    
  }


}
