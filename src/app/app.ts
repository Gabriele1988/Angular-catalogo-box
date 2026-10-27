import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { Header } from './shared/header/header';
import { setSpeedInsightsRoute } from '../speed-insights';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('catalogo-box');
  private router = inject(Router);

  constructor() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        let snap = this.router.routerState.snapshot.root;
        const parts: string[] = [];
        while (snap.firstChild) {
          snap = snap.firstChild;
          if (snap.routeConfig?.path) parts.push(snap.routeConfig.path);
        }
        setSpeedInsightsRoute('/' + parts.join('/'));
      });
  }
}