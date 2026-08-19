import { Injectable, computed, effect, signal } from '@angular/core';
import { Serie } from '../models/serie';

@Injectable({
  providedIn: 'root'
})
export class PreferitiService {
  private _preferiti = signal<Serie[]>(this.caricaPreferiti());

  readonly preferiti = this._preferiti.asReadonly();
  readonly totale = computed(() => this._preferiti().length);

  private syncStorage = effect(() => {
    localStorage.setItem('preferiti', JSON.stringify(this._preferiti()));
  });

  toggle(serie: Serie) {
    const esiste = this._preferiti().some(s => s.id === serie.id);

    if (esiste) {
      this._preferiti.set(this._preferiti().filter(s => s.id !== serie.id));
    } else {
      this._preferiti.set([...this._preferiti(), serie]);
    }
  }

  rimuovi(id: number) {
    this._preferiti.set(this._preferiti().filter(s => s.id !== id));
  }

  isPreferito(serie: Serie): boolean {
    return this._preferiti().some(s => s.id === serie.id);
  }

  svuota() {
    this._preferiti.set([]);
  }

  private caricaPreferiti(): Serie[] {
    const dati = localStorage.getItem('preferiti');
    return dati ? JSON.parse(dati) : [];
  }
}