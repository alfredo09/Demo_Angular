import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeModule } from 'src/app/prime.module';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ModalFormsComponent } from './components/modal-forms/modal-forms.component';
import { TableComponent } from './components/table/table.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FilterInformationComponent } from "../../shared/components/filter-information/filter-information.component";
import { TableFieldTypeFormaterComponent } from 'src/app/shared/components/table-field-type-formater/table-field-type-formater.component';
import { FormControlErrorComponent } from 'src/app/shared/components/form-control-error/form-control-error.component';
import { DirectivesModule } from 'src/app/shared/modules/directives.module';

@NgModule({
    declarations: [
        ModalFormsComponent,
        TableComponent,
        ToolbarComponent
    ],
    exports: [
        ModalFormsComponent,
        TableComponent,
        ToolbarComponent
    ],
    imports: [
        CommonModule,
        ProductsRoutingModule,
        PrimeModule,
        FormsModule,
        ReactiveFormsModule,
        PipesModule,
        FilterInformationComponent,
        TableFieldTypeFormaterComponent,
        FormControlErrorComponent,
        DirectivesModule
    ]
})
export class ProductsModule { }
