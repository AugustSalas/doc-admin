import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators, FormBuilder, Form } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { Location } from '@angular/common';
import { TrazaInternaService } from 'src/app/_utils/services/Service-Entidades/TrazaInternaService';
import {BucketEntradaService} from '../../../../_utils/services/Service-Entidades/BucketEntrada.service';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { TrazaInternaMdl } from 'src/app/_modelos/Traza_interna';
import { DocumentoMdl } from 'src/app/_modelos/documento';
import { EstatusTurnoMdl } from 'src/app/_modelos/EstatusTurno';
import { GrupoOrganizacionalMdl } from 'src/app/_modelos/grupoOrganizacional';
import { OrganizacionMdl } from 'src/app/_modelos/organizacion';
import { BucketEntradaMdl } from 'src/app/_modelos/bucketentrada1';
import { DinamicoService } from 'src/app/_utils/services/dinamico.service';
import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';
import { DocumentoFisicoService } from 'src/app/_utils/services/Service-Entidades/documentoFisico.service';




@Component({
  selector: 'app-turno',
  templateUrl: './turno-bucket.component.html',
  styleUrls: ['./turno-bucket.component.scss']
})


export class TurnoBucketFormularioComponent implements OnInit {



  TI: TrazaInternaMdl = new TrazaInternaMdl()

  documento: DocumentoMdl = new DocumentoMdl()
  documentos: DocumentoMdl[] = []
  documentoss: number = 0;

  bucket: BucketEntradaMdl = new BucketEntradaMdl()
  buckets: BucketEntradaMdl[] = []
  bucketss: number = 0;

  ET: EstatusTurnoMdl = new EstatusTurnoMdl()
  ETs: EstatusTurnoMdl[] = []
  ETss: number = 0;

  GO: GrupoOrganizacionalMdl = new GrupoOrganizacionalMdl()
  GOs: GrupoOrganizacionalMdl[] = []
  GOss: number = 0;

  organizacion: OrganizacionMdl = new OrganizacionMdl()
  organizacions: OrganizacionMdl[] = []
  organizacionss: number = 0;

  ListadoContacto: any[] = [];
  grupo: any=null;


  ListadoOrganizacion: any[] = [];

  
  formGroup: FormGroup;


  get f() { return this.formGroup.controls; }
  isSave: boolean = true

  constructor(
    private _formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private Route:Router,
    private router:Router,
    private _location: Location,
    private dinamicoService: DinamicoService,
    private TIservice: TrazaInternaService,
    private DFservice: DocumentoFisicoService,
    private BEservice: BucketEntradaService,
    public apiService: OpenApiService, ) {

    this.formGroup = this._formbuilder.group(this.TI);
    //this.formGroup.controls.grupoOrganizacionalIdOrigen.setValue(this.TI.grupoOrganizacionalIdOrigen);
    //this.formGroup.controls.organizacionIdOrigen.setValue(this.TI.organizacionIdOrigen);

  }

  ngOnInit() {

    this.grupo = this.apiService.getUsuarioToken();

    if (this.grupo.organizacion_remitente_id =! null ){
      console.log('ES ORGANIZACION')

    } else
    {
      console.log('ES GO')
    }

    debugger

    const id = this.route.snapshot.paramMap.get('id')
    if (id !== 'new') {
      this.isSave = false
      debugger
      //Editar

         this.TIservice.BucketEntradaFind(Number(id)).subscribe((resp: BucketEntradaMdl) => {

          let endpointActor = this.apiService.BuscarEndpointPorClase("#/components/schemas/Actor");

          this.dinamicoService.getIndividual(endpointActor.ruta, 1).subscribe(resp => {
          this.organizacion = resp;
          });

         // this.dinamicoService.getListado("/webresources/organizacion/list/"+ this.grupo.grupo_organizacional_remitente_id).subscribe(resp => {
         //Nuevo endpoint, sólo para turnar hacia GO - ORG 
         this.dinamicoService.getListado("/webresources/destinatarios/turnar").subscribe(resp => {

            debugger

          this.ListadoOrganizacion=resp;
          resp.forEach(element => {
          element.NombreCompleto =element.puesto_destinatario + " - "+ element.nombre_destinatario;
        })
      this.ListadoContacto = resp;
    });

        
          debugger

          var trazaInterna: TrazaInternaMdl = new TrazaInternaMdl();

          trazaInterna.documentoFisicoId = resp.documentoFisicoId;
          
          

          //Obtiene GO y ORG origen
          trazaInterna.grupoOrganizacionalIdOrigen = resp.grupoOrganizacionalId.grupoOrganizacionalId;
          this.formGroup.controls.grupoOrganizacionalIdOrigen.setValue(trazaInterna.grupoOrganizacionalIdOrigen);

          trazaInterna.organizacionIdOrigen = resp.organizacionId;
          this.formGroup.controls.organizacionIdOrigen.setValue(trazaInterna.organizacionIdOrigen);
          trazaInterna.mensaje = "";


          debugger

          this.formGroup = this._formbuilder.group(trazaInterna);

          debugger

        })
    }
  }



  guardarTurnoBucket() {

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
    //Valida si es enviado por una org, setea el id
    if (temp.organizacionIdOrigen != null) {
       temp.organizacionIdOrigen = temp.organizacionIdOrigen.organizacionId;
    }
    temp.trazaInternaId = null;

    debugger

    temp.trazaInternaId = null;
    temp.ctrlActivo = true;
    temp.ctrlCreadoPor = 1;
    temp.ctrlActualizado = new Date();
    temp.ctrlActualizadoPor = 1;
    temp.estatusTurnoId = 1;
    temp.agrupador = 1
    temp.documentoId =null;
    temp.ctrlCreado = new Date();


   // temp.organizacionIdDestino = Number(this.organizacion.organizacionId)  
  // var test:OrganizacionMdl=temp.organizacionIdDestino;
 //  temp.organizacionIdDestino=test;
 debugger

/* Validaciones para identificar si el destinarario es GO - ORG  */

 // Si trae no datos organización_destino, asigna los valores seleccionados a GO destino y nullea organización_destino
    if (temp.organizacionIdDestino.organizacion_destinatario_id == null){
        temp.grupoOrganizacionalIdDestino= temp.organizacionIdDestino;
        temp.organizacionIdDestino = null;
    }
    else {//Si no, es una organización y obtiene el ID
     temp.organizacionIdDestino=temp.organizacionIdDestino.organizacion_destinatario_id;
    }

   //Valida si viene nulo el GO destino, toma el GO origen y lo asigna a destino
   if (temp.grupoOrganizacionalIdDestino.grupo_organizacional_destinatario_id == null ){
        temp.grupoOrganizacionalIdDestino=temp.grupoOrganizacionalIdOrigen;
   }
   else{
    temp.grupoOrganizacionalIdDestino=temp.grupoOrganizacionalIdDestino.grupo_organizacional_destinatario_id

   }


   debugger


      Swal.showLoading()

    this.TI.ctrlCreado = new Date()
    console.log(this.TI)
    peticion = this.TIservice.TrazaInternaCreate(temp)

    debugger

    peticion.subscribe(resp => {
      Swal.fire({
        title: this.TI.trazaInternaId,
        text: 'Realizado correctamente',
        icon: 'success',
      })
      this.CambEstatusDocumento();
    },

    

      error => {
        if (error) {

        }

        debugger
        Swal.fire({
          title: this.TI.trazaInternaId,
          text: 'error',
          icon: 'error',
        })
      },

    )

 


  }


  
  CambEstatusDocumento():void {

  
    const id = this.route.snapshot.paramMap.get('id')
    if (id !== 'new') {
      this.isSave = false
      debugger

      this.BEservice.BucketEntradaFind(Number(id)).subscribe((resp: BucketEntradaMdl) => {

        debugger
        resp.documentoFisicoId.estatusDocumentoId = 5;

        let peticion: Observable<any>
        Swal.fire({
          title: 'Espere',
          text: 'Guardando información',
          icon: 'info',
          allowOutsideClick: false
        })

        debugger
        peticion = this.TIservice.AutorizarEstatusDocumento(resp.documentoFisicoId.documentoFisicoId, resp.documentoFisicoId)
       

        peticion.subscribe(resp => {


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
          this.router.navigate(['/bucket/lista']);
                  
      });

      })

    }
    
  
  }

  

}
