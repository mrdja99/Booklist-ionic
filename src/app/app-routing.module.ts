import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'log-in',
    pathMatch: 'full'
  },
  {
    path: 'add-new-book',
    loadChildren: () => import('./add-new-book/add-new-book.module').then(m => m.AddNewBookPageModule)
  },
  {
    path: 'edit-book',
    loadChildren: () => import('./edit-book/edit-book.module').then(m => m.EditBookPageModule)
  },
  {
    path: 'book-info',
    loadChildren: () => import('./book-info/book-info.module').then(m => m.BookInfoPageModule)
  },
  {
    path: 'log-in',
    loadChildren: () => import('./log-in/log-in.module').then(m => m.LogInPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
