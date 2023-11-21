import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() title = "";
  @Input() subTitle_normal = "";
  @Input() subTitle_highlight = "";
  @Input() subtitle_style = "";
  @Input() title_style = "";
  @Input() path = "/";
  @Input() disabled_back_button = "show";
  constructor(private router: Router) { }
  rediretToBack() {
    this.router.navigate([this.path]);
  }
}
