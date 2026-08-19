export interface Serie {
  id: number;
  name: string;
  genres: string[];
  status: string;
  premiered: string | null;
  language?: string | null;
  url?: string;
  officialSite?: string | null;
  rating: {
    average: number | null;
  };
  image: {
    medium: string;
    original: string;
  } | null;
  summary: string | null;
  network: {
    name: string;
    country: {
      name: string;
    } | null;
  } | null;
}

export interface RisultatoRicerca {
  score: number;
  show: Serie;
}

export interface Attore {
  person: {
    id: number;
    name: string;
    image: {
      medium: string;
      original: string;
    } | null;
  };
  character: {
    id: number;
    name: string;
    image: {
      medium: string;
      original: string;
    } | null;
  };
}