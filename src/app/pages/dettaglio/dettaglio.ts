import { SlicePipe } from '@angular/common';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Spinner } from '../../shared/spinner/spinner';
import { SerieService } from '../../services/serie-service';
import { PreferitiService } from '../../services/preferiti-service';
import { Attore, Serie } from '../../models/serie';

@Component({
  selector: 'app-dettaglio',
  imports: [Spinner, SlicePipe],
  templateUrl: './dettaglio.html',
  styleUrl: './dettaglio.css',
})
export class Dettaglio {
  private serieService = inject(SerieService);
  protected preferitiService = inject(PreferitiService);

  id = input.required<string>();

  caricamento = signal(true);
  errore = signal('');
  serie = signal<Serie | null>(null);
  cast = signal<Attore[]>([]);

  isPreferito = computed(() => {
    const s = this.serie();
    return s ? this.preferitiService.isPreferito(s) : false;
  });

  private caricaDettaglio = effect(() => {
    const idNum = Number(this.id());

    if (!idNum || Number.isNaN(idNum)) {
      this.errore.set('ID serie non valido.');
      this.serie.set(null);
      this.cast.set([]);
      this.caricamento.set(false);
      return;
    }

    this.caricamento.set(true);
    this.errore.set('');

    this.serieService.dettaglio(idNum).subscribe({
      next: s => {
        this.serie.set(s);
        this.caricamento.set(false);
      },
      error: () => {
        this.errore.set('Serie non trovata.');
        this.serie.set(null);
        this.caricamento.set(false);
      }
    });

    this.serieService.cast(idNum).subscribe({
      next: s => {
        this.cast.set(s);
      },
      error: () => {
        this.cast.set([]);
      }
    });
  });

  togglePreferito() {
    const s = this.serie();
    if (!s) return;
    this.preferitiService.toggle(s);
  }
}