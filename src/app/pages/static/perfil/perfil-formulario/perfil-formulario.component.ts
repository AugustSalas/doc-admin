import { Component, OnInit, ViewChild } from '@angular/core';
import { PerfilMdl, MenuPerfil } from 'src/app/_modelos/Perfil';
import { SelectItem, TreeNode } from 'primeng/api';
import { Tree } from 'primeng/tree';
import { PerfilService } from 'src/app/_utils/services/Service-Entidades/perfil.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
import { DerechoService } from 'src/app/_utils/services/derecho.service';

@Component({
  selector: 'app-perfil-formulario',
  templateUrl: './perfil-formulario.component.html',
  styleUrls: ['./perfil-formulario.component.scss']
})
export class PerfilFormularioComponent implements OnInit {
  isSave: boolean = true;
  perfil: PerfilMdl = new PerfilMdl();
  bloques: SelectItem[] = [];
  bloquesSeleccinados: any[] = [];

  listaDerecho: TreeNode[] = []; // lista completa de todos los derechos existentes en el servicio
  listaDerechoSelecionados: TreeNode[] = []; // lista donde se guardan nodos tanto padres como hijos
  listaDerechoSelecionadosHijos: any[] = []; // lista donde solo se guardan los nodos hijos que tienen ruta y metodo
  ListaTemporalPermisos: any[] = []; // lista temporal donde se almacena los permisos guardados en el perfil

  loading: boolean = true;  // sirve para mostrar un icono de carga en el arbol

  menuPerfil: MenuPerfil[] = []; // clase para almacenar una lista de ruta y metodos
  listaDerechoObs: Observable<TreeNode[]>; // lista completa de todos los derechos existentes en el servicio

  openApiPermisos: any = [];

  id = "";

  @ViewChild('expandingTree', { static: false }) expandingTree: Tree;

  constructor(
    private perfilService: PerfilService,
    private route: ActivatedRoute,
    private _router: Router,
    public service: DerechoService,

  ) {

  }



  ngOnInit() {

    debugger
    //////// define si es edicion o perfil nuevo
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id !== 'new') {
      this.isSave = false
      //Editar

      this.perfilService.perfilFind(Number(this.id))
        .subscribe((res: PerfilMdl) => {
          this.perfil = res
          this.ListaTemporalPermisos = JSON.parse(this.perfil.derechos);
          this.BuscarDerechos();


        })
    }
    else {

      this.BuscarDerechos();

    }
    ////// define si es edicion o perfil nuevo
  }

  BuscarDescripcionEndPoint(ruta, metodo) {
    let descipcion: string = "";
    try {
      descipcion = this.openApiPermisos[ruta][metodo].description;
    } catch{
      descipcion = "";
    }
    return descipcion;
  }
  BuscarDerechos() {
    //// se encarga de buscar la lista de endpoints del servicio, y armar una lista para el arbol
    this.service.getDerechos().subscribe((res) => {
      this.openApiPermisos = res.paths;
      this.listaDerechoObs = this.service.getListaFiltrada();
      this.listaDerechoObs.subscribe(rest1 => {
        this.listaDerecho = rest1;
        try {
          this.selectAllRecursive(this.listaDerecho);
        } catch{

        }
        this.loading = false;
      });
      this.service.getArmarLista(res.paths, res.components.schemas).subscribe(rest => {
      });
    })
    //// se encarga de buscar la lista de endpoints del servicio, y armar una lista para el arbol
  }



  guardarPerfil(form: NgForm) {
    debugger

    if (form.invalid) {
      //Aquí va la validación del form
      console.log('Form no valido')
      return
    }
    let peticion: Observable<any>


    this.perfil.ctrlActivo = true
    this.perfil.ctrlCreadoPor = 1;
    this.perfil.ctrlCreado = new Date();
    this.menuPerfil = [];

    var nodoTemp: MenuPerfil = new MenuPerfil();

    ///// arma una lista de métodos y rutas de los endpoints, para asignarlos como permisos
    this.listaDerechoSelecionadosHijos.forEach(element => {
      try {
        nodoTemp = new MenuPerfil();
        var ruta: string = element.data.ruta;
        var metodo: string = element.data.metodo;
        nodoTemp.ruta = ruta;
        nodoTemp.metodo = metodo;
        this.menuPerfil.push(nodoTemp);
      } catch{

      }
    })
    this.perfil.derechos = JSON.stringify(this.menuPerfil);

    ///// arma una lista de métodos y rutas de los endpoints, para asignarlos como permisos


    Swal.showLoading()

    if (this.perfil.perfilId) {
      this.perfil.ctrlCreado = this.perfil.ctrlCreado
      this.perfil.ctrlActualizado = new Date();
      this.perfil.ctrlActualizadoPor = 1;
      peticion = this.perfilService.perfilEdit(this.perfil.perfilId, this.perfil);
      console.log(this.perfilService)
    }
    else {
      this.perfil.ctrlCreado = new Date();
      this.perfil.ctrlActualizado = new Date();
      peticion = this.perfilService.perfilCreate(this.perfil);
      console.log(this.perfil)

    }

    peticion.subscribe(resp => {

      Swal.fire({
        title: "ok",
        text: 'Realizado correctamente',
        icon: 'success',
      })



    },
      error => {

        Swal.fire({
          title: this.perfil.nombre,
          text: 'error',
          icon: 'error',
        })

      });
  }

  derechoChange() {  // cuando cambiar algun permiso, se debe ejecutar para actualizar la lista de nodos hijos
    try {
      this.listaDerechoSelecionadosHijos = [];

      this.listaDerechoSelecionados.forEach(element => {

        false
        if (element.collapsedIcon == "fa fa-edit") {
          let Metodo: any = []
          Metodo.label = element.label;
          Metodo.data = element.data;
          Metodo.expandedIcon = "fa fa-edit";
          Metodo.collapsedIcon = "fa fa-edit";
          Metodo.children = [];
          if (element != []) {
            let temp: TreeNode = element;
            this.listaDerechoSelecionadosHijos.push(temp);
          }
        }
      });
    }
    catch{

    }
  }

  private selectAllRecursive(tree: TreeNode[]) {
    tree.forEach(NodoPadre => {
      var contadorHijos: number = 0;
      NodoPadre.children.forEach(Nodohijos => {

        if (this.BuscarEnArbol(Nodohijos)) {
          contadorHijos = contadorHijos + 1;
          Nodohijos.partialSelected = false;
          this.listaDerechoSelecionados.push(Nodohijos);
        }
      });

      if (NodoPadre.children.length == contadorHijos) {
        NodoPadre.partialSelected = false;
        this.listaDerechoSelecionados.push(NodoPadre);
      }
      else if (contadorHijos > 0) {
        NodoPadre.partialSelected = true;
        this.listaDerechoSelecionados.push(NodoPadre);
      }
    })
    this.derechoChange();
  }

  selectAll() {
    this.listaDerecho.forEach(NodoPadre => {
      this.listaDerechoSelecionados.push(NodoPadre);
      NodoPadre.children.forEach(Nodohijos => {
        this.listaDerechoSelecionados.push(Nodohijos);
      });
    })
    this.derechoChange();
  }

  UncheckTree() {
    this.listaDerechoSelecionados = [];
    this.derechoChange();
  }

  BuscarEnArbol(nombreNodo) {
    var valor = false;
    this.ListaTemporalPermisos.forEach(element => {
      try {
        if (element.ruta == nombreNodo.data.ruta && element.metodo == nombreNodo.data.metodo) {
          valor = true;
        }
      } catch{
        valor = false;
        console.log("error")
      }
    });
    return valor;
  }

}
