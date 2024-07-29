import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { PrimeModule } from 'src/app/prime.module';
import { StoreRoutingModule } from './stores-routing.module';
import { ModalFormsComponent } from './components/modal-forms/modal-forms.component';
import { TableComponent } from './components/table/table.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FilterInformationComponent } from "../../shared/components/filter-information/filter-information.component";
import { FormControlErrorComponent } from 'src/app/shared/components/form-control-error/form-control-error.component';
import { TableFieldTypeFormaterComponent } from 'src/app/shared/components/table-field-type-formater/table-field-type-formater.component';
import { DirectivesModule } from 'src/app/shared/modules/directives.module';

@NgModule({
  declarations: [
    TableComponent,
    ToolbarComponent,
    ModalFormsComponent,
  ],
  imports: [
    CommonModule,
    PrimeModule,
    StoreRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    FilterInformationComponent,
    FormControlErrorComponent,
    TableFieldTypeFormaterComponent,
    DirectivesModule
  ],
  exports: [
    TableComponent,
    ToolbarComponent,
    ModalFormsComponent,
  ],
})
export class StoresModule {}
