import { Pokemon } from '../models/pokemon.model';
export const POKEMON_DATA: Pokemon[] = [
  { id: 1,  name: 'Pikachu',    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',  color: '#FFF9C4' },
  { id: 2,  name: 'Bulbasaur',  img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',   color: '#E0F2F1' },
  { id: 3,  name: 'Charmander', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',   color: '#FFEBEE' },
  { id: 4,  name: 'Squirtle',   img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',   color: '#E1F5FE' },
  { id: 5,  name: 'Eevee',      img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png', color: '#EFEBE9' },
  { id: 6,  name: 'Jigglypuff', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png',  color: '#FCE4EC' },
  { id: 7,  name: 'Snorlax',    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png', color: '#F5F5F5' },
  { id: 8,  name: 'Mewtwo',     img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png', color: '#F3E5F5' },
  { id: 9,  name: 'Gengar',     img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png',  color: '#EDE7F6' },
  { id: 10, name: 'Lucario',    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png', color: '#E3F2FD' },
  { id: 11, name: 'Togepi',     img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/175.png', color: '#FFFDE7' },
  { id: 12, name: 'Psyduck',    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png',  color: '#FFF9C4' },
  { id: 13, name: 'Meowth',     img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/52.png',  color: '#FAFAFA' },
  { id: 14, name: 'Dragonite',  img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png', color: '#FFF3E0' },
  { id: 15, name: 'Lapras',     img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/131.png', color: '#E0F7FA' },
  { id: 16, name: 'Mew',        img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png', color: '#FCE4EC' },
  { id: 17, name: 'Ditto',      img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png', color: '#F3E5F5' },
  { id: 18, name: 'Rayquaza',   img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/384.png', color: '#E8F5E9' },
  { id: 19, name: 'Mudkip',     img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/258.png', color: '#E1F5FE' },
  { id: 20, name: 'Piplup',     img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/393.png', color: '#E3F2FD' },
  { id: 21, name: 'Scorbunny',  img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/813.png', color: '#FFEBEE' },
  { id: 22, name: 'Grookey',    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/810.png', color: '#F1F8E9' },
  { id: 23, name: 'Sobble',     img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/816.png', color: '#E0F7FA' },
  { id: 24, name: 'Mimikyu',    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/778.png', color: '#FEF9C3' },
  { id: 25, name: 'Vulpix',     img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/37.png',  color: '#FFF3E0' },
];
export const PARTY_NAMES: string[] = [
  'Noah', 'Iris', 'Mateo', 'Philip', 'Lovis', 'Dua', 'Alf', 'Jussi', 'Otto', 'Teo'
];
export const WIN_LINES: number[][] = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];
