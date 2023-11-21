import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { STORAGE_CONSTANTS } from 'src/app/core/Services/common/constants';
import { StorageService } from 'src/app/core/Services/common/storage.service';

@Component({
  selector: 'app-all-done',
  templateUrl: './all-done.component.html',
  styleUrls: ['./all-done.component.scss']
})
export class AllDoneComponent {
  sectionData: any[] = [];
  constructor(private router: Router, private storageService: StorageService) {
    const section_data: any = this.storageService.getFromLocalStorage(STORAGE_CONSTANTS.SECTIONS_DATA)
    if (section_data) {
      this.sectionData = JSON.parse(section_data) ? JSON.parse(section_data) : this.sectionData;
    }
  }
  _onSubmit() {
    const index = this.sectionData.findIndex((data: any) => data?.text == "additional_information")
    if (index >= 0) {
      this.sectionData[index].status = "Completed";
      this.sectionData[index].icon = "checkmark-circle-2";
      this.sectionData[index].color = "#37AB87";
    }
    this.storageService.setIntoLocalStorage(STORAGE_CONSTANTS.SECTIONS_DATA, JSON.stringify(this.sectionData))
    this.router.navigate(['/']);
  }
}
