// app-routing.module.ts
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    //loadChildren: './base/base.module#BasePageModule'
    loadChildren: () => import('./base/base.module').then(m => m.BasePageModule)

    //path: 'home',
    //loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },

  {
      path: 'base/more/reviews',
      loadChildren: () => import('./reviews/reviews.module').then(m => m.ReviewsPageModule)
    },

  {
      path: '',
      redirectTo: 'base',
      pathMatch: 'full'
  },

  //{ path: 'more', loadChildren: './more/more.module#MorePageModule' },
  //Below routing worked from JOIN KALASANMAN more option but it didnt open inside Tab.
  //{ path: 'join', loadChildren: () => import('./membership/membership.module').then(m => m.MembershipPageModule)},

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
