import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() showOnlyLogout = false;
  private dialogRef!: NbDialogRef<any>;
  @ViewChild('dialog')
  Dialog!: TemplateRef<any>;
  constructor(private dialogService: NbDialogService) {
  }

  protected open() {
    const backdropClick = false
    this.dialogRef = this.dialogService.open(this.Dialog, {
      closeOnBackdropClick: backdropClick
    });
  }
  ConfirmDialog() {
    localStorage.clear();
    location.reload();
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
