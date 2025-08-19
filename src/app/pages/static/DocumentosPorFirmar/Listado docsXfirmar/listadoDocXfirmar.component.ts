import { Component, OnInit } from '@angular/core';
import { DocPorFirmarService } from 'src/app/_utils/services/Service-Entidades/DocPorFirmar.service';
import {OpenApiService} from 'src/app/_utils/services/open-api.service';
import { DocPorFirmarMdl } from 'src/app/_modelos/DocPorFirmar';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { DocumentoFisicoMdl } from 'src/app/_modelos/documento';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bucket-salida-listado',
  templateUrl: './listadoDocXfirmar.component.html',
  styleUrls: ['./listadoDocXfirmar.component.scss']
})
export class DocPorFirmarListadoComponent implements OnInit {


  doc: DocPorFirmarMdl = new DocPorFirmarMdl()
  data: any[] = []
  documentos: DocPorFirmarMdl[] = []
  p: number = 1
  cols: any[] = [

    { field: "fechaSalida", header: "Fecha Creación" },
    { field: "folioSalida", header: "Folio Salida " },
    { field: "documentoAsunto", header: "Asunto" },
    { field: "destinatarioNombre", header: "Destinatario" },
    { field: "destinatarioPuesto", header: "Puesto" },
    { field: "Acciones", header: "Acciones" },

  ];

  isSave: boolean = true


  constructor(private Dservice: DocPorFirmarService,
    private router: Router,
    private route: ActivatedRoute,
    private OpenApi: OpenApiService,
    private http: HttpClient) { }

  ngOnInit() {
    this.Dservice.DocXfirmarFindall()
      .subscribe(resp => {
        this.documentos = resp
        this.documentos = this.documentos.filter(a => a.ctrlActivo == true)

        this.data = this.documentos;

        this.data.forEach(element => {
          
          try {
            element.destinatarioNombre = element.documentoFisicoId.remitenteDestinatarioId.nombre + " " + 
                                         element.documentoFisicoId.remitenteDestinatarioId.apellidoPaterno + " " +
                                         element.documentoFisicoId.remitenteDestinatarioId.apellidoMaterno
          } catch{
            element.destinatarioNombre = "";
          }

          try {
            element.destinatarioPuesto = element.documentoFisicoId.remitenteDestinatarioId.puesto
          } catch{
            element.destinatarioPuesto = "";
          }

          try {
            element.documentoAsunto = element.documentoId.asunto
          } catch{
            element.documentoAsunto = "";
          }


        })

      })
  }

  borrarDocumento(doc: DocPorFirmarMdl, i: number) {
    Swal.fire({
      title: 'Eliminar',
      text: `Eliminará  ${doc.documentosPorFirmarId}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        // this.dependencias.splice(i, 1)
        this.documentos = this.documentos.filter(a => a.documentosPorFirmarId !== doc.documentosPorFirmarId)
        this.data = this.documentos.filter(a => a.documentosPorFirmarId !== doc.documentosPorFirmarId)
        doc.ctrlActivo = false;
        console.log(doc)
        this.Dservice.DocXfirmarRemove(
          doc.documentosPorFirmarId
        ).subscribe()
      }
    })
  }

  selectorValores(valor, campo) {
    if (campo == "documentoAsunto") {
      if (valor.documentoId != null) {
        return valor.documentoId.asunto;
      } else {
        return valor.documentoFisicoId.asunto;
      }
    } else {
      if (campo == "fechaSalida") {
        return new Date(valor[campo]).toLocaleString();
      } else {
        return valor[campo];
      }
    }
  }

  visorDocumentos(data) {

    if (data.documentoId != null) {
      this.router.navigate(['/DocXfirmar/visor/documento/', data.documentoId.documentoId]);
    }
    else {
      this.router.navigate(['/DocXfirmar/visor/documentoFisico/', data.documentoFisicoId.documentoFisicoId]);
    }

  }


  Autorizar(doc) {
    if (doc.documentoFisicoId != null) {

      var idAutorizar = doc.documentoFisicoId;
      idAutorizar.estatusDocumentoId = 2;

      let peticion: Observable<any>

      Swal.fire({
        title: 'Espere',
        text: 'Guardando información',
        icon: 'info',
      })

      this.Dservice.AutorizarEstatusFisico(idAutorizar.documentoFisicoId, idAutorizar).subscribe(resp => {


        peticion = this.Dservice.ActualizaPdfAutorizar(idAutorizar.documentoFisicoId, idAutorizar)


        peticion.subscribe(resp => {


          Swal.fire({
            title: 'Registro autorizado',
            text: '¿Ir al documento visor del documento?',
            icon: 'question',
            showConfirmButton: true,
            showCancelButton: true
          }).then(resp => {
            if (resp.value) {

              this.router.navigate(['/DocXfirmar/visor/documentoFisico/', idAutorizar.documentoFisicoId]);
              // this.router.navigate(['/documentofisico/formulario/', idAutorizar.documentoFisicoId]);

            }
            else {
              this.ngOnInit()
            }

          })


        },

          error => {
            Swal.fire({
              title: "error",
              text: 'error al autorizar el documento',
              icon: 'error',
            })
          },

        )
      },

        error => {
          Swal.fire({
            title: "error",
            text: 'error al autorizar el documento',
            icon: 'error',
          })
        },

      )


    } else {

      var idAutorizar = doc.documentoId;
      idAutorizar.estatusDocumentoId = 2;

      let peticion: Observable<any>
      Swal.fire({
        title: 'Espere',
        text: 'Guardando información',
        icon: 'info',
      })


      this.Dservice.AutorizarEstatus(idAutorizar.documentoId, idAutorizar).subscribe(resp => {

        peticion = this.Dservice.ActualizaPdfAutorizar(idAutorizar.documentoFisicoId, idAutorizar)

        peticion.subscribe(resp => {


          Swal.fire({
            title: 'Registro autorizado',
            text: '¿Ir al documento visor del documento?',
            icon: 'question',
            showConfirmButton: true,
            showCancelButton: true
          }).then(resp => {
            if (resp.value) {

              this.router.navigate(['/DocXfirmar/visor/documento/', idAutorizar.documentoId]);
              // this.router.navigate(['/documentofisico/formulario/', idAutorizar.documentoFisicoId]);

            }
            else {
              this.ngOnInit()
            }

          })


        },

          error => {
            Swal.fire({
              title: "error",
              text: 'error al autorizar el documento',
              icon: 'error',
            })
          },

        )
      },

        error => {
          Swal.fire({
            title: "error",
            text: 'error al autorizar el documento',
            icon: 'error',
          })
        },

      )

      peticion = this.Dservice.AutorizarEstatus(idAutorizar.documentoId, idAutorizar)

    }


  }

  Redireccionar(data): void {
    this.router.navigate(['/documentofisico/formulario/', data.documentoFisicoId.documentoFisicoId]);

  }

}
