import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasePage } from './base.page';

const routes: Routes = [
  {
    path: 'base',
    component: BasePage,
    children: [
      {
        path: 'events',
        loadChildren: () => import('../events/upcoming/upcoming.module').then(m => m.UpcomingPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'news',
        loadChildren: () => import('../newsfeed/newsfeed.module').then(m => m.NewsfeedPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule)
      },
      {
       path: 'more',
                children: [
                  { path: '', loadChildren: () => import('../more/more.module').then(m => m.MorePageModule) },
                  { path: 'join', loadChildren: () => import('../membership/membership.module').then(m => m.MembershipPageModule) },
                  { path: 'reviews', loadChildren: () => import('../reviews/reviews.module').then(m => m.ReviewsPageModule) },
                  { path: 'donations', loadChildren: () => import('../donations/donations.module').then(m => m.DonationsPageModule)},
                  {path: 'purchase', loadChildren: () => import('../purchase/purchase.module').then(m => m.PurchasePageModule)}
                ]
     },

      {
        path: '',
        redirectTo: '/base/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/base/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasePageRoutingModule {}
