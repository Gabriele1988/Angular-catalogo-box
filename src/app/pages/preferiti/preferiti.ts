import { Component, computed, inject, signal } from '@angular/core';
import { PreferitiService } from '../../services/preferiti-service';
import { Serie } from '../../models/serie';
import { SerieCard } from '../../shared/serie-card/serie-card';

@Component({
  selector: 'app-preferiti',
  imports: [SerieCard],
  templateUrl: './preferiti.html',
  styleUrl: './preferiti.css',
})
export class Preferiti {
  preferitiService = inject(PreferitiService);

  ordinamento = signal<'nome' | 'voto' | 'anno'>('nome');

  preferitiOrdinati = computed(() => {
    const lista = [...this.preferitiService.preferiti()];
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

  cambiaOrdinamento(valore: string) {
    this.ordinamento.set(valore as 'nome' | 'voto' | 'anno');
  }

  togglePreferito(serie: Serie) {
    this.preferitiService.toggle(serie);
  }

  isPreferito(serie: Serie): boolean {
    return this.preferitiService.isPreferito(serie);
  }
}