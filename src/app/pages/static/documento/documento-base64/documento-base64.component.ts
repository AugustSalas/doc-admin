import { Component, OnInit, Input } from '@angular/core';
import { AcuseDocumentoFisico64Mdl, AcuseDocumentoFisicoMdl } from 'src/app/_modelos/acuse';
import { Anexo64Mdl, AnexoMdl, AnexoDocumentoFisico64Mdl, AnexoDocumentoFisicoMdl } from 'src/app/_modelos/anexo';
import { DocumentoFisicoOriginal64Mdl, DocumentoFisicoOriginalMdl } from 'src/app/_modelos/documento';
import { DocumentoFisicoFormularioComponent } from '../documento-fisico-formulario/documento-fisico-formulario.component';
import { DocumentoFisicoSubidaComponent } from '../documento-fisico-subida/documento-fisico-subida.component';

@Component({
  selector: 'app-documento-base64',
  templateUrl: './documento-base64.component.html',
  styleUrls: ['./documento-base64.component.scss']
})
export class DocumentoBase64Component implements OnInit {

  @Input('listaAnexos') ListaAnexo64: Anexo64Mdl[] = null;
  @Input('listaDocumentoFisico') ListaDocumentoFisico64: AnexoDocumentoFisico64Mdl[] = null;
  @Input('DocumentoFisico') DocumentoFisico64: DocumentoFisicoOriginal64Mdl = null;
  @Input('label') labelImage: string = 'Seleccionar Imagen';
  @Input('listaDocumentoFisicoAcuse') ListaDocumentoFisico64Acuse: AcuseDocumentoFisico64Mdl[] = null;

  DocumentoFisicoOriginal64Mdl
  inputImage: any = [];

  constructor() { }

  ngOnInit(): void {
    try {
      this.ListaDocumentoFisico64[0].anexoDocumentoFisico;
    } catch (error) {

    }

  }

  onSelectFile(event) {  // se usa cuando se adjunta un documento
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var temp: any = [];
        temp.archivo = event.target.files[i];
        this.agregarImagen(temp)
      }
    }
    this.inputImage = [];
  }

  agregarImagen(imagen) { // se usa cuando se adjunta un documento


    var reader = new FileReader();

    reader.readAsDataURL(imagen.archivo);
    reader.onload = (event: any) => {
      imagen.imagen = event.target.result

      if (this.ListaAnexo64 != null) {

        var anexo: AnexoMdl = new AnexoMdl();
        anexo.nombreArchivoOriginal = imagen.archivo.name;
        anexo.mime = imagen.archivo.type;
        anexo.nombre = imagen.archivo.name;
        anexo.descripcion = imagen.archivo.name;
        var anexo64: Anexo64Mdl = new Anexo64Mdl();
        anexo64.anexo = anexo;
        anexo64.base64 = event.target.result;
        this.ListaAnexo64.push(anexo64);
        console.log(this.ListaAnexo64);

      }
      else if (this.ListaDocumentoFisico64 != null) {

        var anexoFisico: AnexoDocumentoFisicoMdl = new AnexoDocumentoFisicoMdl();
        anexoFisico.nombreArchivoOriginal = imagen.archivo.name;
        anexoFisico.mime = imagen.archivo.type;
        anexoFisico.nombre = imagen.archivo.name;
        anexoFisico.descripcion = imagen.archivo.name;
        var anexoFisico64: AnexoDocumentoFisico64Mdl = new AnexoDocumentoFisico64Mdl();
        anexoFisico64.anexoDocumentoFisico = anexoFisico;
        anexoFisico64.base64 = event.target.result;
        this.ListaDocumentoFisico64.push(anexoFisico64);
        console.log(this.ListaDocumentoFisico64);

      }
      else if (this.ListaDocumentoFisico64Acuse != null) {

        var acuseFisico: AcuseDocumentoFisicoMdl = new AcuseDocumentoFisicoMdl();
        acuseFisico.nombreArchivoOriginal = imagen.archivo.name;
        acuseFisico.mime = imagen.archivo.type;
        acuseFisico.nombre = imagen.archivo.name;
        acuseFisico.descripcion = imagen.archivo.name;
        var acuseFisico64: AcuseDocumentoFisico64Mdl = new AcuseDocumentoFisico64Mdl();
        acuseFisico64.acuseDocumentoFisico = acuseFisico;
        acuseFisico64.base64 = event.target.result;
        this.ListaDocumentoFisico64Acuse.push(acuseFisico64);
        console.log(this.ListaDocumentoFisico64Acuse);

      }

      else {

        var documentoOriginal: DocumentoFisicoOriginalMdl = new DocumentoFisicoOriginalMdl();

        documentoOriginal.nombreArchivoOriginal = imagen.archivo.name;
        documentoOriginal.mime = imagen.archivo.type;
        documentoOriginal.nombre = imagen.archivo.name;
        documentoOriginal.descripcion = imagen.archivo.name;

        this.DocumentoFisico64.anexo = documentoOriginal;
        this.DocumentoFisico64.base64 = event.target.result;

      }

    }
  }

  agregarImagenBlob(blob, doc: DocumentoFisicoFormularioComponent) { // se usa cuando se adjunta un documento

    var imagen: any = [];

    var reader = new FileReader();

    reader.readAsDataURL(blob);

    reader.onload = (event: any) => {
      imagen.imagen = event.target.result

      if (this.ListaAnexo64 != null) {

        var anexo: AnexoMdl = new AnexoMdl();
        anexo.nombreArchivoOriginal = imagen.archivo.name;
        anexo.mime = imagen.archivo.type;
        anexo.nombre = imagen.archivo.name;
        anexo.descripcion = imagen.archivo.name;
        var anexo64: Anexo64Mdl = new Anexo64Mdl();
        anexo64.anexo = anexo;
        anexo64.base64 = event.target.result;
        this.ListaAnexo64.push(anexo64);
        console.log(this.ListaAnexo64);

      }
      else if (this.ListaDocumentoFisico64 != null) {

        var anexoFisico: AnexoDocumentoFisicoMdl = new AnexoDocumentoFisicoMdl();
        anexoFisico.nombreArchivoOriginal = imagen.archivo.name;
        anexoFisico.mime = imagen.archivo.type;
        anexoFisico.nombre = imagen.archivo.name;
        anexoFisico.descripcion = imagen.archivo.name;
        var anexoFisico64: AnexoDocumentoFisico64Mdl = new AnexoDocumentoFisico64Mdl();
        anexoFisico64.anexoDocumentoFisico = anexoFisico;
        anexoFisico64.base64 = event.target.result;
        this.ListaDocumentoFisico64.push(anexoFisico64);
        console.log(this.ListaDocumentoFisico64);

      }
      else {

        var documentoOriginal: DocumentoFisicoOriginalMdl = new DocumentoFisicoOriginalMdl();

        documentoOriginal.nombreArchivoOriginal = "documentoOriginal.pdf";
        documentoOriginal.mime = "application/pdf";
        documentoOriginal.nombre = "documentoOriginal.pdf";
        documentoOriginal.descripcion = "documentoOriginal.pdf";

        this.DocumentoFisico64.anexo = documentoOriginal;
        this.DocumentoFisico64.base64 = event.target.result;
        doc.GuardarAnexo();

      }



    }
  }

  agregarImagenBlobSubida(blob, doc: DocumentoFisicoSubidaComponent) { // se usa cuando se adjunta un documento

    var imagen: any = [];

    var reader = new FileReader();

    reader.readAsDataURL(blob);

    reader.onload = (event: any) => {
      imagen.imagen = event.target.result

      if (this.ListaAnexo64 != null) {

        var anexo: AnexoMdl = new AnexoMdl();
        anexo.nombreArchivoOriginal = imagen.archivo.name;
        anexo.mime = imagen.archivo.type;
        anexo.nombre = imagen.archivo.name;
        anexo.descripcion = imagen.archivo.name;
        var anexo64: Anexo64Mdl = new Anexo64Mdl();
        anexo64.anexo = anexo;
        anexo64.base64 = event.target.result;
        this.ListaAnexo64.push(anexo64);
        console.log(this.ListaAnexo64);

      }
      else if (this.ListaDocumentoFisico64 != null) {

        var anexoFisico: AnexoDocumentoFisicoMdl = new AnexoDocumentoFisicoMdl();
        anexoFisico.nombreArchivoOriginal = imagen.archivo.name;
        anexoFisico.mime = imagen.archivo.type;
        anexoFisico.nombre = imagen.archivo.name;
        anexoFisico.descripcion = imagen.archivo.name;
        var anexoFisico64: AnexoDocumentoFisico64Mdl = new AnexoDocumentoFisico64Mdl();
        anexoFisico64.anexoDocumentoFisico = anexoFisico;
        anexoFisico64.base64 = event.target.result;
        this.ListaDocumentoFisico64.push(anexoFisico64);
        console.log(this.ListaDocumentoFisico64);

      }
      else {

        var documentoOriginal: DocumentoFisicoOriginalMdl = new DocumentoFisicoOriginalMdl();

        documentoOriginal.nombreArchivoOriginal = "documentoOriginal.pdf";
        documentoOriginal.mime = "application/pdf";
        documentoOriginal.nombre = "documentoOriginal.pdf";
        documentoOriginal.descripcion = "documentoOriginal.pdf";

        this.DocumentoFisico64.anexo = documentoOriginal;
        this.DocumentoFisico64.base64 = event.target.result;
        doc.GuardarAnexo();

      }



    }
  }

  eliminarImagen(file) { // cuando se eliminar un adjunto
    if (this.ListaAnexo64 != null) {
      if (file.anexo.anexoId == null) {
        //this.urls.splice(url, 1);
        var temp = this.ListaAnexo64.indexOf(file);
        this.ListaAnexo64.splice(temp, 1);
      }
      else {
        file.anexo.ctrlActivo = false;
      }
    } else if (this.ListaDocumentoFisico64 != null) {
      if (file.anexoDocumentoFisico.documentoFisicoId == null) {
        //this.urls.splice(url, 1);
        var temp = this.ListaDocumentoFisico64.indexOf(file);
        this.ListaDocumentoFisico64.splice(temp, 1);
      }
      else {
        file.anexoDocumentoFisico.ctrlActivo = false;
      }

    }

    else {

      if (file.documentoFisico.documentoFisicoId == null) {
        this.DocumentoFisico64.anexo = null;
      }
      else {
        file.documentoFisico.ctrlActivo = false;
      }


    }

  }

  downloadFile(file, nombre) {
    const linkSource = file;
    const downloadLink = document.createElement("a");
    const fileName = nombre;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }
}
