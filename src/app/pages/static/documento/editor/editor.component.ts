import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DinamicoService } from 'src/app/_utils/services/dinamico.service';

import * as Editor from '../../../../../assets/ckeditor5/build/ckeditor';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})

export class EditorComponent implements OnInit {
  public Editor = Editor;

  isLinear = true;
  pdfFormart: any;

  firstFormGroup: FormGroup;          // se usan en los tabs de la forma
  secondFormGroup: FormGroup;
  @ViewChild('editor', { static: false }) contenidoEditor: any;

  sizes = [
    { label: 'Carta', value: "carta" },
    { label: 'Oficio', value: "oficio" },
    { label: 'A6', value: "a6" }

  ];

  orientaciones = [
    { label: 'Vertical', value: "vertical" },
    { label: 'Horizontal', value: "horizontal" },

  ];
  orientacion="vertical"
  size = "carta";

  editorConfig = {
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'indent',
        'outdent',
        '|',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'imageInsert',
        'undo',
        'redo',
        '|',
        'alignment',
        'fontBackgroundColor',
        'fontColor',
        'fontSize',
        'fontFamily',
        'highlight',
        'horizontalLine',
        'pageBreak',
        'underline'
      ]
    },
    language: 'es',
    image: {
      toolbar: [
        'imageTextAlternative',
        'imageStyle:full',
        'imageStyle:side'
      ]
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableCellProperties',
        'tableProperties'
      ]
    },
    licenseKey: '',
  };

  public isDisabled = false;
  ckconfig;

  htmlContent = '<h1>Lic. Eleazar Guerrero Pérez</h1><p>Subsecretario de Finanzas y Administración</p><p>Presente</p><p><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></p><p style="text-align:justify;">En respuesta a su Oficio SFA/442/2020, en el que se solicita remitir un informe mensual de los actos y procedimientos administrativos que se realicen por los órganos y áreas administrativas de esta Secretaría; con fundamento en el párrafo segundo del artículo 3 del Código de Procedimientos Administrativos para el Estado de Veracruz, informo a Usted lo siguiente:</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">Se anexa vía impresa el informe correspondiente al mes de Abril del año 2020, que contiene las actividades llevadas a cabo en apego a las atribuciones de esta Dirección General; cabe mencionar que tal información se ha enviado vía electrónica al correo institucional <a href="mailto:avargasm@veracruz.gob.mx">avargasm@veracruz.gob.mx</a> del Lic. Aarón Vargas Montaño.</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">Sin otro particular, reciba un cordial saludo.&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p>&nbsp;</p><p style="text-align:center;"><strong>Atentamente</strong></p><p style="text-align:center;"><strong>&nbsp;</strong></p><p style="text-align:center;"><strong>&nbsp;</strong></p><p style="text-align:center;"><strong>&nbsp;</strong></p><p style="text-align:center;"><strong>&nbsp;</strong></p><p style="text-align:center;"><strong>Mtro. Jesús Neftalí Andrade García</strong></p><p style="text-align:center;">Director General de Innovación Tecnológica</p>'

  constructor(private _formbuilder: FormBuilder,
    private dinamicoService: DinamicoService,   // servicio dinamico que se puede usar en cualquier endpoint

  ) {
    this.firstFormGroup = this._formbuilder.group([]);
    this.secondFormGroup = this._formbuilder.group([]);

  }

  Guardar() {


    let temp: any = {};

    temp.size = this.size
    temp.orientacion = this.orientacion
    temp.doc = this.contenidoEditor.editorInstance.getData()



    this.dinamicoService.imprimirReporte("/webresources/documentofisico/reporte3", temp).subscribe(resp => {
      debugger
      console.log(resp)
      this.pdfFormart = resp

    });

    console.log(this.htmlContent)
  }


  ngOnInit(): void {
    debugger

  }


}


