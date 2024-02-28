import { Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { AppComponent } from './app.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';

export const routes: Routes = [
    {path:"",component:AppComponent},
    {path:"Add",component:AddUserComponent},
    {path:"Edit/:id",component:AddUserComponent},
    {path:"Delete/:id",component:DeleteUserComponent}
];
