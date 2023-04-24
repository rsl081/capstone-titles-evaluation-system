import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/core/services/content.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {

  contenImgUrl: any;
  vision: any;

  constructor(private _contentServices: ContentService) {}

  ngOnInit(): void {
    this._contentServices.getContent().subscribe({
      next:(r) => {
        this.contenImgUrl = r.map(i => i.url);
        this.vision = r.map(i => i.vision);
        console.log(r.url)
      },
      error: (e) => {
        console.log(e)
      }
    })
  }
}
