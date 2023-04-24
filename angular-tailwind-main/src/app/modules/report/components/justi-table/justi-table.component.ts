import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: '[justi-table]',
  templateUrl: './justi-table.component.html',
})
export class JustiTableComponent implements OnInit {

  public activeJustFile: any[] = [];

  constructor(private _accountService: AccountService) {}

  ngOnInit(): void {
    this.fetchFiles()
  }

  fetchFiles(): void {
    this._accountService.getAllStudent().subscribe({
      next: (justifile) => {
        this.activeJustFile = justifile
        console.log(justifile)
      },
      error: (error) => alert(error.message),
    });
  }

}
