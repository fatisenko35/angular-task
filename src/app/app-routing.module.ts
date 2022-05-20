import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarouselNavigationComponent } from './carousel-navigation/carousel-navigation.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  {path: 'home', component: CarouselNavigationComponent},
  {path: '', component: CarouselNavigationComponent},
  {path: 'todo', component: TodoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
