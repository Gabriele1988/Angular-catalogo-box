import { Component, computed, inject, signal } from '@angular/core';
import { SerieService } from '../../services/serie-service';
import { PreferitiService } from '../../services/preferiti-service';
import { Serie } from '../../models/serie';
import { Spinner } from '../../shared/spinner/spinner';
import { SerieCard } from '../../shared/serie-card/serie-card';

@Component({
  selector: 'app-catalogo',
  imports: [Spinner, SerieCard],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {
  private serieService = inject(SerieService);
  preferitiService = inject(PreferitiService);

  caricamento = signal(true);
  errore = signal('');
  serie = signal<Serie[]>([]);

  paginaCorrente = signal(1);
  elementiPerPagina = 8;

  ordinamento = signal<'nome' | 'voto' | 'anno'>('nome');

  serieOrdinate = computed(() => {
    const lista = [...this.serie()];
    const criterio = this.ordinamento();

    return lista.sort((a, b) => {
      if (criterio === 'nome') {
        return a.name.localeCompare(b.name);
      }

      if (criterio === 'voto') {
        const votoA = a.rating?.average ?? 0;
        const votoB = b.rating?.average ?? 0;
        return votoB - votoA;
      }

      const annoA = a.premiered ? new Date(a.premiered).getFullYear() : 0;
      const annoB = b.premiered ? new Date(b.premiered).getFullYear() : 0;
      return annoB - annoA;
    });
  });

  totalePagine = computed(() =>
    Math.ceil(this.serieOrdinate().length / this.elementiPerPagina)
  );

  seriePaginata = computed(() => {
    const start = (this.paginaCorrente() - 1) * this.elementiPerPagina;
    const end = start + this.elementiPerPagina;
    return this.serieOrdinate().slice(start, end);
  });

  pagine = computed(() =>
    Array.from({ length: this.totalePagine() }, (_, i) => i + 1)
  );

  constructor() {
    this.serieService.popolari().subscribe({
      next: dati => {
        this.serie.set(dati);
        this.caricamento.set(false);
      },
      error: () => {
        this.errore.set('Impossibile caricare le serie, riprova');
        this.caricamento.set(false);
      }
    });
  }

  cambiaOrdinamento(valore: string) {
    this.ordinamento.set(valore as 'nome' | 'voto' | 'anno');
    this.paginaCorrente.set(1);
  }

  togglePreferito(serie: Serie) {
    this.preferitiService.toggle(serie);
  }

  isPreferito(serie: Serie): boolean {
    return this.preferitiService.isPreferito(serie);
  }

  vaiAPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalePagine()) {
      this.paginaCorrente.set(pagina);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  paginaPrecedente() {
    this.vaiAPagina(this.paginaCorrente() - 1);
  }

  paginaSuccessiva() {
    this.vaiAPagina(this.paginaCorrente() + 1);
  }
}