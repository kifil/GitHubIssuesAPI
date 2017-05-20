import { Routes, RouterModule } from '@angular/router';
import { IssuesListComponent } from './issues-list.component';

const routes: Routes = [
    {
        path: 'issues',
        component: IssuesListComponent,
    },
	{
		path: '',
		redirectTo: '/issues',
		pathMatch: 'full'
	},
];

export const routing = RouterModule.forRoot(routes);