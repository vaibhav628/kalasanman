import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

{
    path: '',

    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
    //{ path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
    { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
    { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
    { path: 'membership', loadChildren: './membership/membership.module#MembershipPageModule' },
  { path: 'donations', loadChildren: './donations/donations.module#DonationsPageModule' },
  { path: 'events', loadChildren: './events/events.module#EventsPageModule' },
  { path: 'pastperf', loadChildren: './events/pastperf/pastperf.module#PastperfPageModule' },
  { path: 'upcoming', loadChildren: './events/upcoming/upcoming.module#UpcomingPageModule' },  { path: 'newsfeed', loadChildren: './newsfeed/newsfeed.module#NewsfeedPageModule' },
  { path: 'reviews', loadChildren: './reviews/reviews.module#ReviewsPageModule' },
  { path: 'purchase', loadChildren: './purchase/purchase.module#PurchasePageModule' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
