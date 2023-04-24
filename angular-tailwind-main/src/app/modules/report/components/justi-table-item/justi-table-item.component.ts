import { Component, Input } from '@angular/core';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: '[justi-table-item]',
  templateUrl: './justi-table-item.component.html',
})
export class JustiTableItemComponent {

  @Input() justFile = <any>{};
  fileName = [];
  grade = [];
  sectionName = [];
  sectionGroup = [];
  status = [];

  constructor() {}

  ngOnInit(): void {
    this.fileName = this.justFile.justiFile.map(e => e.fileName)
    this.grade = this.justFile.justiFile.map(e => e.grade)
    this.status = this.justFile.justiFile.map(e => e.status)
    this.sectionName = this.justFile.appUserSections.map((e) => e.name);
    this.sectionGroup = this.justFile.appUserSections.map((e) => e.groups[0].groupName);
  }
}
