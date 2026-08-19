import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SerieService } from '../../services/serie-service';
import { PreferitiService } from '../../services/preferiti-service';
import { Serie } from '../../models/serie';
import { SerieCard } from '../../shared/serie-card/serie-card';

@Component({
  selector: 'app-home',
  imports: [RouterLink, SerieCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private serieService = inject(SerieService);
  preferitiService = inject(PreferitiService);

  caricamento = signal(true);
  errore = signal('');
  serie = signal<Serie[]>([]);

  popolariHome = computed(() => this.serie().slice(0, 4));
  preferitiHome = computed(() => this.preferitiService.preferiti().slice(0, 4));

  constructor() {
    this.serieService.popolari().subscribe({
      next: dati => {
        this.serie.set(dati);
        this.caricamento.set(false);
      },
      error: () => {
        this.errore.set('Impossibile caricare la home');
        this.caricamento.set(false);
      }
    });
  }

  isPreferito(serie: Serie): boolean {
    return this.preferitiService.isPreferito(serie);
  }

  togglePreferito(serie: Serie) {
    this.preferitiService.toggle(serie);
  }
}