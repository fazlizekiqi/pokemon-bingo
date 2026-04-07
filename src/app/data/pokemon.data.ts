import { Pokemon } from '../models/pokemon.model';
export const POKEMON_DATA: Pokemon[] = [
  { id: 1,  name: 'Pikachu',    img: 'assets/pokemon/25.png',  color: '#FFF9C4' },
  { id: 2,  name: 'Bulbasaur',  img: 'assets/pokemon/1.png',   color: '#E0F2F1' },
  { id: 3,  name: 'Charmander', img: 'assets/pokemon/4.png',   color: '#FFEBEE' },
  { id: 4,  name: 'Squirtle',   img: 'assets/pokemon/7.png',   color: '#E1F5FE' },
  { id: 5,  name: 'Eevee',      img: 'assets/pokemon/133.png', color: '#EFEBE9' },
  { id: 6,  name: 'Jigglypuff', img: 'assets/pokemon/39.png',  color: '#FCE4EC' },
  { id: 7,  name: 'Snorlax',    img: 'assets/pokemon/143.png', color: '#F5F5F5' },
  { id: 8,  name: 'Mewtwo',     img: 'assets/pokemon/150.png', color: '#F3E5F5' },
  { id: 9,  name: 'Gengar',     img: 'assets/pokemon/94.png',  color: '#EDE7F6' },
  { id: 10, name: 'Lucario',    img: 'assets/pokemon/448.png', color: '#E3F2FD' },
  { id: 11, name: 'Togepi',     img: 'assets/pokemon/175.png', color: '#FFFDE7' },
  { id: 12, name: 'Psyduck',    img: 'assets/pokemon/54.png',  color: '#FFF9C4' },
  { id: 13, name: 'Meowth',     img: 'assets/pokemon/52.png',  color: '#FAFAFA' },
  { id: 14, name: 'Dragonite',  img: 'assets/pokemon/149.png', color: '#FFF3E0' },
  { id: 15, name: 'Lapras',     img: 'assets/pokemon/131.png', color: '#E0F7FA' },
  { id: 16, name: 'Mew',        img: 'assets/pokemon/151.png', color: '#FCE4EC' },
  { id: 17, name: 'Ditto',      img: 'assets/pokemon/132.png', color: '#F3E5F5' },
  { id: 18, name: 'Rayquaza',   img: 'assets/pokemon/384.png', color: '#E8F5E9' },
  { id: 19, name: 'Mudkip',     img: 'assets/pokemon/258.png', color: '#E1F5FE' },
  { id: 20, name: 'Piplup',     img: 'assets/pokemon/393.png', color: '#E3F2FD' },
  { id: 21, name: 'Scorbunny',  img: 'assets/pokemon/813.png', color: '#FFEBEE' },
  { id: 22, name: 'Grookey',    img: 'assets/pokemon/810.png', color: '#F1F8E9' },
  { id: 23, name: 'Sobble',     img: 'assets/pokemon/816.png', color: '#E0F7FA' },
  { id: 24, name: 'Mimikyu',    img: 'assets/pokemon/778.png', color: '#FEF9C3' },
  { id: 25, name: 'Vulpix',     img: 'assets/pokemon/37.png',  color: '#FFF3E0' },
];
export const PARTY_NAMES: string[] = [
  'Noah', 'Iris', 'Mateo', 'Philip', 'Lovis', 'Dua', 'Alf', 'Jussi', 'Otto', 'Teo'
];
export const WIN_LINES: number[][] = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];
