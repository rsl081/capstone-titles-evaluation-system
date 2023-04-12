import { Component, Input } from '@angular/core';
import { Nft } from '../../models/nft';
import { SchoolService } from 'src/app/core/services/school.service';

@Component({
  selector: '[school-table-item]',
  templateUrl: './school-table-item.component.html',
  styleUrls: ['./school-table-item.component.scss'],
})
export class SchoolTableItemComponent {
  @Input() school = <any>{};

  constructor(private _schoolService: SchoolService) {}

  deleteItem(id: any){
    alert('The page is now refreshing')
    this._schoolService.deleteSection(id).subscribe({
      error: (e)=>{
        console.log(e);
      },
      complete: () =>{
        window.location.reload();
      }
    })
  };
  
}
