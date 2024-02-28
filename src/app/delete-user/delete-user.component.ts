import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EnrollmentService } from '../enrollment.service';
@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [RouterModule,CommonModule],
  providers:[
    EnrollmentService
  ],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.css'
})
export class DeleteUserComponent implements OnInit {
  Id :any;
  UserData : any;
  constructor(private route : ActivatedRoute,private _EnrollServices : EnrollmentService,private router : Router){}

  ngOnInit(): void {
    this.Id = this.route.snapshot.paramMap.get('id');
    this._EnrollServices.GetByIdData(this.Id).
        subscribe(data => this.UserData = data,error => console.log(error));
  }

  DeleteData(id : any){
    var result = confirm("Are You Sure Delete Data ?");
    if(result){
      this._EnrollServices.DeleteEnroll(id).subscribe(data => window.alert("Delete Data Successfully.... from : Email - " + data.email), error => window.alert(error));
      return this.router.navigate([""]);
    }
    else{
      return;
    }
  }

  BackButton(){
    return this.router.navigate([""]);
  }
}