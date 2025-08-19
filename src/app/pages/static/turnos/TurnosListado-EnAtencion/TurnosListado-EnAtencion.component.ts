import { Component, OnInit } from '@angular/core';
import { TrazaInternaService } from 'src/app/_utils/services/Service-Entidades/TrazaInternaService';
import { TrazaInternaMdl } from 'src/app/_modelos/Traza_interna';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';

import { TurnosEnAtencionVisorComponent } from '../turnosEnAtencion-visor/turnosEnAtencion.component';
import {MatDialog} from '@angular/material/dialog';
import { VisorAdjuntosComponent } from '../visor-adjuntos/visor-adjuntos.component';

@Component({
  selector: 'app-turnos-list-cerradoRecibidos',
  templateUrl: './TurnosListado-EnAtencion.component.html',
  styleUrls: ['./TurnosListado-EnAtencion.component.scss']
})
export class TurnosListEnAtencionComponent implements OnInit {
  turno: TrazaInternaMdl = new TrazaInternaMdl();
  
  data: any[] = []
  turnos: TrazaInternaMdl[] = []
  p: number = 1
  Ancho = "100%";
  mensaje: boolean;
  instruccion: boolean;
  mens = "";
  ins = "";
  grupo: any=null;

  cols: any[] = [

    //{ field: "trazaInternaId", header: "Turno" },
    { field: "Acciones", header: "Acciones" },
    { field: "estatus", header: "Estatus del Turno" },
    { field: "OrigenNombre", header: "Área que Turna" },
    { field: "DestinoNombre", header: "Área Destino" },
    { field: "numeroDocumentoOriginal", header: "No. oficio original" },
    { field: "documentoAsunto", header: "Asunto Oficio" },
    { field: "cadenaFolio", header: "Folio Interno" },
    { field: "fechaTurno", header: "Fecha del Turno" },
    { field: "agrupador", header: "Volante de Referencia" },
  ];

  isSave: boolean = true
  
  constructor(private TIservice: TrazaInternaService,
    public apiService: OpenApiService,
    private router: Router,
    public dialog: MatDialog) { }


  ngOnInit() {
    debugger
    //OBTIENE EL GRUPO ORG Y ORG DESDE EL TOKEN
    this.grupo = this.apiService.getUsuarioToken();
  

    this.TIservice.TrazaInternaFindallEnAtencion()
    .subscribe(resp => {
      this.turnos = resp
      this.turnos = this.turnos.filter(a => a.ctrlActivo == true)
      this.data = this.turnos;

      
      this.Ancho = (this.cols.length) * 15 + "%";
      this.data.forEach(element => {
        try {
          //Valida si organizacionorigen es nulo, toma el campo grupo organizacional origen
          if (element.organizacionIdOrigen == null){
             element.OrigenNombre = element.grupoOrganizacionalIdOrigen.nombre
          } else { // Toma el  organizacionOrigen
             element.OrigenNombre = element.organizacionIdOrigen.nombre
          }
        } catch{
          element.OrigenNombre = "";
        } 

    /***** Validación de estatus *******/   

    debugger
   //Valida si mi GO desde el token y Origen del turno son el mismo GO 
    if (this.grupo.grupo_organizacional_remitente == element.grupoOrganizacionalIdOrigen.nombre){
               
             if (element.estatusTurnoId.nombre == 'Returnado'){//Si el estatus es returnado se queda el mismo estatus
                    element.estatus = element.estatusTurnoId.nombre
            } else{
                  //Si no, quiere decir que es un registro que estoy turnando 
                  element.estatus = 'Turnado'
            }
    } else {
            try {
              //Valida si mi ORG desde el token y Origen del turno son el mismo ORG 
            if (this.grupo.organizacion_remitente == element.organizacionIdOrigen.nombre){

                  if (element.estatusTurnoId.nombre == 'Returnado'){//Si el estatus es returnado se queda el mismo estatus
                      element.estatus = element.estatusTurnoId.nombre
                  } else{
                    //Si no, quiere decir que es un registro que estoy turnando 
                    element.estatus = 'Turnado'
                  }
            } else {
              //Quiere decir que soy DESTINO
               //   if (element.estatus == 'En atención'){
                   element.estatus = 'Recibido'
                 // }
                
            }
          }
          catch {
            // Soy GO Destino y viene turnado,  returnado o atención personal
            if (element.estatusTurnoId.estatusTurnoId =! 7){
              element.estatus = 'Recibido'
             }
             else {
              element.estatus = element.estatusTurnoId.nombre
             }
          }
      }




    debugger



        try {
          element.cadenaFolio = element.documentoFisicoId.cadenaFolio
        } catch{
          element.cadenaFolio = "";
        }

        try {
          element.numeroDocumentoOriginal = element.documentoFisicoId.numeroDocumentoOriginal
        } catch{
          element.numeroDocumentoOriginal = "";
        }

        try {
          element.documentoAsunto = element.documentoFisicoId.asunto
        } catch{
          element.documentoAsunto = "";
        }

        try {
          element.fechaTurno =new Date(element.ctrlCreado).toLocaleDateString();
        } catch{
          element.fechaTurno = "";
        }
        
        try {//Valida si organizacionorigen es nulo, toma el campo grupo organizacional origen
            if (element.organizacionIdDestino == null){
              element.DestinoNombre = element.grupoOrganizacionalIdDestino.nombre
            } else { // Toma el  organizacionOrigen
              element.DestinoNombre = element.organizacionIdDestino.nombre
          }
          
        } catch{
          element.DestinoNombre = "";
        }


       /* try { //Si estatus Turnado mostrar Recibido en bandeja 
              if (element.estatusTurnoId.nombre == 'Turnado'){
                //Validar si eres orígen entonces cambia a estatus "Recibido"
              
                element.estatus = 'Recibido'
                //Si no se queda en "Turnado"

            } else {
              element.estatus = element.estatusTurnoId.nombre
            }
        } catch{
          element.estatus = "";
        } */



        try {
          element.agrupador = element.agrupador + "/" + "2021";
        } catch{
          element.agrupador = "";
        }

      })

    })


  }

  borrarTurno(tur: TrazaInternaMdl, i: number) {
    Swal.fire({
      title: 'Eliminar',
      text: `Eliminará  ${tur.trazaInternaId}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        // this.dependencias.splice(i, 1)
        this.turnos = this.turnos.filter(a => a.trazaInternaId !== tur.trazaInternaId)
        this.data = this.turnos.filter(a => a.trazaInternaId !== tur.trazaInternaId)
        tur.ctrlActivo = false;
        console.log(tur)
        this.TIservice.TrazaInternaRemove(
          tur.trazaInternaId
        ).subscribe()
      }
    })
  }


  visorDocumentos(data) {

    if (data.documentoId != null) {
      this.router.navigate(['/turnos/visorEnAtencion/documento/', data.documentoId.documentoId]);
    }
    else {
      //this.router.navigate(['/turnos/visorEnAtencion/documentoFisico/', data.documentoFisicoId.documentoFisicoId]);
      const dialogRef = this.dialog.open(TurnosEnAtencionVisorComponent,{
        width: '50%',
        height: '90%',
        data: { id: data.documentoFisicoId.documentoFisicoId }, 
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

  }

  visorAdjuntosEA(data) {

    let tipoDoc: String = "";

    if (data.documentoId == null) {
      tipoDoc="documentoFisico";
    }
    else {
      tipoDoc="documento";
    }
    const dialogRef = this.dialog.open(VisorAdjuntosComponent, {
      width: '50%',
      height: '90%',
      data: { id: data.documentoFisicoId.documentoFisicoId, tipoDoc: tipoDoc },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  DocRelacionado(data) {

    debugger
    if (data.documentoId == null) {
      this.router.navigate(['/documentorelacionado/formulariofisico/' + data.documentoFisicoId.documentoFisicoId + "/new/bucketEntrada"]);
    }
    else {
      this.router.navigate(['/documentorelacionado/formulario/', data.documentoId.documentoId + "/new/bucketEntrada"]);
    }

  }


  Mensaje(turnos) {
    debugger
    this.mensaje = true;
    this.TIservice.TrazaInternaFind(Number(turnos.trazaInternaId)).subscribe((resp: TrazaInternaMdl) => {
    this.mens = resp.mensaje;

    })
  }


  Instrucciones(turnos) {
    debugger
    this.instruccion = true;
    this.TIservice.TrazaInternaFind(Number(turnos.trazaInternaId)).subscribe((resp: TrazaInternaMdl) => {
    this.ins = resp.instrucciones;

    })
  }

  CerrarTurno(turno):void {

  
    const id = turno.trazaInternaId;

    if (id !== 'new') {
      this.isSave = false

      debugger
      this.TIservice.TrazaInternaFind(Number(id)).subscribe((resp: TrazaInternaMdl) => {

      

        resp.estatusTurnoId = 3;

        

        let peticion: Observable<any>
        Swal.fire({
          title: 'Espere',
          text: 'Guardando información',
          icon: 'info',
          allowOutsideClick: false
        })

        debugger
        peticion = this.TIservice.AutorizarEstatus(resp.trazaInternaId,resp)
       

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

  
  AsignacionPersonal(turno): void {


    const id = turno.trazaInternaId;

    if (id !== 'new') {
      this.isSave = false

      debugger
      this.TIservice.TrazaInternaFind(Number(id)).subscribe((resp1: TrazaInternaMdl) => {

        let peticion: Observable<any>
        debugger
        peticion = this.TIservice.TrazaInternaFind(resp1.trazaInternaId)

        debugger

        peticion.subscribe(resp1 => {

          Swal.fire({
            title: 'Asignación de turno',
            text: '¿Esta seguro de asignarse este turno?',
            icon: 'question',
            showConfirmButton: true,
            showCancelButton: true
          }).then(resp => {

            debugger
            if (resp.value) {

              this.AP(turno);
              
            }
            else {
              this.ngOnInit()
            }

          })


        },

          error => {
            Swal.fire({
              title: "error",
              text: 'error al asignar este turno',
              icon: 'error',
            })
          },

        )

      })

    }

  }


  AP(turno) {

    const id = turno.trazaInternaId;

    if (id !== 'new') {
      this.isSave = false

    this.TIservice.TrazaInternaFind(Number(id)).subscribe((resp1: TrazaInternaMdl) => {

    let peticion: Observable<any>
      debugger
    resp1.estatusTurnoId = 7;
    peticion = this.TIservice.AutorizarEstatus(resp1.trazaInternaId, resp1)

    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
    this.router.navigate(["/turnos/listaEA"]);
    
    });

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

        })
      }

  }

}




