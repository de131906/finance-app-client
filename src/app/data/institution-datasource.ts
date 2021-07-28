import { DataSource } from "@angular/cdk/collections";
import { Institution } from '../model/institution';
import { InstitutionService } from '../service/institution-service';
import { BaseDataSource } from "./base-datasource";

export class InstitutionDatasource extends BaseDataSource<Institution> implements DataSource<Institution> {

	constructor(institutionService: InstitutionService) {
		super();
    }

}
