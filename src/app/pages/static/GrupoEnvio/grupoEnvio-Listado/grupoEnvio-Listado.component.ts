import {Component, OnInit} from '@angular/core';
import {GrupoEnvioService} from '../../../../_utils/services/Service-Entidades/GrupoEnvio.service';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import {GrupoEnvioMdl} from '../../../../_modelos/GrupoEnvio';
import { Router } from '@angular/router';

@Component ({
    selector:'app-grupoEnvio',
    templateUrl:'./grupoEnvio-Listado.component.html',
    styleUrls:['./grupoEnvio-Listado.component.scss']
})


export class ListadoGrupoEnvioComponent implements OnInit {

    ge: GrupoEnvioMdl = new GrupoEnvioMdl();
    data:any[] = []
    ges: GrupoEnvioMdl[]=[]
    Ancho = "100%";
    p:number = 1


    cols:any[]=[

        {field:"grupoEnvioId", header:"Grupo Envío"},
        {field:"nombre", header:"Nombre"},
        {field:"descripcion", header:"Descripción"},
        {field: "organizacionnombre", header: "Organización" },
        {field: "grupoorganizacionalnombre", header: "Grupo Organizacional" },
        {field: "Acciones", header: "Acciones"},
    ];

    isSave: boolean = true

    constructor(private GEservice: GrupoEnvioService,
      private router: Router){ }


      ngOnInit(){
        this.GEservice.GEFindall()
        .subscribe(resp => {
            this.ges = resp
            this.ges = this.ges.filter(a => a.ctrlActivo == true)
            this.data = this.ges;     

            this.data.forEach(element => {
                
                try {
                    element.nombre = element.nombre
                  } catch{
                    element.nombre = "";
                  }

                  try {
                    element.descripcion = element.descripcion
                  } catch{
                    element.descripcion = "";
                  }

                  try {
                    element.organizacionnombre = element.organizacionId.nombre
                  } catch{
                    element.organizacionnombre = "";
                  }

                  try {
                    element.grupoorganizacionalnombre = element.grupoOrganizacionalId.nombre
                  } catch{
                    element.grupoorganizacionalnombre = "";
                  }


            })

        })
    }

    borrarGrupoEnvio(grupo: GrupoEnvioMdl,  i:number){
        Swal.fire({
          title:'Eliminar',
          text:`Eliminará  ${grupo.grupoEnvioId}`,
          icon: 'question',
          showConfirmButton:true,
          showCancelButton:true
        }).then(resp => {
          if(resp.value){
            // this.dependencias.splice(i, 1)
            this.ges = this.ges.filter( b => b.grupoEnvioId !== grupo.grupoEnvioId)
            this.data = this.ges.filter(b => b.grupoEnvioId !== grupo.grupoEnvioId)
            grupo.ctrlActivo = false;
            console.log(grupo)
            this.GEservice.GERemove(
              grupo.grupoEnvioId,
              grupo
              ).subscribe()
          }
        })
      }



}