import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/core/services/content.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit{

  vision: any;
  mission: any;
  constructor(private _contentService: ContentService) {

  }

  ngOnInit(): void { 

    this._contentService.getContent().subscribe({
      next: (c) => {
        this.vision = c.map((r) => r.vision);
        this.mission = c.map((r) => r.mission);
        // console.log(c)
      },
      // error: (error) => alert(error.message),
    });
   
  }

}
