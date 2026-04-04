import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'inventory', loadComponent: () => import('./pages/inventory/inventory.component').then(m => m.InventoryComponent) },
  { path: 'search', loadComponent: () => import('./pages/search/search.component').then(m => m.SearchComponent) },
  { path: 'privacy', loadComponent: () => import('./pages/privacy/privacy.component').then(m => m.PrivacyComponent) },
  { path: 'help', loadComponent: () => import('./pages/help/help.component').then(m => m.HelpComponent) },
];