import { Component, OnInit } from '@angular/core';
import { ContactoService  } from '../../../../_utils/services/Service-Entidades/contacto.service';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
import Swal from 'sweetalert2';
import { ContactoSMdl } from '../../../../_modelos/ContactoSS';

@Component({
  selector: 'app-actor',
  templateUrl: './Listado-contacto.component.html',
  styleUrls: ['./Listado-contacto.component.scss']
})


export class ListadoContactoComponent implements OnInit {

  data: any[] = []
  Contactos: ContactoSMdl[] = []
  p: number = 1
  Ancho = "100%";
  cols: any[] = [
    { field: "nombre", header: "Nombre" },
    { field: "apellidoPaterno", header: "Apellido Paterno" },
    { field: "apellidoMaterno", header: "Apellido Materno" },
    { field: "telefono", header: "Teléfono" },
    { field: "correoElectronico", header: "Correo Electronico" },
    { field: "rfc", header: "Rfc" },
    { field: "curp", header: "Curp" },
    { field: "puesto", header: "Puesto" },
    { field: "dependencia", header: "Dependencia" },
    { field: "tipoContactoId", header: "Tipo Contacto" },
    { field: "tratamientoId", header: "Grado Académico" },
    { field: "Acciones", header: "Acciones" },
  ];

  constructor(private CService: ContactoService) { }

  ngOnInit() {
    this.CService.ContactoFindall()
      .subscribe(resp => {
        this.Contactos = resp
        this.Contactos = this.Contactos.filter(a => a.ctrlActivo == true)

        this.data = this.Contactos;
        console.log(this.cols);

        this.Ancho = (this.cols.length) * 22 + "%";
        this.data.forEach(element => {


       

          try {
            element.tipoContactoId = element.tipoContactoId.nombre
          } catch{
            element.tipoContactoId = "";
          }

          try {
            element.tratamientoId = element.tratamientoId.nombre
          } catch{
            element.tratamientoId = "";
          }

        })

      })
  }

  borrarContacto(Cont: ContactoSMdl, i: number) {
    Swal.fire({
      title: 'Eliminar',
      text: `Eliminará  ${Cont.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        // this.dependencias.splice(i, 1)
        this.Contactos = this.Contactos.filter(a => a.contactoId !== Cont.contactoId)
        this.data = this.Contactos.filter(a => a.contactoId !== Cont.contactoId)
        Cont.ctrlActivo = false;
        console.log(Cont)
        this.CService.ContactoRemove(
            Cont.contactoId
        ).subscribe()
      }
    })
  }
}
