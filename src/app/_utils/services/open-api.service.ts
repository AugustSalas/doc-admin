import { Injectable } from '@angular/core';
import { MenuSideNav } from '../../_modelos/navMenu.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class OpenApiService {

  menu: MenuSideNav[] = [];
  menuStatico: MenuSideNav[] = [];

  menuPermisos: any = [];
  menuPerfiles: any = [];

  openApiPermisos: any = [];
  private permisos = [];

  constructor(private http: HttpClient) {
    this.menuPermisos.Administrador = [];
    this.menuPermisos.usuario = [];
  }

  BuscarClase(clase) {
    let temp: any = null;
    try {
      let openapi = JSON.parse(sessionStorage.getItem('openApi'));
      let nombreClase = clase.responses.default.content['application/json'].schema.items.$ref.split("/")[3];
      temp = openapi.components.schemas[nombreClase];
      temp.clase = nombreClase;

    }
    catch {
      let openapi = JSON.parse(sessionStorage.getItem('openApi'));
      let nombreClase = clase.responses.default.content['application/json'].schema.$ref.split("/")[3];
      temp = openapi.components.schemas[nombreClase];
      temp.clase = nombreClase;

    }
    return temp;
  }

  getDerechos() {
    //return this.http.get(`${URL_API}/openapi.json`).pipe(map(this.crearListaItem));
    return this.http.get<any>(`${environment.apiURL}/webresources/openapi.json`);
  }

  getCurrentUser() {

    let Usuario: any = [];
    try {

      var user: any = JSON.parse(sessionStorage.getItem('currentUser'));
      var tokk = jwt_decode(user.token);
      var tokk2 = JSON.parse(tokk.privilege_model.privileges)

      let temp = JSON.parse(tokk.privilege_model.privileges);
      Usuario.usuario_id = Number.parseInt(temp[0].usuario_id);
      Usuario.usuario = temp[0].usuario;
      Usuario.nombre = temp[0].nombre + " " + temp[0].apellido_paterno + " " + temp[0].apellido_materno;
      Usuario.organizacion_remitente_id = temp[0].organizacion_remitente_id;
      Usuario.grupo_organizacional_remitente_id = temp[0].grupo_organizacional_remitente_id;

      
      Usuario.perfil = temp[0].perfiles[0];

      Usuario.remitentes = this.getPropiedad(temp[0], "remitentes");
      Usuario.destinatarios = this.getPropiedad(temp[0], "destinatarios");

      return Usuario;
    } catch (e) {
      console.log("Error al leer el usuario actual");

      return Usuario;

    }

  }

  getPropiedad(entidad, propiedad) {

    try {
      return entidad[propiedad];
    } catch {
      return null;
    }

  }


  getUsuarioToken() {

    let Usuario: any = [];

    try {
      var user: any = JSON.parse(sessionStorage.getItem('currentUser'));
      var tokk = jwt_decode(user.token);
      var tokk2 = JSON.parse(tokk.privilege_model.privileges)
      return tokk2[0];

    } catch (e) {
      console.log("Error al leer el usuario actual");

      return Usuario;

    }

  }

  BuscarDerechos() {
    //// se encarga de buscar la lista de endpoints del servicio, y armar una lista para el arbol
    this.getDerechos().subscribe((res) => {
      this.openApiPermisos = res.paths;
      // this.CrearMenu(res.paths);
      this.CrearMenu(res.paths)

    })
    //// se encarga de buscar la lista de endpoints del servicio, y armar una lista para el arbol
  }

  getPerfil() {
    let perfil22 = sessionStorage.getItem('perfil')
    return Number.parseInt(perfil22);
  }

  ActualizarMenu() {
    var user: any = JSON.parse(sessionStorage.getItem('currentUser'));
    const tokk = jwt_decode(user.token)
    let temp = JSON.parse(tokk.privilege_model.privileges);

    try {
      this.permisos = temp[0].perfiles;

    } catch {

      console.log("Error al leer los permisos del token")
    }

    this.BuscarDerechos();


  }

  CrearMenu(paths) {

    this.menu = [];
    let lista2: MenuSideNav[] = [];
    let endPoint: any = [];
    let endPointNombre = "";

    let index = 0;


    Object.keys(paths).forEach(key => {

      let nombre: string = key.toString();
      let ruta: string[] = nombre.split("/");

      if (endPointNombre == ruta[2]) {

        if (endPointNombre == "documento") {
        }

        let listaNodos: any[] = this.NodosHijos(paths[key], endPoint.titulo, key.toString().replace('/' + ruta[1] + '/' + ruta[2], ""), key, index);

        listaNodos.forEach(element => {

          let nodoNuevo: MenuSideNav = this.MenuNodoPadre(element.titulo, element.data.metodo, key)

          if (element.titulo == "Listar") {
            nodoNuevo.url = "/listado/" + element.data.index;
            nodoNuevo.icono = 'nav-icon fas fa-list';
            nodoNuevo.submenu = null;
            endPoint.submenu.push(nodoNuevo);
            lista2.push(endPoint);
          }

        });

      }
      else {

        endPointNombre = ruta[2];

        let endPointTemp: MenuSideNav = new MenuSideNav();
        let endpointObject = this.BuscarEndpoint(index);

        try {
          let Clase = this.BuscarClase(endpointObject);
          endPointTemp.titulo = this.camelCaseToTitleCase(Clase.clase);
        }
        catch {
          endPointTemp.titulo = this.camelCaseToTitleCase(endPointNombre);

        }

        endPointTemp.data = [];
        endPointTemp.data.clase = "raiz";
        endPointTemp.data.nombre = ruta[2];
        endPointTemp.icono = "folder";
        endPointTemp.submenu = [];
        endPoint = endPointTemp;
        var listaNodos: any[] = this.NodosHijos(paths[key], endPoint.titulo, key.toString().replace('/' + ruta[1] + '/' + ruta[2], ""), key, index);

        listaNodos.forEach(element => {

          let nodoNuevo: MenuSideNav = this.MenuNodoPadre(element.titulo, element.data.metodo, key)

          if (element.titulo == "Listar") {
            nodoNuevo.url = "/listado/" + element.data.index;
            nodoNuevo.icono = 'nav-icon fas fa-list';
            nodoNuevo.submenu = null;
            endPoint.submenu.push(nodoNuevo);
            lista2.push(endPoint);
          }

        });
      }
      index = index + 1;


    });

    this.MenuStatico();

    var list = [];
    lista2.forEach(element => {

      if (element.titulo.startsWith("I ")) {
      } else {

        var nombre = environment.openApiFiltro.find(filtro => filtro == element.data.nombre);

        if (nombre != null) {
          element.titulo = element.titulo.replace("entity.", "");
          if (this.BuscarPermiso("/webresources/" + nombre, "get")) {
            this.menu.push(element);
            list.push(element.data.nombre);
          }

        }
      }

    })

    console.log(list);

  }

  BuscarPermiso(url: string, metodo: string) {

    let perfil22 = sessionStorage.getItem('perfil')
    try {

      var lista: any[] = this.permisos;

      this.menuPerfiles = []

      var permisos: any[];

      let perfilPermisos;

      try {
        perfilPermisos = lista[Number.parseInt(perfil22)];
      } catch {

      }

      lista.forEach(element => {
        this.menuPerfiles.push(element.perfil_nombre);
      })

      if (perfilPermisos) {
        permisos = perfilPermisos.derechos_perfil;
        var permiso = permisos.find(x => x.metodo == metodo && x.ruta == url)
      }
      else {
        perfilPermisos = lista[0];
        permisos = perfilPermisos.derechos_perfil;
        var permiso = permisos.find(x => x.metodo == metodo && x.ruta == url)
      }

      if (permiso) {
        return true;
      }
      else {
        return false;
      }

    }
    catch {
      return false;

    }
  }

  MenuStatico() {
    this.menuStatico = [];

    //Contenido Extra
    let nodocontenidoExtra: MenuSideNav = this.MenuNodoPadre("Contenido Extra", "get", "test")
    nodocontenidoExtra.submenu.push(this.MenuNodoHijo("Videos", "/videos/lista", "nav-icon fas fa-edit"));

    //Reportes

    let nodoReportes: MenuSideNav = this.MenuNodoPadre("Reportes", "get", "test")
    nodoReportes.submenu.push(this.MenuNodoHijo("Documentos Activos", "/reportes/documentosactivos", "nav-icon fas fa-edit"));
    //nodoReportes.submenu.push(this.MenuNodoHijo("Documentos Estatus", "/reportes/documentosestatus", "nav-icon fas fa-edit"));
    nodoReportes.submenu.push(this.MenuNodoHijo("Documentos Turnados", "/reportes/documentostraza", "nav-icon fas fa-edit"));
    nodoReportes.submenu.push(this.MenuNodoHijo("Resumen General de Oficios", "/reportes/rgdo", "nav-icon fas fa-edit"));
    nodoReportes.submenu.push(this.MenuNodoHijo("Pendientes Organizacion", "/reportes/pendientesorganizacion", "nav-icon fas fa-edit"));
    nodoReportes.submenu.push(this.MenuNodoHijo("Documentos sin Acuse", "/reportes/acuse", "nav-icon fas fa-edit"));
    nodoReportes.submenu.push(this.MenuNodoHijo("Pendientes Departamento", "/reportes/PendientesDepartamento", "nav-icon fas fa-edit"));
    nodoReportes.submenu.push(this.MenuNodoHijo("Indicador Trimestral", "/reportes/Indicadores", "nav-icon fas fa-edit"));
    nodoReportes.submenu.push(this.MenuNodoHijo("Indicador Mensual", "/reportes/IndicadorMensual", "nav-icon fas fa-edit"));
    nodoReportes.submenu.push(this.MenuNodoHijo("Documentos Cerrados", "/reportes/Cerrados", "nav-icon fas fa-edit"));






    // Consultas
    let nodoConsultas: MenuSideNav = this.MenuNodoPadre("Consultas", "get", "test")
    nodoConsultas.submenu.push(this.MenuNodoHijo("Búsqueda de Documento", "/documentofisico/listaturno", "nav-icon fas fa-edit"));


    //Documento
    let nodoDocumento: MenuSideNav = this.MenuNodoPadre("Correspondencia", "get", "test")

    // if (this.BuscarPermiso("/webresources/documento", "post"))
    //   nodoDocumento.submenu.push(this.MenuNodoHijo("Nuevo Documento Electrónico", "/documento/formulario/new", "nav-icon fas fa-edit"));
    // if (this.BuscarPermiso("/webresources/documento", "get"))
    //   nodoDocumento.submenu.push(this.MenuNodoHijo("Listado Documentos Electrónicos", "/documento/lista", "nav-icon fas fa-edit"));
    if (this.BuscarPermiso("/webresources/documentofisico", "post"))
      nodoDocumento.submenu.push(this.MenuNodoHijo("Nuevo Documento Físico", "/documentofisico/formulario/new", "nav-icon fas fa-edit"));
    if (this.BuscarPermiso("/webresources/documentofisico", "get"))
      nodoDocumento.submenu.push(this.MenuNodoHijo("Listado Documentos Físicos", "/documentofisico/lista", "nav-icon fas fa-edit"));

    // nodoDocumento.submenu.push(this.MenuNodoHijo("Nuevo Documento Físico personalizado", "/documentofisico/formulariosubida/new", "nav-icon fas fa-edit"));

    // nodoDocumento.submenu.push(this.MenuNodoHijo("editor", "/documento/editor", "nav-icon fas fa-edit"));

    //DocumentoPorFirmar
    let nodoDocXFir: MenuSideNav = this.MenuNodoPadre("Documentos por Firmar", "get", "test")

    if (this.BuscarPermiso("/webresources/documentosporfirmar", "get"))
      nodoDocXFir.submenu.push(this.MenuNodoHijo("Listado Documentos por Firmar", "/DocXfirmar/lista", "nav-icon fas fa-edit"));

    //Bucket-Entrada
    let nodoBucket: MenuSideNav = this.MenuNodoPadre("Bandejas", "get", "test")

    if (this.BuscarPermiso("/webresources/bucketentrada", "get"))
      nodoBucket.submenu.push(this.MenuNodoHijo("Documentos de Entrada", "/bucket/lista", "nav-icon fas fa-edit"));
    //  if (this.BuscarPermiso("/webresources/bucketentrada", "get"))
    //   nodoBucket.submenu.push(this.MenuNodoHijo("Bandeja Urgentes", "/bucket/ListaUrgentes", "nav-icon fas fa-edit"));
    if (this.BuscarPermiso("/webresources/bucketsalida", "get"))
      nodoBucket.submenu.push(this.MenuNodoHijo("Documentos de Salida", "/bucketsalida/lista", "nav-icon fas fa-edit"));

    //Grupo Organizacional

    let nodoGpOrg: MenuSideNav = this.MenuNodoPadre("Área de Adscripción", "get", "test")

    if (this.BuscarPermiso("/webresources/grupoorganizacional", "post")) {
      nodoGpOrg.submenu.push(this.MenuNodoHijo("Nueva Área de Adscripción", "/grupoorganizacional/formulario/new", "nav-icon fas fa-edit"));
    }

    if (this.BuscarPermiso("/webresources/grupoorganizacional", "get")) {
      nodoGpOrg.submenu.push(this.MenuNodoHijo("Listado Áreas de Adscripción", "/grupoorganizacional/lista", "nav-icon fas fa-edit"));
      nodoGpOrg.submenu.push(this.MenuNodoHijo("Listado Áreas de Adscripción pie", "/grupoorganizacional/listapie", "nav-icon fas fa-edit"));
    }

    //Organizacion

    let nodoOrganizacion: MenuSideNav = this.MenuNodoPadre("Áreas", "get", "test")

    if (this.BuscarPermiso("/webresources/organizacion", "post"))
      nodoOrganizacion.submenu.push(this.MenuNodoHijo("Nueva Área", "/Organizacion/crear/new", "nav-icon fas fa-edit"));
    if (this.BuscarPermiso("/webresources/organizacion", "get"))
      nodoOrganizacion.submenu.push(this.MenuNodoHijo("Listado Áreas", "/Organizacion/lista", "nav-icon fas fa-edit"));

    //Turnos
    let nodoTurnos: MenuSideNav = this.MenuNodoPadre("Turnos", "get", "test")

    //nodoTurnos.submenu.push(nodoTurno);
    if (this.BuscarPermiso("/webresources/trazainterna/recibidos", "get"))
      nodoTurnos.submenu.push(this.MenuNodoHijo("Recibidos (Totales)", "/turnos/lista", "nav-icon fas fa-edit"));
    if (this.BuscarPermiso("/webresources/trazainterna/enviados", "get"))
      nodoTurnos.submenu.push(this.MenuNodoHijo("Enviados (Totales)", "/turnos/listaenviados", "nav-icon fas fa-edit"));
    if (this.BuscarPermiso("/webresources/trazainterna/enatencion", "get"))
      nodoTurnos.submenu.push(this.MenuNodoHijo("En Trámite", "/turnos/listaEA", "nav-icon fas fa-edit"));

    if (this.BuscarPermiso("/webresources/trazainterna/respuestas", "get"))
      nodoTurnos.submenu.push(this.MenuNodoHijo("Respuestas recibidas", "/turnos/listaRespuestas", "nav-icon fas fa-edit"));

    if (this.BuscarPermiso("/webresources/trazainterna/cerradosrecibidos", "get"))
      nodoTurnos.submenu.push(this.MenuNodoHijo("Cerrados Recibidos", "/turnos/listaCR", "nav-icon fas fa-edit"));

    if (this.BuscarPermiso("/webresources/trazainterna/cerradosenviados", "get"))
      nodoTurnos.submenu.push(this.MenuNodoHijo("Cerrados Enviados", "/turnos/listaCE", "nav-icon fas fa-edit"));

    //Grupo Envio
    let nodoGrupoEnvio: MenuSideNav = this.MenuNodoPadre("Grupo Envío", "get", "test")

    //nodoGrupoEnvio.submenu.push(nodoGE);
    if (this.BuscarPermiso("/webresources/grupoenvio", "post"))
      nodoGrupoEnvio.submenu.push(this.MenuNodoHijo("Nuevo grupoEnvio", "/grupoEnvio/crear/new", "nav-icon fas fa-edit"));
    if (this.BuscarPermiso("/webresources/grupoenvio", "get"))
      nodoGrupoEnvio.submenu.push(this.MenuNodoHijo("Listado grupoEnvio", "/grupoEnvio/lista", "nav-icon fas fa-edit"));


    //Administracion
    let nodoAdministracion: MenuSideNav = this.MenuNodoPadre("Administración", "get", "test")

    if (this.BuscarPermiso("/webresources/actor", "post"))
      nodoAdministracion.submenu.push(this.MenuNodoHijo("Nuevo Funcionario", "/actor/crear/new", "nav-icon fas fa-edit"));
    if (this.BuscarPermiso("/webresources/actor", "get"))
      nodoAdministracion.submenu.push(this.MenuNodoHijo("Listado Funcionarios", "/actor/lista", "nav-icon fas fa-edit"));

    nodoAdministracion.submenu.push(this.MenuNodoHijo("Listado de Asistentes de Funcionarios", "/actor/listaadmin", "nav-icon fas fa-edit"));

    if (this.BuscarPermiso("/webresources/usuario", "post"))
      nodoAdministracion.submenu.push(this.MenuNodoHijo("Nuevo Usuario-Perfil", "/iup/crear/new", "nav-icon fas fa-edit"));
    if (this.BuscarPermiso("/webresources/usuario", "get"))
      nodoAdministracion.submenu.push(this.MenuNodoHijo("Listado Usuario-Perfil", "/iup/lista", "nav-icon fas fa-edit"));

    if (this.BuscarPermiso("/webresources/perfil", "post"))
      nodoAdministracion.submenu.push(this.MenuNodoHijo("Nuevo Perfil", "/perfil/formulario/new", "nav-icon fas fa-edit"));
    if (this.BuscarPermiso("/webresources/perfil", "get"))
      nodoAdministracion.submenu.push(this.MenuNodoHijo("Listado Perfil", "/perfil/lista", "nav-icon fas fa-edit"));

    //nodoGrupoEnvio.submenu.push(nodoGE);
    if (this.BuscarPermiso("/webresources/grupoenvio", "post"))
      nodoAdministracion.submenu.push(this.MenuNodoHijo("Nuevo Grupo de Envío", "/grupoEnvio/crear/new", "nav-icon fas fa-edit"));
    if (this.BuscarPermiso("/webresources/grupoenvio", "get"))
      nodoAdministracion.submenu.push(this.MenuNodoHijo("Listado Grupo de Envío", "/grupoEnvio/lista", "nav-icon fas fa-edit"));

    if (this.BuscarPermiso("/webresources/contacto", "post"))
      nodoAdministracion.submenu.push(this.MenuNodoHijo("Nuevo Contacto", "/contacto/crear/new", "nav-icon fas fa-edit"));
    if (this.BuscarPermiso("/webresources/contacto", "get"))
      nodoAdministracion.submenu.push(this.MenuNodoHijo("Listado Contacto", "/contacto/lista", "nav-icon fas fa-edit"));

    //Indicador
    let nodoIndicador: MenuSideNav = this.MenuNodoPadre("Indicador", "get", "test")

    //nodoIndicador.submenu.push(nodoIndicador);
    if (this.BuscarPermiso("/webresources/indicador", "post"))
      nodoIndicador.submenu.push(this.MenuNodoHijo("Nuevo Indicador", "/indicador/crear/new", "nav-icon fas fa-edit"));
    if (this.BuscarPermiso("/webresources/indicador", "get"))
      nodoIndicador.submenu.push(this.MenuNodoHijo("Listado Indicador", "/indicador/lista", "nav-icon fas fa-edit"));





    //Documento
    if (nodoDocumento.submenu.length > 0)
      this.menuStatico.push(nodoDocumento);

    //DocumentoPorFirmar
    if (nodoDocXFir.submenu.length > 0)
      this.menuStatico.push(nodoDocXFir);

    //Bucket-Entrada
    if (nodoBucket.submenu.length > 0)
      this.menuStatico.push(nodoBucket);

    //Turnos
    if (nodoTurnos.submenu.length > 0)
      this.menuStatico.push(nodoTurnos);

    //Administracion
    if (nodoAdministracion.submenu.length > 0)
      this.menuStatico.push(nodoAdministracion);

    //Grupo Organizacional
    if (nodoGpOrg.submenu.length > 0)
      this.menuStatico.push(nodoGpOrg);

    //Organizacion
    if (nodoOrganizacion.submenu.length > 0)
      this.menuStatico.push(nodoOrganizacion);

    //Reportes
    nodoReportes
    this.menuStatico.push(nodoReportes);

    //Consultas
    nodoConsultas
    this.menuStatico.push(nodoConsultas);

    //Contenido extra
  //  if (nodocontenidoExtra.submenu.length > 0)
   //   this.menuStatico.push(nodocontenidoExtra);

    //Grupo Envio
    // if (nodoGrupoEnvio.submenu.length > 0)
    //  this.menuStatico.push(nodoGrupoEnvio);

    //Indicador
    if (nodoIndicador.submenu.length > 0)
      this.menuStatico.push(nodoIndicador);


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

  MenuNodoHijo(titulo: string, url: string, icono: string) {

    let nodoNuevo: MenuSideNav = new MenuSideNav();
    nodoNuevo.titulo = titulo;
    nodoNuevo.data = [];
    nodoNuevo.submenu = null;
    nodoNuevo.url = url;
    nodoNuevo.icono = icono;
    nodoNuevo.submenu = null;

    return nodoNuevo
  }



  NodosHijos(nodo: any, nombreEndPoint, ruta: string, rutaCompleta: string, index: number) {
    let listaNodos: MenuSideNav[] = [];

    Object.keys(nodo).forEach(key2 => {
      let Metodo: MenuSideNav = new MenuSideNav();

      Metodo.titulo = this.equivalenciaDatos(ruta, key2, nombreEndPoint);
      Metodo.data = nodo[key2];
      Metodo.data.metodo = key2;
      Metodo.data.ruta = rutaCompleta;
      Metodo.data.index = index;
      Metodo.icono = "fa fa-edit";
      Metodo.submenu = [];
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
    catch {

    }
    return temp;

  }

  BuscarEndpointRuta(ruta, metodo) {
    let temp: any = [];
    try {
      let openapi = JSON.parse(sessionStorage.getItem('openApi'));
      temp = openapi.paths[ruta][metodo];
    }
    catch {

    }
    return temp;
  }

  BuscarEndpointPorClase(clase) {
    let temp: any = [];
    try {
      let openapi = JSON.parse(sessionStorage.getItem('openApi'));
      let nombreEndPoint: string = "";

      let Contador = 0;
      Object.keys(openapi.paths).forEach(key => {

        try {
          let nombreClase = openapi.paths[key].get.responses.default.content['application/json'].schema.items.$ref;

          if (clase == nombreClase) {
            let temp = key.split("/");
            nombreEndPoint = "/" + temp[1] + "/" + temp[2];
          }
        }
        catch {

        }


        Contador = Contador + 1;
      });
      temp = openapi.paths[nombreEndPoint].get;
      temp.ruta = nombreEndPoint;

    }
    catch {

    }
    return temp;


  }

  BuscarEndpointClase(endpoint) {
    let Clase = [];
    try {

      let temp = endpoint.responses.default.content["application/json"].schema.items.$ref.split("/");
      let openapi = JSON.parse(sessionStorage.getItem('openApi'));
      Clase = openapi.components.schemas[temp[3]];
    }
    catch {

    }
    return Clase;
  }

  ListaCamposClase(clase) {
    let Campos = [{ field: "Acciones", header: "Acciones" }];
    let nombre: string = "";
    try {

      Object.keys(clase.properties).forEach(key => {

        let nodo: any = [];
        nodo.field = key;
        nodo.header = this.camelCaseToTitleCase(key);
        if (nodo.header.endsWith("Collection") || nodo.header.endsWith("Collection1")) {

        }
        else {

          if (key.startsWith("ctrl")) {

          } else {
            Campos.push(nodo);

          }
        }

      });

    }
    catch {

    }
    return Campos;
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

  getMenu(filtro: string) {
    if (filtro.length > 0) {
      return this.menu.filter((element) => element.titulo.toLowerCase().includes(filtro));
    }
    else {
      return this.menu.filter((element) => element.titulo.length);
    }
  }

  getMenuStatico(filtro: string) {
    if (filtro.length > 0) {
      return this.menuStatico.filter((element) => element.titulo.toLowerCase().includes(filtro));
    }
    else {
      return this.menuStatico.filter((element) => element.titulo.length);
    }
  }

  FiltroPropiedades(Clase: any) {

    let ListadoBolean: string[] = [];
    let ListadoObject: string[] = [];
    let ListadoString: string[] = [];
    let ListadoInt: string[] = [];
    let ListadoClaseCompleto: string[] = [];
    let ClaseVacia: any = [];

    Object.keys(Clase.properties).forEach(key => {
      try {
        if (key.endsWith("Collection") || key.endsWith("Collection1")) {
        }
        else {
          if (key.startsWith("ctrl")) {

          } else {
            try {

              if (Clase.properties[key].type == "boolean") {
                ListadoBolean.push(key)
              }

              else if (Clase.properties[key].type == "string") {
                ListadoString.push(key)
              }

              else if (Clase.properties[key].type == "integer") {
                ClaseVacia[key] = true;
                ListadoInt.push(key)
              }

              else {
                ClaseVacia[key] = true;
                ListadoObject.push(key)
              }


            }
            catch {
            }

          }


        }

      }
      catch {
        ListadoObject.push(key)
      }

    });

    ListadoBolean.forEach(element => {
      ClaseVacia[element] = false;
      ListadoClaseCompleto.push(element);
    })

    ListadoString.forEach(element => {
      ClaseVacia[element] = "";
      ListadoClaseCompleto.push(element);

    })

    ListadoInt.forEach(element => {
      ClaseVacia[element] = "";
      ListadoClaseCompleto.push(element);

    })

    ListadoObject.forEach(element => {
      ClaseVacia[element] = "";
      ListadoClaseCompleto.push(element);

    })

    let temp: any = [];
    temp.ClaseVacia = ClaseVacia;
    temp.ListadoClaseCompleto = ListadoClaseCompleto;


    return temp;
  }



}
