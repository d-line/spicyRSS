import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const storiesModule = () => import('./stories/stories.module').then(x => x.StoriesModule);
const feedsModule = () => import('./feeds/feeds.module').then(x => x.FeedsModule);

const routes: Routes = [
  { path: '', redirectTo: '/news', pathMatch: 'full' },
  { path: 'news', loadChildren: storiesModule },
  { path: 'feeds', loadChildren: feedsModule },
  { path: 'auth', loadChildren: accountModule },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
