import { Component, Input, OnInit } from '@angular/core';
import { Nft } from '../../models/nft';
import { SchoolService } from 'src/app/core/services/school.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: '[school-table-item]',
  templateUrl: './school-table-item.component.html',
  styleUrls: ['./school-table-item.component.scss'],
})
export class SchoolTableItemComponent implements OnInit {
  @Input() section = <any>{};
  group = [];
  isOpen = false;
  addGroupForm: FormGroup;
  sectionId: any;

  constructor(private _formBuilder: FormBuilder, private _schoolService: SchoolService) {}

  ngOnInit(): void {
    this.addGroupForm = this._formBuilder.group({
      groupName: ['', Validators.required],
    });

    this.group = this.section.groups.map((e) => e.groupName);
  }

  deleteItem(id: any) {
    alert('The page is now refreshing');
    this._schoolService.deleteSection(id).subscribe({
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        window.location.reload();
      },
    });
  }

  toggleAddButton() {
    this.isOpen = !this.isOpen;
  }

  setSectionId(id: any) {
    this.sectionId = id;
  }

  onSubmitGroup() {
    const { groupName } = this.addGroupForm.value;

    const group = {
      groupName: groupName,
      sectionId: this.sectionId,
    };

    // stop here if form is invalid
    if (this.addGroupForm.invalid) {
      return;
    }

    this._schoolService.addGroup(group).subscribe({
      complete: () => {
        // window.location.reload();
        this._schoolService.schoolUpdateNeeded.next(group);
        this.toggleAddButton();
      },
    });
  }
}
