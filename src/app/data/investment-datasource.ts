import { DataSource } from "@angular/cdk/collections";
import { MatSort } from '@angular/material/sort';
import { BaseDataSource } from "./base-datasource";
import { Investment } from "../model/investment";
import { InvestmentService } from "../service/investment-service";

export class InvestmentDatasource extends BaseDataSource<Investment> implements DataSource<Investment> {

	constructor(service: InvestmentService) {
		super();
    }

    sort(sort: MatSort) {
		let dsData = this.dsSubject.getValue();
		if (sort.active && sort.direction !== '') {
            dsData = dsData.sort((a: Investment, b: Investment) => {
                const isAsc = sort.direction === 'asc';
                switch (sort.active) {
                    case 'profit': return this.compare(a.profit, b.profit, isAsc);
                    default: return 0;
                }
            });
        }
        this.dsSubject.next(dsData);
	}
	
    private compare(a, b, isAsc) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
}
