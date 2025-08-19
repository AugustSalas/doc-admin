import {Component, OnInit} from '@angular/core';
import {BucketEntradaService} from '../../../../../_utils/services/Service-Entidades/BucketEntrada.service';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import {BucketEntradaMdl} from '../../../../../_modelos/bucketentrada1';
import { Router } from '@angular/router';

@Component ({
    selector:'app-actor',
    templateUrl:'./Listado-BEU.component.html',
    styleUrls:['./Listado-BEU.component.scss']
})


export class ListadoBucketEntradaUrgentesComponent implements OnInit {

    bucket: BucketEntradaMdl = new BucketEntradaMdl();
    data:any[] = []
    buckets: BucketEntradaMdl[]=[]
    p:number = 1

    cols:any[]=[

        {field:"bucketEntradaId", header:"Bandeja Entrada"},
        {field:"folioEntrada", header:"Folio Entrada"},
        {field:"fechaEntrada", header:"Fecha Entrada"},
       // {field:"ccp", header:"Ccp"},
        {field:"grupoOrganizacionalnombre", header:"Área adscripción"},
        {field:"documentoAsunto", header:"Documento"},
        {field:"organizacionnombre", header:"Organizacion"},
        { field: "estatus", header: "Estatus" },
        {field: "Acciones", header: "Acciones"},
    ];

    isSave: boolean = true

    constructor(private BEservice: BucketEntradaService,
      private router: Router){ }

    ngOnInit(){
        this.BEservice.BucketEntradaUrgentesFindall()
        .subscribe(resp => {
            this.buckets = resp
            this.buckets = this.buckets.filter(a => a.ctrlActivo == true)
            this.data = this.buckets;     

            this.data.forEach(element => {

              try {
                element.fechaEntrada =new Date(element.fechaEntrada).toLocaleDateString();
              } catch{
                element.fechaEntrada = "";
              }

              try {
                element.grupoOrganizacionalnombre = element.grupoOrganizacionalId.nombre
              } catch{
                element.grupoOrganizacionalnombre = "";
              }
    
              try {
                element.documentoAsunto=element.documentoFisicoId.asunto
              }catch{
                element.documentoAsunto="";
              }
    
              try {
                element.organizacionnombre = element.organizacionId.nombre
              } catch{
                element.organizacionnombre = "";
              }

              try {
                element.estatus = element.documentoFisicoId.estatusDocumentoId.nombre
              } catch{
                element.estatus = "";
              }

            })

        })
    }

    borrarBucket(buck: BucketEntradaMdl,  i:number){
        Swal.fire({
          title:'Eliminar',
          text:`Eliminará  ${buck.bucketEntradaId}`,
          icon: 'question',
          showConfirmButton:true,
          showCancelButton:true
        }).then(resp => {
          if(resp.value){
            // this.dependencias.splice(i, 1)
            this.buckets = this.buckets.filter( b => b.bucketEntradaId !== buck.bucketEntradaId)
            this.data = this.buckets.filter(b => b.bucketEntradaId !== buck.bucketEntradaId)
            buck.ctrlActivo = false;
            console.log(buck)
            this.BEservice.BucketEntradaRemove(
              buck.bucketEntradaId,
              buck
              ).subscribe()
          }
        })
      }


      visorDocumentos(data) {

        if (data.documentoId != null) {
          this.router.navigate(['/bucket/visor/documento/', data.documentoId.documentoId]);
        }
        else {
          this.router.navigate(['/bucket/visor/documentoFisico/', data.documentoFisicoId.documentoFisicoId]);
        }
    
      }

      
      DocRelacionado(data) {

        if (data.documentoId == null) {
          this.router.navigate(['/documentorelacionado/formulariofisico/'+ data.documentoFisicoId.documentoFisicoId+ "/new/bucketEntrada"]);
        }
        else {
          this.router.navigate(['/documentorelacionado/formulario/', data.documentoId.documentoId+ "/new/bucketEntrada"]);
        }
    
      }

      Cerrar(bucket):void {

  
        const id = bucket.bucketEntradaId;
    
        if (id !== 'new') {
          this.isSave = false

          debugger
          this.BEservice.BucketEntradaFind(Number(id)).subscribe((resp: BucketEntradaMdl) => {
    
            resp.documentoFisicoId.estatusDocumentoId = 3;
    
            
    
            let peticion: Observable<any>
            Swal.fire({
              title: 'Espere',
              text: 'Guardando información',
              icon: 'info',
              allowOutsideClick: false
            })
    
            debugger
            peticion = this.BEservice.AutorizarEstatus(resp.documentoFisicoId.documentoFisicoId, resp.documentoFisicoId)
           
    
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
    
    
    
    
          })
    
        }
    
      }


      CambEstatus(bucket):void {

  
        const id = bucket.bucketEntradaId;
    
        if (id !== 'new') {
          this.isSave = false
    
          this.BEservice.BucketEntradaFind(Number(id)).subscribe((resp: BucketEntradaMdl) => {
    
            resp.documentoFisicoId.estatusDocumentoId = 6;
    
            
    
            let peticion: Observable<any>
            Swal.fire({
              title: 'Espere',
              text: 'Guardando información',
              icon: 'info',
              allowOutsideClick: false
            })
    
            peticion = this.BEservice.AutorizarEstatus(resp.documentoFisicoId.documentoFisicoId, resp.documentoFisicoId)
           
    
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
    
    
    
    
          })
    
        }
    
      }

    }