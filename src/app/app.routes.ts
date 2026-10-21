import { Routes } from '@angular/router';
import { TasListComponent } from './components/tas-list/tas-list.component';
import { TasFormComponent } from './components/tas-form/tas-form.component';
export const routes: Routes = [
    {path: '', redirectTo :'tasks', pathMatch:"full"},
    {
        path:"tasks",component:TasListComponent
    },
    {
        path:'add', component:TasFormComponent
    },
    {
        path:'**', redirectTo:"tasks"
    }

];

