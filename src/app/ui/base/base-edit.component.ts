import { BaseEntity } from "src/app/model/base-entity";

export abstract class BaseEditComponent <T extends BaseEntity> {
	
  compareEntity(x: T, y: T): boolean {
	return (x && y ? x.id === y.id : x === y);
  }
}