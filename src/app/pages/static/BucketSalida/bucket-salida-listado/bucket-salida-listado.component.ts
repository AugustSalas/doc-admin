import { Component, OnInit } from "@angular/core";
import { BucketSalidaService } from "src/app/_utils/services/Service-Entidades/BucketSalida.service";
import { BucketSalidaMdl } from "src/app/_modelos/bucketsalida1";
import Swal from "sweetalert2";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { BucketSalidaVisorComponent } from "../bucket-salida-visor/bucket-salida-visor.component";
import { MatDialog } from "@angular/material/dialog";
import { VisorAdjuntosComponent } from "../../turnos/visor-adjuntos/visor-adjuntos.component";
import { VisorDocRelacionadoComponent } from "../visor-docRelacionado/visor-docRelacionado.component";
import { VisorAcusesComponent } from "../../turnos/visor-acuses/visor-acuses.component";

@Component({
  selector: "app-bucket-salida-listado",
  templateUrl: "./bucket-salida-listado.component.html",
  styleUrls: ["./bucket-salida-listado.component.scss"],
})
export class BucketSalidaListadoComponent implements OnInit {
  bucket: BucketSalidaMdl = new BucketSalidaMdl();
  data: any[] = [];
  buckets: BucketSalidaMdl[] = [];
  p: number = 1;
  Ancho = "100%";
  visible: boolean = true;
  loading = false;

  cols: any[] = [
    //{ field: "bucketSalidaId", header: "Bandeja Salida" },
    { field: "Acciones", header: "Acciones" },
    { field: "estatus", header: "Estatus" },
    { field: "folioSalida", header: "Folio de Salida" },
    { field: "numeroDocumentoOriginal", header: "Respuesta a" },
    { field: "documentoAsunto", header: "Asunto" },
    { field: "destinatarioNombre", header: "Destinatario" },
    { field: "destinatarioPuesto", header: "Puesto" },
    { field: "fechaSalida", header: "Fecha de Salida" },
  ];

  isSave: boolean = true;

  constructor(
    private BEservice: BucketSalidaService,
    private Route: Router,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.find( 50, 1)
  }

  find(registros: number, pagina: number) {
    this.loading = true;
    debugger;
    let numeroFinal = registros * pagina;
    let numeroInicio = numeroFinal - registros;

    debugger;

 //   this.BEservice.BucketSalidaFindallRange( numeroInicio,  numeroFinal - 1  ).subscribe( //paginador comentado
      this.BEservice.BucketSalidaFindall(  ).subscribe( //paginador comentado

      (resp) => {
        this.buckets = resp;
        this.buckets = this.buckets.filter((a) => a.ctrlActivo == true);
        this.data = this.buckets;

        this.Ancho = this.cols.length * 15 + "%";
        this.data.forEach((element) => {
          try {
            element.fechaSalida = new Date(
              element.fechaSalida
            ).toLocaleDateString();
          } catch {
            element.fechaSalida = "";
          }

          try {
            element.documentoAsunto = element.documentoFisicoId.asunto;
          } catch {
            element.documentoAsunto = "";
          }

          try {
            element.destinatarioNombre =
              element.documentoFisicoId.remitenteDestinatarioId.nombre +
              " " +
              element.documentoFisicoId.remitenteDestinatarioId
                .apellidoPaterno +
              " " +
              element.documentoFisicoId.remitenteDestinatarioId.apellidoMaterno;
          } catch {
            element.destinatarioNombre = "";
          }

          try {
            element.destinatarioPuesto =
              element.documentoFisicoId.remitenteDestinatarioId.puesto +
              " - " +
              element.documentoFisicoId.remitenteDestinatarioId.dependencia;
          } catch {
            element.destinatarioPuesto = "";
          }

          try {
            element.estatus =
              element.documentoFisicoId.estatusDocumentoId.nombre;
          } catch {
            element.estatus = "";
          }

          try {
            element.numeroDocumentoOriginal =
              element.documentoFisicoId.documentoFisicoRelacionadoId.numeroDocumentoOriginal;
          } catch {
            element.numeroDocumentoOriginal = "";
          }
        });

        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  borrarBucket(buck: BucketSalidaMdl, i: number) {
    Swal.fire({
      title: "Eliminar",
      text: `Eliminará  ${buck.bucketSalidaId}`,
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
    }).then((resp) => {
      if (resp.value) {
        // this.dependencias.splice(i, 1)
        this.buckets = this.buckets.filter(
          (b) => b.bucketSalidaId !== buck.bucketSalidaId
        );
        this.data = this.buckets.filter(
          (b) => b.bucketSalidaId !== buck.bucketSalidaId
        );
        buck.ctrlActivo = false;
        console.log(buck);
        this.BEservice.BucketSalidaRemove(buck.bucketSalidaId).subscribe();
      }
    });
  }

  visorDocumentos(data) {
    if (data.documentoId != null) {
      this.router.navigate([
        "/bucketsalida/visor/documento/",
        data.documentoId.documentoId,
      ]);
    } else {
      //this.router.navigate(['/bucketsalida/visor/documentoFisico/', data.documentoFisicoId.documentoFisicoId]);
      const dialogRef = this.dialog.open(BucketSalidaVisorComponent, {
        width: "50%",
        height: "90%",
        data: { id: data.documentoFisicoId.documentoFisicoId },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }

  visorDocRelacionado(data) {
    if (data.documentoId != null) {
      this.router.navigate([
        "/bucketsalida/visorDocRelacionado/documento/",
        data.documentoId.documentoId,
      ]);
    } else {
      //this.router.navigate(['/bucketsalida/visor/documentoFisico/', data.documentoFisicoId.documentoFisicoId]);
      const dialogRef = this.dialog.open(VisorDocRelacionadoComponent, {
        width: "50%",
        height: "90%",
        data: {
          id:
            data.documentoFisicoId.documentoFisicoRelacionadoId
              .documentoFisicoId,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }

  visorAdjuntosBS(data) {
    let tipoDoc: String = "";

    if (data.documentoId == null) {
      tipoDoc = "documentoFisico";
    } else {
      tipoDoc = "documento";
    }
    const dialogRef = this.dialog.open(VisorAdjuntosComponent, {
      width: "50%",
      height: "90%",
      data: { id: data.documentoFisicoId.documentoFisicoId, tipoDoc: tipoDoc },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  visorAcuses(data) {
    let tipoDoc: String = "";

    if (data.documentoId == null) {
      tipoDoc = "documentoFisico";
    } else {
      tipoDoc = "documento";
    }
    const dialogRef = this.dialog.open(VisorAcusesComponent, {
      width: "50%",
      height: "90%",
      data: { id: data.documentoFisicoId.documentoFisicoId, tipoDoc: tipoDoc },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  Autorizar(bucket): void {
    const id = bucket.bucketSalidaId;

    if (id !== "new") {
      this.isSave = false;

      debugger;
      this.BEservice.BucketSalidaFind(Number(id)).subscribe(
        (resp: BucketSalidaMdl) => {
          resp.documentoFisicoId.estatusDocumentoId = 3;

          let peticion: Observable<any>;
          Swal.fire({
            title: "Espere",
            text: "Guardando información",
            icon: "info",
            allowOutsideClick: false,
          });

          debugger;
          peticion = this.BEservice.AutorizarEstatus(
            resp.documentoFisicoId.documentoFisicoId,
            resp.documentoFisicoId
          );

          peticion.subscribe(
            (resp) => {
              this.ngOnInit();

              Swal.fire({
                title: id,
                text: "Realizado correctamente",
                icon: "success",
              });
            },

            (error) => {
              if (error) {
              }

              Swal.fire({
                title: id,
                text: "error",
                icon: "error",
              });
            }
          );
        }
      );
    }
  }
}
