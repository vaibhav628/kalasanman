import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventsPage } from './events.page';

const routes: Routes = [
  {
    path: 'events',
    component: EventsPage,
    children:[
            { path: 'pastperf', loadChildren: './pastperf/pastperf.module#PastperfPageModule'},
            { path: 'upcoming', loadChildren: './upcoming/upcoming.module#UpcomingPageModule'},

            ]
  },
    {
       path:'',
       redirectTo: 'events/upcoming',
       pathMatch: 'full'
    }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EventsPage]
})
export class EventsPageModule {}
