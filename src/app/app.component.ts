import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { EnrollmentService } from './enrollment.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule,HttpClientModule],
  providers:[
    EnrollmentService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'CrudOperationApp';
  isOpen=false;
  errMes = "";
  public UserDATA:any = [];

  constructor(private _EnrollService : EnrollmentService,private router : Router,private route : ActivatedRoute){  }

  ngOnInit(): void {
    this._EnrollService.GetEnroll().subscribe(data => this.UserDATA = data,error => this.errMes = error);
  }

  AddDataBtn(){
    this.isOpen = true;
    return this.router.navigate(['Add'],{relativeTo : this.route});
  }
  
  ShowData(){
    return this.router.navigate(['Get'],{relativeTo : this.route});
  }

  EditData(id:any){
    this.isOpen=true;
    return this.router.navigate(['Edit',id],{relativeTo : this.route})
  }

  DeleteData(id:any){
    this.isOpen=true;
    return this.router.navigate(['Delete',id],{relativeTo : this.route})
  }

  ExportToExcelBtn(){
    this._EnrollService.GenerateExcel(this.UserDATA);
  }
} 