import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-title-header',
  templateUrl: './title-header.component.html',
  styleUrls: ['./title-header.component.scss']
})
export class TitleHeaderComponent {
  @Input() title = "";
  @Input() subTitle = "";
  @Input() subtitle_style = "";
  @Input() title_style = "";
  @Input() path = "/";
  @Input() disabled_back_button = "show";
  constructor(private router: Router) { }
  rediretToBack() {
    this.router.navigate([this.path]);
  }
}
