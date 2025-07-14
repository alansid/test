import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { 
    path: 'projects', 
    loadComponent: () => import('./components/project-list/project-list.component').then(c => c.ProjectListComponent) 
  },
  { 
    path: 'projects/:id', 
    loadComponent: () => import('./components/project-detail/project-detail.component').then(c => c.ProjectDetailComponent) 
  },
  { 
    path: 'search', 
    loadComponent: () => import('./components/component-search/component-search.component').then(c => c.ComponentSearchComponent) 
  },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./components/dashboard/dashboard.component').then(c => c.DashboardComponent) 
  }
];
