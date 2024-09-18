import { Routes } from '@angular/router';

export const routes: Routes = [
    // { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./components/board-renderer/board-renderer.component').then(m => m.BoardRendererComponent) },
    { path: '**', redirectTo: '' }
];
