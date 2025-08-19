import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { TreeNode } from 'primeng/api';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenuSideNav } from 'src/app/_modelos/navMenu.model';

@Injectable()
export class DerechoService {

    selection: any = [];
    selection2: any = [];
    private menuEntidades: any = [];
    private menuEntidadesList = new Subject<TreeNode[]>();

    listaDerecho: TreeNode[] = []; // lista completa de todos los derechos existentes en el servicio
    listaDerechoSelecionados: TreeNode[] = []; // lista donde se guardan nodos tanto padres como hijos
    listaDerechoSelecionadosHijos: any[] = []; // lista donde solo se guardan los nodos hijos que tienen ruta y metodo
    ListaTemporalPermisos: any[] = []; // lista temporal donde se almacena los permisos guardados en el perfil
    menu: MenuSideNav[] = [];

    constructor(private http: HttpClient,
    ) { }



    BuscarClase(clase) {
        let temp: any = null;
        try {
            let openapi = JSON.parse(sessionStorage.getItem('openApi'));
            let nombreClase = clase.responses.default.content['application/json'].schema.items.$ref.split("/")[3];
            temp = openapi.components.schemas[nombreClase];
            temp.clase = nombreClase;

        }
        catch{
            let openapi = JSON.parse(sessionStorage.getItem('openApi'));
            let nombreClase = clase.responses.default.content['application/json'].schema.$ref.split("/")[3];
            temp = openapi.components.schemas[nombreClase];
            temp.clase = nombreClase;

        }
        return temp;
    }


    BuscarEndpoint(index: number) {

        let temp: any = [];
        try {
            let openapi = JSON.parse(sessionStorage.getItem('openApi'));
            let nombreEndPoint: string = "";

            let Contador = 0;
            Object.keys(openapi.paths).forEach(key => {
                if (Contador == index) {
                    nombreEndPoint = key;
                }
                Contador = Contador + 1;
            });
            temp = openapi.paths[nombreEndPoint].get;
            temp.ruta = nombreEndPoint;

        }
        catch{

        }
        return temp;

    }

    camelCaseToTitleCase(in_camelCaseString) {
        var result = in_camelCaseString                         // "ToGetYourGEDInTimeASongAboutThe26ABCsIsOfTheEssenceButAPersonalIDCardForUser456InRoom26AContainingABC26TimesIsNotAsEasyAs123ForC3POOrR2D2Or2R2D"
            .replace(/([a-z])([A-Z][a-z])/g, "$1 $2")           // "To Get YourGEDIn TimeASong About The26ABCs IsOf The Essence ButAPersonalIDCard For User456In Room26AContainingABC26Times IsNot AsEasy As123ForC3POOrR2D2Or2R2D"
            .replace(/([A-Z][a-z])([A-Z])/g, "$1 $2")           // "To Get YourGEDIn TimeASong About The26ABCs Is Of The Essence ButAPersonalIDCard For User456In Room26AContainingABC26Times Is Not As Easy As123ForC3POOr R2D2Or2R2D"
            .replace(/([a-z])([A-Z]+[a-z])/g, "$1 $2")          // "To Get Your GEDIn Time ASong About The26ABCs Is Of The Essence But APersonal IDCard For User456In Room26AContainingABC26Times Is Not As Easy As123ForC3POOr R2D2Or2R2D"
            .replace(/([A-Z]+)([A-Z][a-z][a-z])/g, "$1 $2")     // "To Get Your GEDIn Time A Song About The26ABCs Is Of The Essence But A Personal ID Card For User456In Room26A ContainingABC26Times Is Not As Easy As123ForC3POOr R2D2Or2R2D"
            .replace(/([a-z]+)([A-Z0-9]+)/g, "$1 $2")           // "To Get Your GEDIn Time A Song About The 26ABCs Is Of The Essence But A Personal ID Card For User 456In Room 26A Containing ABC26Times Is Not As Easy As 123For C3POOr R2D2Or 2R2D"

            // Note: the next regex includes a special case to exclude plurals of acronyms, e.g. "ABCs"
            .replace(/([A-Z]+)([A-Z][a-rt-z][a-z]*)/g, "$1 $2") // "To Get Your GED In Time A Song About The 26ABCs Is Of The Essence But A Personal ID Card For User 456In Room 26A Containing ABC26Times Is Not As Easy As 123For C3PO Or R2D2Or 2R2D"
            .replace(/([0-9])([A-Z][a-z]+)/g, "$1 $2")          // "To Get Your GED In Time A Song About The 26ABCs Is Of The Essence But A Personal ID Card For User 456In Room 26A Containing ABC 26Times Is Not As Easy As 123For C3PO Or R2D2Or 2R2D"  

            // Note: the next two regexes use {2,} instead of + to add space on phrases like Room26A and 26ABCs but not on phrases like R2D2 and C3PO"
            .replace(/([A-Z]{2,})([0-9]{2,})/g, "$1 $2")        // "To Get Your GED In Time A Song About The 26ABCs Is Of The Essence But A Personal ID Card For User 456 In Room 26A Containing ABC 26 Times Is Not As Easy As 123 For C3PO Or R2D2 Or 2R2D"
            .replace(/([0-9]{2,})([A-Z]{2,})/g, "$1 $2")        // "To Get Your GED In Time A Song About The 26 ABCs Is Of The Essence But A Personal ID Card For User 456 In Room 26A Containing ABC 26 Times Is Not As Easy As 123 For C3PO Or R2D2 Or 2R2D"
            .trim();


        // capitalize the first letter
        return result.charAt(0).toUpperCase() + result.slice(1);
    }

    getArmarLista(lista: any, entidades: any): Observable<TreeNode[]> {

        this.menuEntidades = entidades;
        let lista2: TreeNode[] = [];
        let listaFiltrada: TreeNode[] = [];

        let endPoint: any = [];
        let endPointNombre = "";

        Object.keys(lista).forEach(key => {

            let nombre: string = key.toString();
            let ruta: string[] = nombre.split("/");

            if (ruta[2].startsWith("public")) {

            }
            else {

                if (endPointNombre == ruta[2]) {

                    let listaNodos: any[] = this.NodosHijos(lista[key], endPoint.label, key.toString().replace('/' + ruta[1] + '/' + ruta[2], ""), key);
                    listaNodos.forEach(element => {
                        let nodoNuevo: TreeNode = {};
                        nodoNuevo.label = element.label;
                        nodoNuevo.data = [];
                        nodoNuevo.data.metodo = element.data.metodo;
                        nodoNuevo.data.ruta = key;
                        nodoNuevo.expandedIcon = "fa fa-edit";
                        nodoNuevo.collapsedIcon = "fa fa-edit";
                        nodoNuevo.children = [];

                        endPoint.children.push(nodoNuevo);
                    });

                }
                else {

                    endPointNombre = ruta[2];

                    if (endPoint.label != null) {
                        lista2.push(endPoint);
                    }

                    let endPointTemp: TreeNode = {};
                    endPointTemp.label = endPointNombre;
                    endPointTemp.data = "raiz";
                    endPointTemp.expandedIcon = "fa fa-folder-open";
                    endPointTemp.collapsedIcon = "fa fa-folder";
                    endPointTemp.children = [];
                    endPoint = endPointTemp;

                    let listaNodos: any[] = this.NodosHijos(lista[key], endPoint.label, key.toString().replace('/' + ruta[1] + '/' + ruta[2], ""), key);

                    listaNodos.forEach(element => {
                        let nodoNuevo: any = [];
                        nodoNuevo.label = element.label;
                        nodoNuevo.data = [];
                        nodoNuevo.data.metodo = element.data.metodo;
                        nodoNuevo.data.ruta = key;
                        nodoNuevo.expandedIcon = "fa fa-edit";
                        nodoNuevo.collapsedIcon = "fa fa-edit";
                        nodoNuevo.children = [];
                        endPoint.children.push(nodoNuevo);
                    });

                }

            }
        });

        lista2.push(endPoint);



        let NombreReal: string = "";
        lista2.forEach(element => {
            var nombre = environment.openApiFiltroPermisos.find(filtro => filtro == element.label);

            if (nombre != null) {

                NombreReal = "";
                let valor = this.BuscarChildren(element);

                var ruta = element.children[valor].data.ruta
                var metodo = element.children[valor].data.metodo
                var end = lista[element.children[valor].data.ruta][element.children[valor].data.metodo]

                try {
                    NombreReal = this.BuscarNombre(lista[element.children[valor].data.ruta][element.children[valor].data.metodo]);

                    if (nombre == "documentosporfirmar") {
                        NombreReal = "Documentos por firmar";
                    }
                    else if (nombre == "bucketentrada") {
                        NombreReal = "Bandeja entrada";

                    }
                    else if (nombre == "bucketsalida") {
                        NombreReal = "Bandeja salida";

                    }
                    else if (nombre == "trazainterna") {
                        NombreReal = "Turnos";
                    }
                    else if (nombre == "actor") {
                        NombreReal = "Funcionario";
                    }
                    else if (nombre == "usuario") {
                        NombreReal = "Usuario";
                    }
                }
                catch{
                    NombreReal = element.label;
                }

                if (NombreReal != "") {
                    element.label = NombreReal;
                    listaFiltrada.push(element);
                }


            }

        })
        console.log(listaFiltrada)

        this.menuEntidadesList.next(listaFiltrada);
        return this.menuEntidadesList.asObservable();
    }

    BuscarChildren(element) {
        let index = 0;
        let valor = 1;

        element.children.forEach(child => {
            if (child.label == "Editar registro") {
                valor = index;
            }
            index = index + 1;
        })
        return valor;
    }

    MenuNodoPadre(titulo: string, metodo: string, ruta: string) {

        let nodoNuevo: MenuSideNav = new MenuSideNav();
        nodoNuevo.titulo = titulo;
        nodoNuevo.data = [];
        nodoNuevo.data.metodo = metodo;
        nodoNuevo.data.ruta = ruta;
        nodoNuevo.icono = "nav-icon fas fa-folder";
        nodoNuevo.submenu = [];

        return nodoNuevo
    }


    getListaFiltrada(): Observable<TreeNode[]> {
        this.menuEntidadesList.next([]);
        return this.menuEntidadesList.asObservable();
    }

    getDerechos() {
        return this.http.get<any>(`${environment.apiURL}/webresources/openapi.json`).pipe(map(resp => {
            this.menuEntidades = resp.components.schemas;
            return resp;
        }));;

    }

    NodosHijos(nodo: any, nombreEndPoint, ruta: string, rutaCompleta: string) {
        let listaNodos: TreeNode[] = [];

        Object.keys(nodo).forEach(key2 => {
            let Metodo: TreeNode = {}
            Metodo.label = this.equivalenciaDatos(ruta, key2, nombreEndPoint);
            Metodo.data = nodo[key2];
            Metodo.data.metodo = key2;
            Metodo.expandedIcon = "fa fa-edit";
            Metodo.collapsedIcon = "fa fa-edit";
            Metodo.children = [];
            listaNodos.push(Metodo);
        });

        return listaNodos;
    }


    equivalenciaDatos(nombre, metodo, nombreEndPoint) {

        if (nombre == "" && metodo == "get") {
            return "Listar"
        }
        else if (nombre == "/count" && metodo == "get") {
            return "Contar"
        }
        else if (nombre == "/{from}/{to}" && metodo == "get") {
            return "Buscar por rango"
        }
        else if (nombre == "/{id}" && metodo == "get") {
            return "Ver registro individualmente"
        }
        else if (nombre == "/{id}" && metodo == "delete") {
            return "Eliminar registro"
        }
        else if (nombre == "" && metodo == "post") {
            return "Crear nuevo registro"
        }
        else if (nombre == "/{id}" && metodo == "put") {
            return "Editar registro"
        }
        else {

            let MetodoNombre = "";

            if (metodo == "post") {
                MetodoNombre = "(metodo post) "
            }
            else if (metodo == "get") {
                MetodoNombre = "(metodo get) "
            }
            else if (metodo == "delete") {
                MetodoNombre = "(metodo delete) "
            }
            else if (metodo == "put") {
                MetodoNombre = "(metodo put) "
            }
            else {
                MetodoNombre = metodo
            }

            return nombre + " " + MetodoNombre
        }

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

    BuscarNombre(nodo) {

        let NombreClase: string = "";

        try {
            NombreClase = nodo.requestBody.content["application/json"].schema.$ref;
            let ruta: string[] = NombreClase.split("/");
            NombreClase = ruta[3];
            NombreClase = this.camelCaseToTitleCase(NombreClase);

            //  NombreClase = this.menuEntidades[NombreClase].xml.name;
        }
        catch{

            try {
                NombreClase = nodo.responses.default.content.default["application/json"].schema.items.$ref
                let ruta: string[] = NombreClase.split("/");
                NombreClase = ruta[3];
                NombreClase = this.camelCaseToTitleCase(NombreClase);
                // NombreClase = this.menuEntidades[NombreClase].xml.name;
            }
            catch{
                NombreClase = "";
            }


        }
        return NombreClase;
    }




}
