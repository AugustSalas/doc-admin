import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators,FormBuilder, Form} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {BucketEntradaService} from 'src/app/_utils/services/Service-Entidades/BucketEntrada.service';
import {DocumentoFisicoService} from 'src/app/_utils/services/Service-Entidades/documentoFisico.service';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
 import Swal from 'sweetalert2';
 import {Observable} from 'rxjs';
 import {BucketEntradaMdl} from 'src/app/_modelos/bucketentrada1';
 import {DocumentoFisicoMdl} from 'src/app/_modelos/documento';

 


@Component({
  selector: 'app-bucket-listado',
  templateUrl: './ObservacionesBE.component.html',
})
export class ObservacionesBEComponent implements OnInit {

  BE: BucketEntradaMdl = new BucketEntradaMdl()

  doc:DocumentoFisicoMdl = new DocumentoFisicoMdl()
  docs:DocumentoFisicoMdl[]=[]
 
  
  formGroup: FormGroup;
  
  get f() { return this.formGroup.controls; }
  isSave: boolean = true
 
  constructor(
    private _formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private BEservice: BucketEntradaService,
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
      this.BEservice.BucketEntradaFind(Number(id)).subscribe((resp:BucketEntradaMdl) => {

        debugger
          this.BE = resp
        
          this.BE.documentoFisicoId.observacionesCierre = "";

          debugger
          this.formGroup = this._formbuilder.group(this.BE.documentoFisicoId);
          
        })
    }
  }

  
    

    CerrarDocumentoBE(){
    
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

    if(this.BE.documentoFisicoId.documentoFisicoId){
      this.BE.documentoFisicoId.ctrlCreado = this.BE.documentoFisicoId.ctrlCreado
      peticion = this.DFservice.DocumentoEdit(this.BE.documentoFisicoId.documentoFisicoId,this.doc)

      console.log(this.BE.documentoFisicoId)
    }

    
  

    peticion.subscribe(resp => {
      Swal.fire({
        title:this.doc.documentoFisicoId,
        text:'Realizado correctamente',
        icon:'success',
      })
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

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/bucket/lista']);
            
            
        }); 

 
  }

}

