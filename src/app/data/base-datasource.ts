import { CollectionViewer } from "@angular/cdk/collections";
import { BehaviorSubject } from "rxjs";
import { Observable } from 'rxjs';
import { BaseEntity } from "../model/base-entity";

export abstract class BaseDataSource<T extends BaseEntity> {
	
	dsSubject = new BehaviorSubject<T[]>([]);
	
	connect(collectionViewer: CollectionViewer): Observable<T[]> {
         return this.dsSubject.asObservable();
    }
	
    disconnect(collectionViewer: CollectionViewer): void {
        this.dsSubject.complete();
    }

	setData(data: T[]): void {
		this.dsSubject.next(data);
	}
	
	addOrUpdate(item: T): void {
		const index: number = this.findIndexOf(item);
		const items = this.dsSubject.getValue();
		if (index > -1) {
			items[index] = item;
		} else {
			items.push(item);
		}
		this.dsSubject.next(items);
	}
	
	delete(item: T): void {
		let items = this.dsSubject.getValue();
		const index: number = this.findIndexOf(item);
		if (index > -1) {
			items.splice(index, 1);
			this.dsSubject.next(items);
		}
	}
	
	findIndexOf(item: T): number {
		let index: number = -1;
		let items = this.dsSubject.getValue();
		for (let entity of items) {
			if (entity.id === item.id) {
				index = items.indexOf(entity, 0);
				break;
			}
		}
		return index;
	}
}