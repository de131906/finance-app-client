import { MatDialogConfig } from '@angular/material/dialog';
import { BaseEntity } from "src/app/model/base-entity";

export abstract class BaseTableComponent<T extends BaseEntity> {
	
	selectedRow: T;
	showEditArea: boolean = false;
	
	onRowClicked(row: T) {
		if (this.selectedRow && this.selectedRow != row) {
			this.selectedRow.selected = false;
		}
		this.selectedRow = row;
		this.selectedRow.selected = !this.selectedRow.selected;
		if (!this.selectedRow.selected) {
			this.selectedRow = null;
		}
	}
	
	onAddClicked()  { this.showEditArea = true }
	onEditClicked() { this.showEditArea = true }
	onCancelEvent(event: string) {
		if (event === 'cancel') { this.showEditArea = false }
    }
	
	getDialogConfig(): MatDialogConfig {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.restoreFocus = false;
		dialogConfig.direction = 'ltr';
		return dialogConfig;
    }
}