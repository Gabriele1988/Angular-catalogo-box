import { Component, computed, input, output } from '@angular/core';
import { Serie } from '../../models/serie';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-serie-card',
  imports: [RouterLink],
  templateUrl: './serie-card.html',
  styleUrl: './serie-card.css',
})
export class SerieCard {
  serie = input.required<Serie>();
  isPreferito = input<boolean>(false);
  preferito = output<Serie>();

  anno = computed(() =>{
    const p = this.serie().premiered
    return p ? p.substring(0,4) : 'N/D';
  });
  generi = computed(() =>{
    const g = this.serie().genres
    return g.length > 0 ? g.join(', ') : 'N/D';
  });
}

