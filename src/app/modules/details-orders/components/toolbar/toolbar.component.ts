import { Component, OnInit } from '@angular/core';
import { DetailsOrdersService } from '../../services/details-orders.service';
import { TableComponent } from '../table/table.component';
import { tooltip } from 'src/app/core/constants/labels';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
    public tooltip = tooltip;
    
    private tableComponent: TableComponent | null = null;

    constructor(private detailsOrdersService: DetailsOrdersService) { }

    ngOnInit() {
        this.detailsOrdersService.triggerTable.subscribe((tableComponent) => {
            this.tableComponent = tableComponent;
        });
    }
}
