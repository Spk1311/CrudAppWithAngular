import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnrollmentService } from '../enrollment.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GetUser } from '../get-user';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  providers: [
    EnrollmentService
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit {
  title = "Add Data : ";
  errMes = "";
  GenValueM = true;
  GenValueF = false;
  Id: any;
  EmailPresent = false;
  AllData: any;
  userModel = new GetUser(-1, '', '', '', '', 0, '');

  constructor(private _EnrollService: EnrollmentService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.Id = this.route.snapshot.paramMap.get('id');
    if (this.Id != null) {
      this.title = "Update Data :"
      this._EnrollService.GetByIdData(this.Id).subscribe(data => {
        3
        this.AllData = data;
        if (data.gender) {
          this.GenValueF = true;
          this.GenValueM = false;
        }
        console.log(this.GenValueF, " and ", this.GenValueM);
        this.EmailPresent = true,
          this.userModel.id = data.id,
          this.userModel.name = data.name,
          this.userModel.email = data.email,
          this.userModel.password = data.password,
          this.userModel.gender = data.gender,
          this.userModel.birthdate = this.AllData.birthDate.substr(0, 10),
          this.userModel.phone = data.phone
      },
        error => this.errMes = error);
      console.log(this.userModel);
    }
  }


  onSubmit() {
    if (this.userModel.id == -1) {
      let userData = new User(this.userModel.name, this.userModel.email, this.userModel.password, this.userModel.phone, this.userModel.gender, this.userModel.birthdate);
      this._EnrollService.Postenroll(userData).
        subscribe(data => { window.alert("Add Data SuccessFully.. From This Email : " + data.email) },
          error => {
            if (error.status == 409) {
              window.alert("Email already Existed, Please Enter Another Email !");
              return;
            }
          });
      console.log(this.userModel);
      return this.router.navigate([""]);
    }
    else {
      this._EnrollService.Editenroll(this.userModel.id, this.userModel).
        subscribe(data => window.alert("Update Data SuccessFully.. from this Email : " + data.email),
          error => window.alert("error status code : " + error.status));
      console.log(this.userModel);
      return this.router.navigate([""]);
    }
  }
}
