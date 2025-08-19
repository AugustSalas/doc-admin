import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators,FormBuilder, Form} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {TrazaInternaService} from 'src/app/_utils/services/Service-Entidades/TrazaInternaService';
import {DocumentoFisicoService} from 'src/app/_utils/services/Service-Entidades/documentoFisico.service';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
 import Swal from 'sweetalert2';
 import {Observable} from 'rxjs';
 import {TrazaInternaMdl} from 'src/app/_modelos/Traza_interna';
 import {DocumentoFisicoMdl} from 'src/app/_modelos/documento';


@Component({

  selector: 'app-turnos-listado',
  templateUrl: './ObservacionesTR.component.html',

})

export class ObservacionesTRComponent implements OnInit {

  TI: TrazaInternaMdl = new TrazaInternaMdl()

  doc:DocumentoFisicoMdl = new DocumentoFisicoMdl()
  docs:DocumentoFisicoMdl[]=[]
 
  
  formGroup: FormGroup;
  
  get f() { return this.formGroup.controls; }
  isSave: boolean = true
 
  constructor(
    private _formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private TIservice: TrazaInternaService,
    private DFservice: DocumentoFisicoService,
    public apiService: OpenApiService,
    
    ) { 

      this.formGroup = this._formbuilder.group(this.doc);
    }

  ngOnInit() {

    
      
    //obtengo el parametro en la ruta GET
    const id = this.route.snapshot.paramMap.get('id')
    if(id !== 'new'){
      this.isSave = false
      //Editar
      this.TIservice.TrazaInternaFind(Number(id)).subscribe((resp:TrazaInternaMdl) => {

        debugger
          this.TI = resp
        
          this.TI.documentoFisicoId.observacionesCierre = "";

          debugger
          this.formGroup = this._formbuilder.group(this.TI.documentoFisicoId);
          
        })
    }
  }

    CerrarDocumentoTR(){
    
      if(this.formGroup.invalid){
      //Aquí va la validación del form
      console.log(this.formGroup)
      console.log('Form no valido')
      return
    }
    let peticion : Observable<any>
    Swal.fire({
      title:'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick:false
    })

    debugger

    this.doc = this.formGroup.value;
    this.doc.ctrlActivo = true;
    this.doc.ctrlCreadoPor =1;
    this.doc.ctrlActualizado = new Date();
    this.doc.ctrlActualizadoPor = 1;
    this.doc.estatusDocumentoId = 3
   
 
  
    Swal.showLoading()

    debugger

    if(this.TI.documentoFisicoId.documentoFisicoId){
      this.TI.documentoFisicoId.ctrlCreado = this.TI.documentoFisicoId.ctrlCreado
      peticion = this.DFservice.DocumentoEdit(this.TI.documentoFisicoId.documentoFisicoId,this.doc)

      console.log(this.TI.documentoFisicoId)
    }

    
  

    peticion.subscribe(resp => {
      Swal.fire({
        title:this.doc.documentoFisicoId,
        text:'Realizado correctamente',
        icon:'success',
      })
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/turnos/lista']);  
      }); 
    },

    error => {
      if(error){

      }

      Swal.fire({
        title:this.doc.documentoFisicoId,
        text:'error',
        icon:'error',
      })
    },
    
    )

    

 
  }

}

