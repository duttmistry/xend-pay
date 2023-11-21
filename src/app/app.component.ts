import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'xend-pay';
  isCloseIcon = true;
  private dialogRef!: NbDialogRef<any>;
  @ViewChild('dialog')
  dialog!: TemplateRef<any>;
  account_Arr = [
    {
      icon: 'person-outline',
      title: 'Select Account',
      description:
        "You're self employed or a freelancer and hold complete ownership of your business.",
    },
    {
      icon: 'person-outline',
      title: 'Registered Company',
      description:
        'Your company is registered with UK Companies House. You must be a director of the company to open an account',
    },
  ];
  currentRoute: any;
  constructor(private route: Router, private dialogService: NbDialogService) {
    this.route.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          if (event?.url == "/") {
            this.isCloseIcon = false
          } else {
            this.isCloseIcon = true
          }
          // Prints the current route
          // Eg.- /products
        }
      }
    )
  }
  goToHome() {
    this.route.navigate(['/'])
  }
  openDialog() {
    const backdropClick = false
    this.dialogRef = this.dialogService.open(this.dialog, {
      closeOnBackdropClick: backdropClick
    });
  }
  ConfirmDialog() {
    localStorage.clear();
    this.route.navigate(['/']);
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
