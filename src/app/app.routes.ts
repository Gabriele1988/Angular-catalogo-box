import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Catalogo } from './pages/catalogo/catalogo';
import { Dettaglio } from './pages/dettaglio/dettaglio';
import { Preferiti } from './pages/preferiti/preferiti';
import { About } from './pages/about/about';
import { NonTrovata } from './pages/non-trovata/non-trovata';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'serie', component: Catalogo },
  { path: 'serie/:id', component: Dettaglio },
  { path: 'preferiti', component: Preferiti },
  { path: 'about', component: About },
  { path: '**', component: NonTrovata },
];