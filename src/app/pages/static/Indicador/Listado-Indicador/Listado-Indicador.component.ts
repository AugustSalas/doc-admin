import { Component, OnInit } from '@angular/core';
import { IndicadorService } from '../../../../_utils/services/Service-Entidades/Indicador.service';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
import Swal from 'sweetalert2';
import { IndicadorMdl } from '../../../../_modelos/Indicador';

@Component({
  selector: 'app-indicador',
  templateUrl: './Listado-Indicador.component.html',
  styleUrls: ['./Listado-Indicador.component.scss']
})


export class ListadoIndicadorComponent implements OnInit {

  data: any[] = []
  Indicadors: IndicadorMdl[] = []
  p: number = 1
  Ancho = "100%";
  cols: any[] = [
    { field: "nombre", header: "Nombre" },
    { field: "descripcion", header: "Descripción" },
    { field: "Acciones", header: "Acciones" },
  ];

  constructor(private IService: IndicadorService) { }

  ngOnInit() {
    this.IService.IndicadorFindall()
      .subscribe(resp => {
        this.Indicadors = resp
        this.Indicadors = this.Indicadors.filter(a => a.ctrlActivo == true)

        this.data = this.Indicadors;
        console.log(this.cols);

        this.Ancho = (this.cols.length) * 22 + "%";
        this.data.forEach(element => {


        })

      })
  }

  borrarIndicador(Ind: IndicadorMdl, i: number) {
    Swal.fire({
      title: 'Eliminar',
      text: `Eliminará  ${Ind.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        // this.dependencias.splice(i, 1)
        this.Indicadors = this.Indicadors.filter(i => i.indicadorId !== Ind.indicadorId)
        this.data = this.Indicadors.filter(i => i.indicadorId !== Ind.indicadorId)
        Ind.ctrlActivo = false;
        console.log(Ind)
        this.IService.IndicadorRemove(
            Ind.indicadorId
        ).subscribe()
      }
    })
  }
}
