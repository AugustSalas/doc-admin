import { Component, OnInit } from "@angular/core";
import { TrazaInternaService } from "src/app/_utils/services/Service-Entidades/TrazaInternaService";
import { TrazaInternaMdl } from "src/app/_modelos/Traza_interna";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { TurnosVisorComponent } from "../turnosRecibidos-visor/turnos-visor.component";
import { VisorAdjuntosComponent } from "../visor-adjuntos/visor-adjuntos.component";
import { VisorAcusesComponent } from "../visor-acuses/visor-acuses.component";

@Component({
  selector: "app-turnos-listado",
  templateUrl: "./turnos-listado.component.html",
  styleUrls: ["./turnos-listado.component.scss"],
})
export class TurnosListadoComponent implements OnInit {
  turno: TrazaInternaMdl = new TrazaInternaMdl();

  data: any[] = [];
  turnos: TrazaInternaMdl[] = [];
  p: number = 1;
  Ancho = "100%";
  mensaje: boolean;
  instruccion: boolean;
  mens = "";
  ins = "";

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

  isSave: boolean = true;
  loading = false;

  constructor(
    private TIservice: TrazaInternaService,
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

   // this.TIservice.TrazaInternaFindallrecibidosRange(   numeroInicio,   numeroFinal - 1  ) //paginador comentado 
    this.TIservice.TrazaInternaFindallrecibidos(    )
    .subscribe(
      (resp) => {
        this.turnos = resp;
        this.turnos = this.turnos.filter((a) => a.ctrlActivo == true);
        this.data = this.turnos;

        this.Ancho = this.cols.length * 15 + "%";
        this.data.forEach((element) => {
          try {
            //Valida si organizacionorigen es nulo, toma el campo grupo organizacional origen
            if (element.organizacionIdOrigen == null) {
              element.OrigenNombre = element.grupoOrganizacionalIdOrigen.nombre;
            } else {
              // Toma el  organizacionOrigen
              element.OrigenNombre = element.organizacionIdOrigen.nombre;
            }
          } catch {
            element.OrigenNombre = "";
          }

          try {
            element.cadenaFolio = element.documentoFisicoId.cadenaFolio;
          } catch {
            element.cadenaFolio = "";
          }

          try {
            element.numeroDocumentoOriginal =
              element.documentoFisicoId.numeroDocumentoOriginal;
          } catch {
            element.numeroDocumentoOriginal = "";
          }

          try {
            element.documentoAsunto = element.documentoFisicoId.asunto;
          } catch {
            element.documentoAsunto = "";
          }

          try {
            element.fechaTurno = new Date(
              element.ctrlCreado
            ).toLocaleDateString();
          } catch {
            element.fechaTurno = "";
          }

          try {
            //Valida si organizacionorigen es nulo, toma el campo grupo organizacional origen
            if (element.organizacionIdDestino == null) {
              element.DestinoNombre =
                element.grupoOrganizacionalIdDestino.nombre;
              element.organizacionIdDestino = "";
            } else {
              // Toma el  organizacionOrigen
              element.DestinoNombre = element.organizacionIdDestino.nombre;
            }
          } catch {
            element.DestinoNombre = "";
            element.organizacionIdDestino = "";
          }

          try {
            if (element.estatusTurnoId.nombre == "Turnado") {
              element.estatus = "Recibido";
            } else {
              element.estatus = element.estatusTurnoId.nombre;
            }

            //Valida si organizacionorigen es nulo, toma el campo grupo organizacional origen
          } catch {
            element.estatus = "";
          }

          try {
            element.agrupador = element.agrupador + "/" + "2021";
            //element.agrupador = element.agrupador;
          } catch {
            element.agrupador = "";
          }
        });

        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  borrarTurno(tur: TrazaInternaMdl, i: number) {
    Swal.fire({
      title: "Eliminar",
      text: `Eliminará  ${tur.trazaInternaId}`,
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
    }).then((resp) => {
      if (resp.value) {
        // this.dependencias.splice(i, 1)
        this.turnos = this.turnos.filter(
          (a) => a.trazaInternaId !== tur.trazaInternaId
        );
        this.data = this.turnos.filter(
          (a) => a.trazaInternaId !== tur.trazaInternaId
        );
        tur.ctrlActivo = false;
        console.log(tur);
        this.TIservice.TrazaInternaRemove(tur.trazaInternaId).subscribe();
      }
    });
  }

  visorDocumentos(data) {
    debugger;
    if (data.documentoId != null) {
      this.router.navigate([
        "/turnos/visor/documento/",
        data.documentoId.documentoId,
      ]);
    } else {
      //var interfaz = this.router.navigate(['/turnos/visor/documentoFisico/', data.documentoFisicoId.documentoFisicoId]);

      const dialogRef = this.dialog.open(TurnosVisorComponent, {
        width: "50%",
        height: "90%",
        data: { id: data.documentoFisicoId.documentoFisicoId },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }

  visorAdjuntos(data) {
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

  DocRelacionado(data) {
    debugger;
    if (data.documentoId == null) {
      this.router.navigate([
        "/documentorelacionado/formulariofisico/" +
          data.documentoFisicoId.documentoFisicoId +
          "/new/bucketEntrada",
      ]);
    } else {
      this.router.navigate([
        "/documentorelacionado/formulario/",
        data.documentoId.documentoId + "/new/bucketEntrada",
      ]);
    }
  }

  Mensaje(turnos) {
    debugger;
    this.mensaje = true;
    this.TIservice.TrazaInternaFind(Number(turnos.trazaInternaId)).subscribe(
      (resp: TrazaInternaMdl) => {
        this.mens = resp.mensaje;
      }
    );
  }

  Instrucciones(turnos) {
    debugger;
    this.instruccion = true;
    this.TIservice.TrazaInternaFind(Number(turnos.trazaInternaId)).subscribe(
      (resp: TrazaInternaMdl) => {
        this.ins = resp.instrucciones;
      }
    );
  }

  AsignacionPersonal(turno): void {
    const id = turno.trazaInternaId;

    if (id !== "new") {
      this.isSave = false;

      debugger;
      this.TIservice.TrazaInternaFind(Number(id)).subscribe(
        (resp1: TrazaInternaMdl) => {
          let peticion: Observable<any>;
          debugger;
          peticion = this.TIservice.TrazaInternaFind(resp1.trazaInternaId);

          debugger;

          peticion.subscribe(
            (resp1) => {
              Swal.fire({
                title: "Asignación de turno",
                text: "¿Esta seguro de asignarse este turno?",
                icon: "question",
                showConfirmButton: true,
                showCancelButton: true,
              }).then((resp) => {
                debugger;
                if (resp.value) {
                  this.AP(turno);
                } else {
                  this.ngOnInit();
                }
              });
            },

            (error) => {
              Swal.fire({
                title: "error",
                text: "error al asignar este turno",
                icon: "error",
              });
            }
          );
        }
      );
    }
  }

  AP(turno) {
    const id = turno.trazaInternaId;

    if (id !== "new") {
      this.isSave = false;

      this.TIservice.TrazaInternaFind(Number(id)).subscribe(
        (resp1: TrazaInternaMdl) => {
          let peticion: Observable<any>;
          debugger;
          resp1.estatusTurnoId = 7;
          peticion = this.TIservice.AutorizarEstatus(
            resp1.trazaInternaId,
            resp1
          );

          this.router
            .navigateByUrl("/", { skipLocationChange: true })
            .then(() => {
              this.router.navigate(["/turnos/lista"]);
            });

          peticion.subscribe(
            (resp) => {
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
