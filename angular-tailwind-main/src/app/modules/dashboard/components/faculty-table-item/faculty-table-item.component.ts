import { Component, Input, OnInit } from '@angular/core';
import { Nft } from '../../models/nft';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: '[faculty-table-item]',
  templateUrl: './faculty-table-item.component.html',
})
export class FacultyTableItemComponent implements OnInit {
  ngOnInit(): void {}
  @Input() faculty = <IUser>{};
  isOpen = false;

  openDialog() {
    this.isOpen = true;
  }

  closeDialog() {
    this.isOpen = false;
  }



}
