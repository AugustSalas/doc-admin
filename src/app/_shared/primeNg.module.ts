import { NgModule } from '@angular/core';
import {PickListModule} from 'primeng/picklist';  
import {DropdownModule} from 'primeng/dropdown';
import {ChipsModule} from 'primeng/chips';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {OrderListModule} from 'primeng/orderlist';
import {ToastModule} from 'primeng/toast';
import { MessageService } from "primeng/api"
import {FieldsetModule} from 'primeng/fieldset';
import {ToolbarModule} from 'primeng/toolbar';
import {EditorModule} from 'primeng/editor';
import {InputMaskModule} from 'primeng/inputmask';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TreeModule} from 'primeng/tree';
import {DialogModule} from 'primeng/dialog';
import {SplitButtonModule} from 'primeng/splitbutton';
import {MultiSelectModule} from 'primeng/multiselect';
import {SelectButtonModule} from 'primeng/selectbutton';
import {CheckboxModule} from 'primeng/checkbox';


@NgModule({
  imports: [
    PickListModule,
    DropdownModule,
    ChipsModule,
    OverlayPanelModule,
    ButtonModule,
    TableModule,
    OrderListModule,
    ToastModule,
    FieldsetModule,
    ToolbarModule,
    EditorModule,
    InputMaskModule,
    ProgressSpinnerModule,
    TreeModule,
    DialogModule,
    SplitButtonModule,
    MultiSelectModule,
    SelectButtonModule,
    CheckboxModule

  ],
  exports: [
    PickListModule,
    DropdownModule,
    ChipsModule,
    OverlayPanelModule,
    ButtonModule,
    TableModule,
    OrderListModule,
    ToastModule,
    FieldsetModule,
    ToolbarModule,
    EditorModule,
    InputMaskModule,
    ProgressSpinnerModule,
    TreeModule,
    DialogModule,
    SplitButtonModule,
    MultiSelectModule,
    SelectButtonModule,
    CheckboxModule

  ],
  providers: [ MessageService ]
})
export class PrimeNgModule { }
