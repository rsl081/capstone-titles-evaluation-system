import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  
  userRole: any;
  ngOnInit(): void {
    let user = localStorage.getItem('user');
    let obj = JSON.parse(user);
    this.userRole = obj.role;
    // console.log(obj.role + 'test');
  }
}
